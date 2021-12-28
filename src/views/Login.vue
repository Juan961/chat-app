<template>
  <px-login />
</template>

<script>
import PxLogin from '@/components/login/PxLogin'
export default {
  name: 'Login',
  components: {
    PxLogin
  },
  mounted(){
    let user_id = localStorage.getItem('user_id')

    if(user_id) {
      this.$router.push('/chat')
    }

  }
}
</script>

<style>

</style>