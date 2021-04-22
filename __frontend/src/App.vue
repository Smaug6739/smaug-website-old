<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 5%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #cecece;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
