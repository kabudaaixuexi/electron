import { defineComponent, onMounted, onUnmounted, reactive, toRefs, inject, computed } from 'vue';
import dialogChatLogin from '@renderer/components/Dialog_Chat_Login/index.vue';
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
    __url_default: 'https://oscimg.oschina.net/oscnet/up-f437485f9201a6636750c8d7b4b17a50.jpg!/both/50x50',
    __status: __status['关闭状态'],
    __latest: '',
    data: []
  },
  {
    __source: __source['聊天室2'],
    __url_default: 'https://oscimg.oschina.net/oscnet/up-f437485f9201a6636750c8d7b4b17a50.jpg!/both/50x50',
    __status: __status['关闭状态'],
    __latest: '',
    data: []
  }
]
export default defineComponent({
  components:{
    dialogChatLogin
  },
  setup() {
    const storeStateChat = inject('chat')
    const state = reactive({
      loginDialog: true,
      //
      identityList,
      chatroomList,
      currentRoomIndex: 0,
      newInput:'',
      messageList: []
    })
    const currentRoom:any = computed(()=>{
      return state.chatroomList[state.currentRoomIndex];
    })

    const sendNew = () => {
      console.log(currentRoom.value);
      
      socket.emit('chatToServer', { __sender: storeStateChat['userinfo'].uid, __message: state.newInput, __source: currentRoom.__source });
      state.newInput = ''
    }
    const changeSource = (i) => {
      if (i === currentRoom) { return }
      // socket.emit('leaveRoom', { __sender: storeStateChat['userinfo'].uid, __source: state.currentRoom.__source });
      state.currentRoomIndex = i
      // socket.emit('joinRoom', { __sender: storeStateChat['userinfo'].uid, __source: state.currentRoom.__source });
    }
    onMounted(() => {
      socket.on('chatToClient', (data) => {
        console.log(data, '消息来了');
        state.chatroomList.forEach((v) => {
          if (v.__source === data.__source) {v.__latest = data.__message}
        })
        console.log(state.chatroomList);
        state.chatroomList.map(v => {
          if (v.__source === data.__source) {
            v.data.push(data)
          }
        })
      })

      socket.on('connect',()=> {
        
      })

      socket.on('joinRoom',(state)=>{
        console.log(state, 'joinRoom');
      })

      socket.on('leaveRoom',(state)=>{
        console.log(state, 'leaveRoom');
      })
    })
    onUnmounted(() => {
      // 全部离开
      state.chatroomList.map(v => {
        socket.emit('leaveRoom', { __sender: storeStateChat['userinfo'].uid, __source: v.__source });
      })
    })
    const changeLoginDialog = (e) => {
      if (!e) {
        // 全部加入
        state.chatroomList.map(v => {
          socket.emit('joinRoom', { __sender: storeStateChat['userinfo'].uid, __source: v.__source });
        })
      }
      state['loginDialog'] = e
    }
    onUnmounted(() => { 
    })
    return { 
      ...toRefs(state),storeStateChat,currentRoom,
      sendNew,changeSource,changeLoginDialog
    };
  }
});