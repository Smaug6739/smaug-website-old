<template>
  <main role="main" style="flex: 1 0 auto">
    <NavBar />
    <router-view />
  </main>
  <Footer />
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

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 1%;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
