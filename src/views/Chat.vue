<template>
  <px-nav @closeMenu="toggleMenu" :isComputer="isComputer" @changeRoom="changeRoom" @openCreateGroup="toggleCreate" :showMenu="showMenu" :key="key"/>
  <px-chat @openMenu="toggleMenu" :isComputer="isComputer" :actualRoom="actualRoom" @closeCreateGroup="toggleCreate" :showCreateGroup="showCreateGroup" @reload="reload"/>
</template>

<script>
import PxChat from '@/components/chat/PxChat'
import PxNav from '@/components/chat/PxNav'

import { getGroup } from '@/logic/group.logic'

export default {
  name:'Chat',
  components: {
    PxChat,
    PxNav
  },
  data(){
    return {
      showMenu: false,
      showCreateGroup: false,
      isComputer: false,
      actualRoom: '',
      key: 0
    }
  },
  methods: {
    toggleMenu(){
      this.showMenu = !this.showMenu
    },
    toggleCreate(){
      this.showCreateGroup = !this.showCreateGroup
    },
    async changeRoom(id){
      let result = await getGroup(id)
      this.actualRoom = result
    },
    reload(){
      this.key += 1
      this.toggleCreate()
    }
  },
  mounted(){
    let user_id = localStorage.getItem('user_id')

    if (user_id) {
      this.isComputer = window.screen.width > 768 ? true : false
      window.onresize = () => {

        if(window.screen.width < 768) {
          this.isComputer = false
        } else {
          this.isComputer = true
        }
        
      }
    } else {
      this.$router.push('/login')
    }
    
  }
}
</script>

<style>

</style>