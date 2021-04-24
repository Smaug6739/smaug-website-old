<template>
  <div id="projects">
    <h3>Projects :</h3>
    <Projects page="1" />
  </div>
</template>

<script>
import Projects from "@/components/projects.component.vue";
export default {
  name: "Projects list",
  components: {
    Projects,
  },
};
</script>

<style scoped lang='scss'>
@import "../../public/scss/theme-variables";

#projects {
  margin-top: 30px;
  h3 {
    font-size: 1.5rem;
  }
}
</style>