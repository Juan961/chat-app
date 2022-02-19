<template>
  <main>
    <div v-if="showAddUser" class="add-user__container">
      <div class="add-user">
        <i class='bx bx-x close' @click="toggleAddUser"></i>
        <h2>Add user</h2>
        <input v-model="newUserEmail" type="email" placeholder="Email">
        <button class="btn btn-primary" @click="addUser">Add</button>
      </div>
    </div>

    <div v-if="showCreateGroup" class="create-group__container">
      <div  class="createGroup">
        <i class='bx bx-x close' @click="closeCreateGroup"></i>
        <h2>New channel</h2>
        <input v-model="name_channel" type="text" placeholder="Channel name">
        <button @click="createChannel">Save</button>
      </div>
    </div>

    <section class="chat__header">
      <i class='bx bx-menu' @click="openMenu"></i>
      <p class="header__name" > {{actualRoom.name}} </p>
      <p class="header__add" @click="toggleAddUser"> Add user </p>
    </section>

    <section class="chat__main">
      <section class="main__texts">
        <ul class="texts__list" id="container">
          <li v-for="message in chat.messages" :key="message" class="text" :class="{ 'text-bot' : message.username == 'BOT' }">
            <div class="text__head">
              <span> <strong> {{ message.username }} </strong> </span>
              <p> {{ message.time }} </p> 
            </div>

            <div class="text__body">
              {{ message.text }}

            </div>          
            
          </li>
        </ul>
      </section>
      <section class="main__message">
        <input type="text" v-model="chat.messageInput" placeholder="Type a message here">
        <i class='bx bx-send btn-send' @click="sendMessage"></i>
      </section>
    </section>
  </main>
</template>

<script>
import { io } from "socket.io-client";
import { createGroup, addUserToGroup} from '@/logic/group.logic'

export default {
  name: 'PxChat',
  props: [
    'showCreateGroup',
    'isComputer',
    'actualRoom'
  ],
  data(){
    return {
      chat: {
        name: '',
        messageInput: '',
        messages: []
      },
      name_channel: '',
      socket: io("http://localhost:4000"),
      showAddUser: false,
      newUserEmail: ''
    }
  },
  methods: {
    openMenu() {
      this.$emit('openMenu')
    },
    sendMessage(){
      this.socket.emit('chatMessage', this.chat.messageInput)
      this.chat.messageInput = ''
    },
    async createChannel(){
      let data = {
        name: this.name_channel,
        id_user: localStorage.getItem('user_id')
      }
      let result = await createGroup(data)

      alert("Creado")

      this.name_channel = ''

      this.$emit('reload')

    },
    closeCreateGroup(){
      this.$emit('closeCreateGroup')
    },
    toggleAddUser(){
      this.showAddUser = !this.showAddUser
    },
    async addUser (){
      let room = this.actualRoom._id
      let user = this.newUserEmail

      let result = await addUserToGroup(room, user)

      if (result.error){
        alert("Usuario no encontrado")
      } else {
        alert("Usuario agregado")
      }

      this.newUserEmail = ''

    },
    joinRoom(oldRoom){
      this.socket.emit("joinRoom", { username: localStorage.getItem('user_name'), toRoom: this.actualRoom._id, fromRoom: oldRoom  })
    }
  },
  mounted(){
    this.socket.on('message', (msg) => {
      this.chat.messages.push(msg)
    })
  },
  watch : {
    actualRoom(to, from){
      this.socket.emit("exit")
      this.chat.messages = []
      this.joinRoom(from._id)
    }
  }
}
</script>

<style scoped>

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.text__head {
  display: flex;
  align-items: center;
  color: #828282;
}

.text__head span{
  font-size: 1.1rem;
}

.text__head p{
  margin-left: 20px;
  font-size: .9rem;
}

.text__body {
  margin-top: 10px;
  color: #e0e0e0;
}

.create-group__container {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.createGroup {
  position: relative;
  width: 400px;
  background: #120f13;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 15px;
}

.createGroup i{
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.7rem;
  cursor: pointer;
}

.createGroup h2 {
  color: #f2f2f2;
  font-size: 1.1rem;
}

.createGroup input {
  background: #3c393f;
  color: white;
  font-size: 1.1rem;
  padding: 10px 15px;
  border: 2px solid #3c393f;
  border-radius: 10px;
  outline: none;
}

.createGroup input::placeholder {
  color: white;
}

.createGroup button {
  background: var(--blue-send);
  font-size: 1.1rem;
  color: white;
  border: 2px solid var(--blue-send);
  border-radius: 10px;
  padding: 7px 10px;
  align-self: flex-end;
  cursor: pointer;
}

.add-user__container {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-user {
  position: relative;
  width: 400px;
  background: #120f13;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 15px;
}

.add-user i{
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.7rem;
  cursor: pointer;
}

.add-user h2 {
  color: #f2f2f2;
  font-size: 1.1rem;
}

.add-user input {
  background: #3c393f;
  color: white;
  font-size: 1.1rem;
  padding: 10px 15px;
  border: 2px solid #3c393f;
  border-radius: 10px;
  outline: none;
}

.add-user input::placeholder {
  color: white;
}

.add-user button {
  background: var(--blue-send);
  font-size: 1.1rem;
  color: white;
  border: 2px solid var(--blue-send);
  border-radius: 10px;
  padding: 7px 10px;
  align-self: flex-end;
  cursor: pointer;
}

main {
  width:100%;
  height: 100vh;
  background: var(--grey-background) ;
}

.chat__header {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: var(--white-title);
  box-shadow: 0 0 2px 3px rgb(24, 24, 24);
}

.chat__header i {
  font-size: 1.7rem;
  margin-left: 10px;
  cursor: pointer;
}

.chat__header .header__name {
  margin-left: 10px;
  font-size: 1.1rem;
  font-weight: bold;
}

.chat__header .header__add {
  cursor: pointer;
  justify-self: flex-end;
  background: #3c393f;
  padding: 7px 10px;
  border-radius: 10px;
}

.chat__main {
  padding: 5px 10px;
  height: calc(100vh - 50px);
}

.main__texts {
  overflow: auto;
  height: calc(100vh - 110px);
}

.main__message {
  position: relative;
  width: calc(100% - 20px);
}

.main__message input{
  width: 100%;
  background: var(--grey-message);
  border: none;
  border-radius: 10px;
  padding: 15px 40px 15px 20px;
  color: var(--white-title);
  outline: none;
}

.main__message input::placeholder{
  color: var(--white-title);
}

.main__message .btn-send {
  font-size: 1.6rem;
  cursor: pointer;
  top: 5px;
  right: 5px;
  color: white;
  padding: 5px;
  border-radius: 10px;
  position: absolute;
  background: var(--blue-send);
}

.texts__list {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
}

.text-bot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px;
}

.text-bot .text__head{
  gap: 5px;
}

.text-bot .text__head p{
  margin: 0;
}

.text-bot .text__body{
  margin: 0;
}


@media (min-width: 768px) {
  main {
    position: absolute;
    width: calc(100% - 300px);
    right: 0;
  }
  .chat__header i {
    display: none;
  }
}

@media (max-width: 400px) {
  .createGroup {
    width: 100%;
  }
  
}
</style>