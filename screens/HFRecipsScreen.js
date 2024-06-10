import React, {useContext, useState, useEffect, useRef} from 'react';
import {PixelRatio, StyleSheet, View, Text, Image, UIManager, findNodeHandle, Modal, Pressable, FlatList} from 'react-native';
import HFScreenHeader from '../components/HFScreenHeader';
import RecipeContext from '../contexts/RecipeContext';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import Tts from 'react-native-tts';

import {CameraViewManager} from './HandFree/CameraManager';//카메라 + 손 인식
import {HandControl} from'./HandFree/HandControl';//핸드 제스쳐 인식
import {VoiceControl} from'./HandFree/VoiceControl';//쿡펠 호출
import {VoiceCommend} from'./HandFree/VoiceCommend';//명령


//카메라 생성
const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.CameraViewManager.Commands.create.toString(),
    [viewId],
);

//카메라 리소스 해제
const removeFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.CameraViewManager.Commands.remove.toString(),
    [viewId],
);

function HFRecipeScreen({route}) {
  const {recipe} = route.params;
  const stepContent = recipe.recipe_text;
  const stepImage = recipe.recipe_list;
  const ingredients = recipe.ingredients;
  const [stepState, setStepState] = useState(0);

  const ref = useRef(null);
  const handCon = new HandControl();
  const voiceCom = new VoiceCommend()
  const navigation = useNavigation();
  const [isCall, callCookPal] = useState(false);
  const [commend, getCommend] = useState("");
  const [ingredientView, setingredientView] = useState(false);

  //핸드 프리 기능을 위한 초기 설정
  useEffect(() => {
    const voiceCon = new VoiceControl(callCookPal);
    // 쿡펠 호출 + 음성 명령 설정
    async function createVoice(){
      try{
        await voiceCon._makeManager()
        await voiceCon._startProcessing()
      }catch(error){
        console.log(error);
      }
    }
    async function createCommend(){
      try{
        await voiceCom._makeManager()
      }catch(error){
        console.log(error)
      }
    }
    createVoice();
    createCommend();

    //tts 설정
    Tts.setDefaultLanguage('ko-KR');
    Tts.setDefaultRate(0.8 , true);

    // 손 인식 + 카메라 설정
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
    //View가 사라지기 전에 동작(카메라 리소스 해제)
    const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
      removeFragment(viewId);
    });
    return() => {
      beforeRemoveListener();
      voiceCom.componentWillUnmount();
      voiceCon.componentWillUnmount();
      Tts.stop()
    }
  }, []);

  const handleNext = () => {
    // recipe.length-1 이후는 없기 때문에 return
    if (stepState === stepContent.length - 1) return;
    setStepState(prev => ++prev);
  };
  const handleBack = () => {
    if (stepState === 0) return;
    setStepState(prev => --prev);
  };

  const exitIngredient = () => {
    setingredientView(false)
  }

  const renderItem = ({ item }) => (
    <Text style={styles.modalTextStyle}>{item}</Text>
  );

  // 핸드 컨트롤 인식
  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 여부 확인
    const performHandMove = async () => {
      if (!isMounted) return; // 컴포넌트가 마운트된 경우에만 수행
      try {
        await handCon.calculate_hand_move();
        if (handCon.fin == 1) {
          switch(handCon.flag){
            case 1 : // 페이지 넘어감(주먹 -> V -> 주먹)
              setStepState(prev=>{
                let page_num = prev
                if(handCon.direction===1&&stepContent.length - 1!==page_num){
                  return prev+1
                } else if(handCon.direction===-1&&page_num!==0){
                  return prev-1
                }
                return page_num
              })
              break;
            case 2 : //음성(네손가락 -> 주먹 -> 네손가락)
              if(handCon.direction==1){
                setStepState(prev=>{
                  let page_num = prev
                  Tts.stop()
                  Tts.speak(stepContent[page_num])
                  return page_num
                })}
              break;  
            case 3 : //음식 재료(5 -> 주먹 -> 5)
              if(handCon.direction==1){
                setingredientView(true)
              }else{
                setingredientView(false)
              }
              break;
          }  
          handCon.fin = 0;
        }
      } catch (error) {
        console.error(error);
      }

      if (isMounted) {
        // 0.05초 후에 다시 수행
        setTimeout(performHandMove, 100);
      }
    };
    performHandMove();
    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그를 false로 설정
    };
  }, []); 

  // 보이스 컨트롤 인식
  useEffect(() => {
    // isCall이 true라면 isCall false로
    if (isCall) {//쿡펠이 불림
      Tts.stop()
      Tts.speak("네")
      callCookPal(false)
      voiceCom._startProcessing(getCommend)
    }
  }, [isCall]);

  useEffect(() => {
    if(commend!=""){
      switch(commend){
        case "next" :
          setStepState(prev=>{
            let page_num = prev
            if(stepContent.length - 1!==page_num){
              page_num = page_num+1
            }
            return page_num
          })
          break;
        case "back" :
          setStepState(prev=>{
            let page_num = prev
            console.log(page_num)
            if(page_num!==0){
              page_num = page_num-1
            }
            return page_num
          })
          break;
        case "speak" :
            setStepState(prev=>{
              let page_num = prev
              Tts.stop()
              Tts.speak(stepContent[page_num])
              return page_num
            })
          break;
        case "list" :
          setingredientView(true)
          break;
        case "cancel" :
          setingredientView(false)
          break;
      }
      getCommend("")
    }
  }, [commend])

  return (
    <View style={styles.block}>
      <HFScreenHeader />
      <GestureRecognizer
          onSwipeLeft={handleNext}
          onSwipeRight={handleBack}
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
      }}>
      {stepImage[stepState]['image'] != "" ?
      <Image
        style={styles.imageStyle}
        source={{uri: stepImage[stepState]['image']}}
      />:null}
      <Text
      style={{
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        fontFamily: 'Orbit-Regular',
        fontSize: 18,
        padding: 20,
      }}>{"("}{stepState + 1}/{stepContent.length}{")"} {stepContent[stepState]}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 100 ,
          height: 100,
          flex: 1,
          marginTop: 20,
          backgroundColor: 'white',
        }}>
        <CameraViewManager
            style={{
              height: PixelRatio.getPixelSizeForLayoutSize(100),
              width: PixelRatio.getPixelSizeForLayoutSize(100),
            }}
            ref={ref}
          />
      </View>   
      <Modal
          animationType="slide"
          visible={ingredientView}
          transparent={true}
      >
          <View style={styles.modalView}>
              <View>
                  <FlatList data = {ingredients} renderItem={renderItem}/>
              </View>
              <Pressable
                  onPress={exitIngredient}>
                  <Text>close</Text>
              </Pressable>
          </View>
      </Modal>

      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  loading: {
    alignSelf: 'center',
  },
  imageStyle: {
    flex: 2,
    borderRadius: 15,
  },
  container: {
      width: '100%',
      height: '100%',
      backgroundColor: "#17191c"
  },

  /**
   * 일반 화면 영역
   */
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 50
  },
  viewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 400,
  },

  /**
   * 모달 화면 영역
   */
  modalView: {
      marginTop: '50%',
      height: '50%',
      margin: 30,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  modalTextStyle: {
      color: '#17191c',
      fontWeight: 'bold',
      textAlign: 'center'
  },
});

export default HFRecipeScreen;
