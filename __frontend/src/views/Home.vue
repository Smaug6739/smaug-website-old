<template>
  <div>
    <div id="home">
      <div id="img-bi"></div>
      <h1 id="smaug">Smaug website</h1>
      <p>
        <a href="https://discord.com/users/611468402263064577" target="__blank">
          <Button color="#7278c2" size="large">
            <img
              src="@/assets/discord.svg"
              alt="discord"
              style="margin-right: 5px"
              class="logo"
            />
            Discord
          </Button>
        </a>
        <a href="https://github.com/Smaug6739" target="__blank">
          <Button color="#7278c2" size="large">
            <img
              src="@/assets/github.svg"
              alt="github"
              style="margin-right: 5px"
              class="logo"
            />
            Github
          </Button>
        </a>
        <a href="mailto:raphael.veauville@gmail.com" target="__blank">
          <Button color="#7278c2" size="large">
            <img
              src="@/assets/email.svg"
              alt="github"
              style="margin-right: 5px"
              class="logo"
            />
            Email
          </Button>
        </a>
      </p>
      <p>
        <img
          src="https://img.shields.io/badge/Uses-HTML-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          

          alt="HTML"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-CSS-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="CSS"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Javascript-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="Javascript"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Typescript-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="Typescript"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Node.js-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="Node.js"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-PHP-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="PHP"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-C++-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="C++"
          class="badge"
        />
      </p>
      <p>
        <img
          src="https://img.shields.io/badge/Uses-MongoDB-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          

          alt="MongoDB"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-MySQL-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="MySQL"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Postgres-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="Postgres"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Git-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          

          alt="Git"
          class="badge"
        />
        <img
          src="https://img.shields.io/badge/Uses-Docker-informational?style=flat&logo=Uses&logoColor=white&color=2bbc8a"
          alt="Docker"
          class="badge"
        />

      </p>
    </div>
    <div id="projects">
      <div class="separation">
        <h3>Projects :</h3>
      </div>
      <Projects :limit="6" />
    </div>
  </div>
</template>

<script>
import Projects from "@/components/projects.component.vue";
import Button from "@/components/common/btn.component.vue";
export default {
  name: "Home",
  components: {
    Projects,
    Button,
  },
};
</script>

<style scoped lang='scss'>
@import "../../public/scss/theme-variables";
#home {
  background-image: url("../assets/header-test.jpg");
  background-repeat: no-repeat;
  height: 40vh;
  #smaug {
    text-align: center;
  }
  h1 {
    padding-top: 10px;
  }
  p {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    a {
      margin: 5px;
    }
    .badge {
      margin: 5px;
    }
  }
}
#projects {
  margin-top: 1px;
  h3 {
    font-size: 1.5rem;
  }
}
.separation {
  text-align: start;
  padding: 5px;
  background: $background-element;
  height: 40px;
  margin-bottom: 60px;
}
</style>