<template>
  <form>
    <fieldset>
      <legend>Projet :</legend>
      <ul>
        <li>
          <label for="title">Le titre de votre projet : </label>
          <input type="text" placeholder="Titre de votre projet" id="title" />
        </li>
        <li>
          <label for="order">Order : </label>
          <input type="number" id="order" placeholder="0" />
        </li>
        <li>
          <label for="version">Version : </label>
          <input type="text" id="version" placeholder="1.0.0" />
        </li>
        <li>
          <label for="description">Description : </label>
          <input
            type="text"
            id="description"
            placeholder="Description du projet."
          />
        </li>
        <li>
          <label for="content">Content : </label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="Contenu du projet"
          ></textarea>
        </li>
        <li>
          <label for="category">Categorie : </label>
          <input type="text" id="category" placeholder="Categorie" />
        </li>
        <li>
          <label for="miniature">Miniature : </label>
          <input type="file" id="miniature" />
        </li>
        <li>
          <label for="github">Github : </label>
          <input type="text" id="github" placeholder="https://github.com" />
        </li>
        <li>
          <label for="bugs">Bugs : </label>
          <input type="text" id="bugs" placeholder="https://github.com" />
        </li>
        <li>
          <label for="link">Link : </label>
          <input type="text" id="link" placeholder="https://site.com" />
        </li>
        <li>
          <label for="license">License : </label>
          <input type="text" id="license" placeholder="MIT/Apache2.0" />
        </li>
        <li>
          <label for="source_code">Code source : </label>
          <input type="file" id="source_code" />
        </li>
      </ul>
      <button type="button" @click="sendProject">Envoyer</button>
    </fieldset>
    <div v-if="alert.type && alert.message && alert.for === 'post'">
      <Alert :type="alert.type"> {{ alert.message }} </Alert>
    </div>
  </form>
</template>

<script>
import Alert from "@/components/common/alert.component.vue";

export default {
  name: "post page",
  components: {
    Alert,
  },
  data() {
    return {
      alert: {},
    };
  },
  methods: {
    async sendProject() {
      const body = new FormData();
      body.append("name", document.getElementById("title").value);
      body.append("order", document.getElementById("order").value);
      body.append("version", document.getElementById("version").value);
      body.append("description", document.getElementById("description").value);
      body.append("content", document.getElementById("content").value);
      body.append("category", document.getElementById("category").value);
      body.append("miniature", document.getElementById("miniature").files[0]);
      body.append("github", document.getElementById("github").value);
      body.append("bugs", document.getElementById("bugs").value);
      body.append("link", document.getElementById("link").value);
      body.append("license", document.getElementById("license").value);
      body.append("source", document.getElementById("source_code").files[0]);
      const options = {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        body: body,
      };
      const route = `${this.$store.state.host}api/v1/project`;
      console.log(route);
      const responce = await fetch(
        `${this.$store.state.host}api/v1/project`,
        options
      );
      const result = await responce.json();
      if (result.status === "success") {
        this.alert = {
          for: "post",
          type: "success",
          message: "success",
        };
      } else {
        this.alert = {
          for: "post",
          type: "danger",
          message: `Error ${result.message ? result.message : ""}`,
        };
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
form {
  width: 90%;
  margin-left: 5%;
}
fieldset {
  width: 100%;
}
legend {
  text-align: start;
  margin-left: 5%;
  font-size: 1.8rem;
  font-weight: 700;
}
ul {
  text-align: start;
}
li {
  display: flex;
  flex-direction: column;
  padding: 1%;
}
label {
  font-weight: 600;
  font-size: 1.2rem;
  padding-bottom: 10px;
}
input {
  display: block;
  width: 98%;
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
button {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background: $pink;
}
button:hover {
  background: $dark-pink;
}
</style>