<template>
  <main>
    <form @submit.prevent="signUp">
      <h2>Get started free</h2>
      <input v-model="user.name" type="text" placeholder="Name">
      <input v-model="user.email" type="email" placeholder="Email">
      <input v-model="user.password" type="password" placeholder="Password">
      <button>Get started</button>
      <router-link to="/login">Have an account?</router-link>
    </form>
  </main>
</template>

<script>
import { register } from '@/logic/auth.logic'

export default {
  name:'PxLogin',
  data(){
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signUp(){
      try {
        let result = await register(this.user) 
        alert("Registro exitoso")

        this.$router.push('/login')  
        
      } catch (error) {
        if(error.response.status === 400){
          alert("El correo ya está registrado")
        } else {
          alert("Error al registrarse")
        }

      }
      
    }
  }
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  background: var(--black-background);
  display: flex;
  justify-content: center;
  align-items: center;
}

main form {
  width: 400px;
  display: flex;
  flex-direction: column;
}

form h2 {
  color: var(--white-title);
  margin-bottom: 20px;
}

form input {
  padding: 5px 20px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  border-radius: 5px;
}

form button {
  margin-bottom: 10px;
  padding: 5px 0;
  color: var(--white-title);
  background: var(--blue-send);
  font-size: 1.1rem;
  border: 2px solid var(--blue-send);
  border-radius: 5px;
  cursor: pointer;
}
</style>