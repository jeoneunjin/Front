import {
  NativeModules,
} from 'react-native';

const {SaveModule} = NativeModules;

export class HandControl{
    // 손 시퀀스 연산에 필요한 변수들 저장
    constructor() {
        this.direction = 0;
        this.sequence = 0;
        this.fin = 0;
        this.flag = 0;
        this.count = 0;
    }

    get_check(){
      SaveModule.getCheck((state) =>{
        console.log("check : "+state);
      });
    }
    get_hand_state(){
        SaveModule.getTest1((state) =>{
            //console.log("test1 : "+state);
          });
          SaveModule.getTest2((state) =>{
            //console.log("test2 : "+state);
          });
          SaveModule.getTest3((state) =>{
            //console.log("test3 : "+state);
          });
          SaveModule.getTest4((state) =>{
            //console.log("test4 : "+state);
          });
          SaveModule.getTest5((state) =>{
            console.log("test5 : "+state);
          }); 
          SaveModule.getFist((state) =>{
            //console.log("fist : "+state);
          });
          SaveModule.getVictory((state) =>{
            //console.log("victory : "+state);
          });
          SaveModule.getBackOrFront((state)=>{
            //console.log("BackOrFront : "+ state);
          });
    }

    async getState(moduleMethod) {
      return new Promise((resolve) => {
        moduleMethod(state => resolve(state));
      });
    }
    
    async calculate_hand_move(){
      let isVictory = await new Promise((resolve) => {SaveModule.getVictory(state=>resolve(state))});
      let isFist = await new Promise((resolve) => {SaveModule.getFist(state=>resolve(state))});
      let isFive = await new Promise((resolve) => {SaveModule.getFive(state=>resolve(state))});
      let isFour = await new Promise((resolve) => {SaveModule.getFour(state=>resolve(state))});
      let backOrFront = await new Promise((resolve) => {SaveModule.getBackOrFront(state=>resolve(state))});
      
      this.count ++
      if(this.direction != backOrFront){
        this.direction = backOrFront
        this.sequence = 0;
       }
      if (this.sequence == 0) {//처음 victory 인식
        if (isVictory||isFive||isFour) {
          this.sequence++;
          this.direction = backOrFront
          if(isVictory) this.flag = 1
          if(isFour) this.flag = 2
          if(isFive) this.flag = 3
          this.count = 0
        }
      }else if (this.sequence == 1) {//이전에 victory/tree/five가 인식 된적 있음
        if (isFist) {
          this.count = 0
          this.sequence++;
        }else if((isVictory == 1 && this.flag!=1)||(isFour == 1 && this.flag != 2) || (isFive == 1 && this.flag != 3)){
          if(this.flag == 3 && isFour == 1 && this.count<2){
            return
          }
          this.sequence = 0;  
        }
      }else {//victory/tree/five -> 주먹 -> ?
        if((this.flag==1 && isVictory == 1)||(this.flag == 2 && isFour == 1)||(isFive == 1 && this.flag == 3)){
          this.count = 0
          this.sequence = 0
          this.fin = 1
        }
        if(this.count > 5) {this.sequence = 0}
      }//5초동안 다음 동작이 수행되지 않으면 초기화
      if(this.count>50){
        this.sequence = 0
        this.count = 0
      }
    }
}

