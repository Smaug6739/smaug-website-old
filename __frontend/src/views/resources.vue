<template>
  <div>
    <div>
      <ul v-if="resources && resources.length" id="container">
        <li v-for="resource in resources" :key="resource">
          <h2>{{ resource.name }}</h2>
          <p>{{ resource.description }}</p>
          <router-link :to="'/resource/' + resource.id">
            <button>View</button></router-link
          >
        </li>
      </ul>
      <div v-else>
        <Loader msg="Loading..." />
      </div>
    </div>
    <div id="btns">
      <button type="button" @click="previous" v-text="'< Previous'"></button>
      <button type="button" @click="next">Next ></button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/common/loader.component.vue";
export default {
  name: "Resources",
  data() {
    return {
      resources: [],
      pageAPI: 1,
    };
  },
  beforeMount() {
    this.fetchAPI();
  },
  methods: {
    next() {
      const nextPage = this.pageAPI + 1;
      this.$router.push(`/resources/${nextPage}`);
      this.pageAPI = nextPage;
      this.fetchAPI();
    },
    previous() {
      const previousPage = this.pageAPI - 1;
      this.$router.push(`/resources/${previousPage}`);
      this.pageAPI = previousPage;
      this.fetchAPI();
    },
    fetchAPI() {
      fetch(
        `${this.$store.state.host}api/v1/resources/all/${this.pageAPI}`
      ).then((responce) => {
        responce.json().then((result) => {
          console.log(result);
          this.resources = result.result;
        });
      });
    },
  },
  components: {
    Loader,
  },
};
</script>
<style scoped lang="scss">
@import "../../public/scss/theme-variables";
#container {
  width: 90%;
  margin: auto;
  padding: 1%;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
li {
  text-align: start;
  background: $background-element;
  padding: 15px;
  width: 300px;
  height: 350px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0.5;
  margin: 40px;
  margin-bottom: 100px;
  position: relative;
  button {
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin: auto;
  }
}

li {
  list-style: none;
}
#btns {
  display: flex;
  justify-content: center;
  margin: 5px;
  button {
    margin: 5px;
  }
}
@media screen and (max-width: 700px) {
  li {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>