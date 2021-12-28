<template>
  <header>
    <p class="header__title">Chat App</p>
    <nav class="header__nav">
      <ul>
        <li class="nav__item"> <router-link to="/login">Login</router-link> </li>
        <li class="nav__item"> <router-link to="/register">Register</router-link> </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name:'PxHeader'
}
</script>

<style>
header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--grey-background);
  color: var(--white-title);
}

.header__title {
  font-size: 1.5rem;
  margin-left: 0.6rem;
}

.header__nav {
  margin-right: 0.6rem;
}

.header__nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

.nav__item a{
  color: var(--white-title);
  text-decoration: none;
}
</style>