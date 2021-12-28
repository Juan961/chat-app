<template>
  <px-header />
  <px-body />
</template>

<script>
import PxHeader from '@/components/home/PxHeader'
import PxBody from '@/components/home/PxBody'

export default {
  name: 'Home',
  components: {
    PxHeader,
    PxBody
  },
  mounted(){
    let user_id = localStorage.getItem('user_id')

    if(user_id) {
      this.$router.push('/chat')
    }

  }
}
</script>
