<template>
  <div>
    <ul v-if="projects && projects.length" id="container">
      <li v-for="project in projects" :key="project">
        <div class="top">
          <img
            :src="host + 'static/uploads/projects/images/' + project.image"
            alt=""
            width="150"
            height="150"
          />
        </div>
        <div class="infos">
          <h2>{{ project.name }}</h2>
          <p>{{ project.description }}</p>
        </div>
        <div class="footer">
          <div class="btns">
            <span v-if="project.github">
              <a :href="project.github" target="__blank">
                <Btn color="rgb(84, 90, 167)" size="normal" class="btn1">
                  <img
                    src="@/assets/github.svg"
                    alt="github"
                    style="margin-right: 5px"
                  />
                  Github
                </Btn>
              </a>
            </span>
            <span v-if="project.id">
              <router-link :to="'/project/' + project.id">
                <Btn size="normal" class="btn2" style="text-align: center">
                  View
                </Btn>
              </router-link>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <Loader msg="Loading..." />
    </div>
  </div>
</template>

<script>
import Btn from "@/components/common/btn.component.vue";
import Loader from "@/components/common/loader.component.vue";
export default {
  name: "Projects",
  data() {
    return {
      projects: [],
      host: this.$store.state.host,
      pageAPI: 1,
    };
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 9,
    },
  },
  watch: {
    page: function (newVal) {
      this.pageAPI = newVal;
      this.fetchAPI();
    },
  },
  beforeMount() {
    if (this.page) this.pageAPI = this.page;
    this.fetchAPI();
  },
  methods: {
    async fetchAPI() {
      const responce = await fetch(
        `${this.$store.state.host}api/v1/project/all/${this.pageAPI}`
      );
      const result = await responce.json();
      if (result && result.result)
        this.projects = result.result.splice(0, this.limit);
    },
  },
  components: {
    Btn,
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
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0.5;
  position: relative;
  margin: 40px;
  margin-bottom: 100px;
}

.top > img {
  margin-top: -25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}

li {
  list-style: none;
}

.btn1 {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
.btn2 {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
@media screen and (max-width: 700px) {
  li {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>