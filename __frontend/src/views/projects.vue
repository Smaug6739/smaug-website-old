<template>
  <div>
    <div id="projects">
      <h1>Projects :</h1>
      <Projects :page="page" />
    </div>
    <div id="btns">
      <button type="button" @click="previous" v-text="'< Previous'"></button>
      <button type="button" @click="next">Next ></button>
    </div>
  </div>
</template>

<script>
import Projects from "@/components/projects.component.vue";
export default {
  name: "Projects list",
  components: {
    Projects,
  },
  data() {
    return {
      page: Number,
    };
  },
  beforeMount() {
    this.page = parseInt(window.location.href.split("/").reverse()[0]);
  },
  methods: {
    next() {
      const nextPage = this.page + 1;
      this.$router.push(`/projects/${nextPage}`);
      this.page = nextPage;
    },
    previous() {
      const previousPage = this.page - 1;
      this.$router.push(`/projects/${previousPage}`);
      this.page = previousPage;
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../../public/scss/theme-variables";

#projects {
  margin-top: 30px;
  h1 {
    padding: 15px;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
}
#btns {
  display: flex;
  justify-content: center;
  margin: 5px;
  button {
    margin: 5px;
  }
}
</style>