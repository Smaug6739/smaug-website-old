<template>
  <div>
    <div id="home">
      <div id="img-bi"></div>
      <h1 id="smaug">Smaug website</h1>
      <p>
        <a href="https://discord.com/users/611468402263064577" target="__blank">
          <Button color="#545aa7" size="large">
            <img
              src="@/assets/discord.svg"
              alt="discord"
              style="margin-right: 5px"
              class="logo"
            />
            Discord
          </Button>
        </a>
        <a href="https://github.com/SmaugDev" target="__blank">
          <Button color="#545aa7" size="large">
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
          <Button color="#545aa7" size="large">
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
          src="https://img.shields.io/static/v1?label=Uses&message=HTML&color=green"
          alt=""
          class="badge"
        />
        <img
          src="https://img.shields.io/static/v1?label=Uses&message=CSS&color=green"
          alt=""
          class="badge"
        />
        <img
          src="https://img.shields.io/static/v1?label=Uses&message=Javascript&color=green"
          alt=""
          class="badge"
        />
        <img
          src="https://img.shields.io/static/v1?label=Uses&message=Node.js&color=green"
          alt=""
          class="badge"
        />
      </p>
    </div>
    <div id="projects">
      <div class="separation">
        <h3>Projects :</h3>
      </div>
      <Projects />
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
  background-image: url("../assets/background.png");
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