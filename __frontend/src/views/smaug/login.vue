<template>
  <form>
    <fieldset>
      <legend>Connexion</legend>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button type="button" @click="connect">Connexion</button>
    </fieldset>
  </form>
</template>
<script>
export default {
  name: "login",
  methods: {
    async connect() {
      await fetch("http://localhost:8081/login", {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      });
      await fetch("http://localhost:8081/test", {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
form {
  padding: 10px;
  width: 80%;
  margin: auto;
}
fieldset {
  padding: 10px;
}
legend {
  float: left;
  text-align: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: calc(1.275rem + 0.3vw);
  line-height: inherit;
}
input {
  display: block;
  margin: auto;
  margin-top: 10px;
  padding: 3px;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: $background-element;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>