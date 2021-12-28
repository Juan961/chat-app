<template>
  <main>
    <h1>404 Not Found!</h1>
    <router-link to="/">Go back</router-link>
  </main>
</template>

<script>
export default {
  name:'Error'
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--black-background);
  color: var(--white-title);
}

main h1{
  font-size: 3rem;
}

main a{
  color: var(--white-p);
  text-decoration: none;
}

main a:hover{
  color: var(--white-title);
}
</style>