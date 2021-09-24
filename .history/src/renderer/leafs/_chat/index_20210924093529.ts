import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';

import { ElMessage } from 'element-plus';
import socket from '@renderer/utils/socket'

enum __opt {
  '用户' = 1,
  '聊天'
}
enum __source {
  '聊天室1' = 'hut1',
  '聊天室2' = 'hut2'
}
enum __status {
  '有新消息' = 1,
  '无新消息',
  '开启状态',
  '关闭状态'
}
interface FaceIdentity {
  __opt: number,
  __url_default: string,
  __class: string,
  __describe?: string,
  data: any
}
interface FaceChatroom {
  __source: string,
  __url_default: string,
  __status: number,
  __latest: any,
  data: any
}
const identityList:FaceIdentity[] = [
  {
    __opt: __opt['用户'],
    __url_default: 'http://192.168.5.85:25566/assets/user.png',
    __class: 'identity_user',
    __describe: '',
    data: {}
  },
  {
    __opt: __opt['聊天'],
    __url_default: 'http://192.168.5.85:25566/assets/chat.png',
    __class: 'identity_chat',
    __describe: '聊天',
    data: {}
  }
]
const chatroomList:FaceChatroom[] = [
  {
    __source: __source['聊天室1'],
    __url_default: 'http://192.168.5.85:25566/assets/user.png',
    __status: __status['关闭状态'],
    __latest: '',
    data: {}
  },
  {
    __source: __source['聊天室2'],
    __url_default: 'http://192.168.5.85:25566/assets/user.png',
    __status: __status['关闭状态'],
    __latest: '',
    data: {}
  }
]
export default defineComponent({
  setup() {
    const state = reactive({
      identityList,
      chatroomList,
      currentRoom: chatroomList[0],
      newInput:'',
      messageList: [],
      userInfo: {
        id: '3133232'
      }
    })
    const sendNew = () => {
      socket.emit('chatToServer', { __sender: state.userInfo.id, __message: state.newInput, __source: state.currentRoom.__source });
      state.newInput = ''
    }
    const changeSource = (v: FaceChatroom) => {
      if (v.__source === state.currentRoom.__source) { return }
      socket.emit('leaveRoom', state.currentRoom.__source);
      state.currentRoom = v
      socket.emit('joinRoom', state.currentRoom.__source);
    }
    onMounted(() => {
      socket.on('chatToClient', (msg) => {
        state.messageList.push(msg)
      })

      socket.on('connect',()=> {
        if (false) {
          socket.emit('leaveRoom', state.currentRoom.__source);
        } else {
          socket.emit('joinRoom', state.currentRoom.__source);
        }
      })

      socket.on('joinRoom',(room)=>{
        console.log(room, 'joinRoom');
      })

      socket.on('leaveRoom',(room)=>{
        console.log(room, 'leaveRoom');
      })
    })
    onUnmounted(() => { 
    })
    return { 
      ...toRefs(state),
      sendNew,changeSource
    };
  }
});