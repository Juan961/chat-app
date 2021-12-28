<template>
  <px-register></px-register>
</template>

<script>
import PxRegister from '@/components/register/PxRegister'
export default {
  name:'Register',
  components: {
    PxRegister
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