import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as GoogleGenerativeAI from "@google/generative-ai";
import {useNavigation} from '@react-navigation/native';

export default function RecScreen() {
  const [message, setMessage] = useState('');
  const [sendMsg, setMsg] = useState(false);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const API_KEY = "AIzaSyCWEGNYPQ1uqT-azDCYLWyJy9oex8MiEKw"

  const generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
  }

  const safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
  ]

  const system_instruction=
    "[사용자가 입력할 수 있는 방향성 3가지]\n1. 음식 종류\n2. 상황\n3. 재료\n\n\
    [기본 조건]\n- 모든 답장은 5개 이상의 음식 이름만 추천한다. \n\
    -첫 문장에는 적절한 이모티콘도 사용한다.\n\
    추천하는 음식 이름 앞에만 - 기호를 삽입한다.\n\n\
    [각각의 입력에 대한 답장]\n\
    1. 입력된 음식 종류와 관련된 음식\n\
    2. 주어진 상황에서 요리할 수 있는 음식\n\
    3. 가지고 있는 재료를 활용하여 요리할 수 있는 음식"

  useEffect(() => {
    const foodRecommend = async() => { 
      const msg = message;
      setMessage('');
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        apiKey : API_KEY,
        model : "gemini-1.5-pro-latest",
        safetySettings : safety_settings,
        generationConfig : generation_config,
        systemInstruction : system_instruction
      })
      const result = await model.generateContent(msg)
      const text = result.response.text();
      setResponse(text.split("-"))
      setMsg(false)
      setIsLoading(false)
    }
    if(sendMsg) {
      foodRecommend()
    }
  }, [sendMsg])

  const handleSend = () => {
    if (message.trim()) {
      setIsLoading(true)
      setMsg(true)
    }
  };

  const getRecipe = (food_name) =>{
    navigation.navigate('RecipeList', {key: food_name});
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder=" 오늘의 추천 메뉴"
        />
        {isLoading ? ( // 로딩 상태 체크
          <ActivityIndicator size="small" color="black" />
        ) : (
          <TouchableOpacity onPress={handleSend} style={styles.icon}>
            <Text>추천 받기</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator} />
      <ScrollView style={styles.history}>
        {response.map((item, index) => (
          <View key={index} style={styles.messageContainer}>
            {index!=0 ? 
            <TouchableOpacity onPress={()=>getRecipe(item.trim())} style={styles.icon}>
              <Text style={{fontSize : 18, textAlign : "center", fontWeight : '500'}}>{item.trim()}</Text>
            </TouchableOpacity> : <Text>{item.trim()}</Text>}
          </View>
        ))}
      </ScrollView>
      <Text>
        {"음식을 추천 받고, \n원하는 음식의 레시피를 선택해보세요~\n<<음식명을 클릭하면 바로 레시피 검색으로 넘어갑니다!>>"}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  history: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 8,

  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1fcd3',
    padding: 8,
    borderRadius: 8,
  },
  model: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 8,
  },
  response: {
    marginTop: 16,
    fontSize: 16,
  },
});

