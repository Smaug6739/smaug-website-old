<template>
  <form>
    <fieldset>
      <legend>Connexion</legend>
      <input id="form-username" type="text" placeholder="Username" />
      <input id="form-password" type="text" placeholder="Password" />
      <button type="button" @click="connect">Connexion</button>
    </fieldset>
  </form>
</template>
<script>
export default {
  name: "login",
  beforeMount() {
    if (document.cookie && document.cookie.includes("user_auth"))
      this.$router.push("/admin/projects");
  },
  methods: {
    async connect() {
      const content = JSON.stringify({
        username: document.getElementById("form-username").value,
        password: document.getElementById("form-password").value,
      });
      const responce = await fetch(`${this.$store.state.host}api/v1/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: content,
        credentials: "include",
        withCredentials: true,
      });
      const result = await responce.json();
      if (result.result.auth) window.location.href = "/admin/projects";
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