<template>
  <div id="app">
    <main role="main" style="flex: 1 0 auto">
      <NavBar />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/layout/navbar.component.vue";
import Footer from "@/components/layout/footer.component.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
