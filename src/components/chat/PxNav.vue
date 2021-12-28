<template>
  <aside v-if="showMenu || isComputer">
    <section class="nav__header">
      <p>Channels</p>
      <i class='bx bx-plus create' @click="openCreateGroup"></i>
      <i class='bx bx-x close' v-if="!isComputer" @click="closeMenu"></i>
    </section>
    <section class="nav__channels">
      <div class="channels__search">
        <i class='bx bx-search'></i>
        <input type="text" placeholder="Search">
      </div>
      <div v-if="user.groups.length != 0" class="channels__list">
        <div v-for="group in user.groups" :key="group._id" class="channel" @click="changeRoom(group._id)">
          <p class="group__logo"> {{ group.name.charAt(0) }} </p>
          
          <p class="group__name"> {{ group.name }} </p>
        </div>
      </div>
      
      <div v-else class="no-groups">
        <p> No tienes grupos actualmente, crea uno o pide que te inviten </p>
      </div>
    </section>

    <section class="nav__profile">
      <div class="nav__options" v-if="showOptions">
        <div class="options__profile">
          <i class='bx bx-user-circle'></i>
          <p>My profile</p>
        </div>
        <hr>
        <div class="options__logout" @click="logOut">
          <i class='bx bx-log-out'></i>
          Logout
        </div>
      </div>
      <i class='bx bx-user user'></i>
      <p class="user-name"> {{user.name}} </p>
      <i class='bx bxs-chevron-down profile-menu' @click="toggleOptions"></i>
    </section>
  </aside>
</template>

<script>
import { getUserGroups } from '@/logic/group.logic'

export default {
  name:'PxNav',
  data(){
    return {
      user:{
        name: localStorage.getItem('user_name'),
        groups: []
      },
      showOptions: false
    }
  },
  methods: {
    toggleOptions(){
      this.showOptions = !this.showOptions
    },
    closeMenu(){
      this.$emit('closeMenu')
    },
    logOut(){
      localStorage.clear();
      this.$router.push('/login')
    },
    openCreateGroup(){
      this.$emit('openCreateGroup')
    },
    changeRoom(id){
      this.$emit('changeRoom', id)
    }
    
  },
  props: [
    'showMenu',
    'isComputer'
  ],
  async mounted(){
    const user_id = localStorage.getItem('user_id')
    let result = await getUserGroups(user_id)
    this.user.groups = result
    this.$emit('changeRoom', result[0]._id)
  }
}
</script>

<style scoped>

.no-groups {
  margin-top: 20px;
  color: white;
}

aside {
  position: absolute;
  z-index: 1;
  width: 85%;
  height: 100vh;
  background: var(--black-background);
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

.nav__header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--white-title);
  box-shadow: 0 0 2px 3px rgb(24, 24, 24);
}

.nav__header p{
  font-weight: bold;
  margin-left: 20px;
}

.create {
  position: absolute;
  background: #252329;
  font-size: 1.7rem;
  right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.close {
  position: absolute;
  right: -38px;
  font-size: 1.7rem;
  background: var(--black-background);
  border-radius: 5px;
  cursor: pointer;
}

.nav__channels {
  padding:20px
}

.channels__search {
  position: relative;
  display:flex;
  align-items: center;
}

.channels__search input {
  padding: 10px 5px 10px 30px;
  border-radius: 5px;
  width:100%;
  background: #3c393f;
  border: none;
  outline: none;
  color: white;
  font-size: 1.1rem;
}

.channels__search input::placeholder {
  color: white;
}

.channels__search i {
  position: absolute;
  font-size: 1.4rem;
  left: 5px;
  color: white;
}

.nav__profile {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  color: white;
  gap:10px;
  padding: 0 20px;
}

.nav__profile .user {
  font-size: 1.7rem;
}

.nav__profile .user-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.nav__profile .profile-menu {
  margin-left: auto;
  cursor: pointer;
}

.nav__options {
  position: absolute;
  right: 10px;
  top: -90px;
  width: 150px;
  color: white;
  padding: 10px;
  background: #252329;
  border-radius: 10px;
  border: 1px solid #3c393f;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.options__profile, .options__logout {
  display: flex;
  cursor: pointer;
  padding: 10px 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.options__profile:hover, .options__logout:hover {
  display: flex;
  background: #3c393f;
  border-radius: 10px;
}

.options__profile i, .options__logout i {
  font-size: 1.2rem;
}

.options__logout {
  color: var(--red-font);
}

.channels__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  max-height: calc(100vh - 175px);
  overflow-y: scroll;
}

.channel {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.channel .group__logo{
  width: 35px;
  font-weight: bold;
  background: #252329;
  font-size: 1.7rem;
  color: white;
  border-radius: 10px;
  text-align: center;
}

.channel .group__name{
  margin-left: 5px;
  color: #bdbdbd;
  font-weight: bold;
}

@media (min-width: 768px) {
  aside {
    display: block;
    z-index: 0;
  }
  .close {
    display: none;
  }
}

</style>