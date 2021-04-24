<template>
  <header>
    <nav class="navbar">
      <span class="navbar-toggle" id="js-navbar-toggle" @click="open">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </span>
      <router-link to="/" class="img"
        ><img src="@/assets/logo.png" alt="logo"
      /></router-link>
      <ul class="main-nav" id="js-menu">
        <li>
          <router-link to="/" class="nav-links" @click="close"
            >Home</router-link
          >
        </li>
        <li>
          <router-link to="/projects/1" class="nav-links" @click="close"
            >Projects</router-link
          >
        </li>
        <li>
          <router-link to="/about" class="nav-links" @click="close"
            >About</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
.navbar {
  padding-top: 1%;
  font-size: 18px;
  background-color: $background-element;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.img img {
  max-width: 5%;
}
.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
}
.main-nav {
  list-style-type: none;
  display: none;
}

.nav-links,
.main-nav li {
  text-align: center;
  margin: 15px auto;
  &.router-link-exact-active {
    color: white;
  }
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

.active {
  display: block;
}
@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0px;
    padding-top: 0px;
    height: 70px;
    align-items: center;
    flex-direction: row;
  }
  .img img {
    width: 3%;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  .nav-links {
    margin-left: 40px;
  }
  .navbar-toggle {
    display: none;
  }

  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>

<script>
export default {
  name: "navbar",
  methods: {
    open() {
      let mainNav = document.getElementById("js-menu");
      mainNav.classList.toggle("active");
    },
    close() {
      let mainNav = document.getElementById("js-menu");
      mainNav.classList.toggle("active");
    },
  },
};
</script>
