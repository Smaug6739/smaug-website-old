<template>
  <form>
    <fieldset>
      <legend>Projet :</legend>
      <ul>
        <li>
          <label for="title">Title : </label>
          <input type="text" placeholder="Titre de votre projet" id="title" />
        </li>
        <li>
          <label for="category">Category : </label>
          <input type="text" id="category" placeholder="Categorie" />
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
          <label for="author">Author : </label>
          <input type="text" id="author" placeholder="Author" />
        </li>
      </ul>
      <button type="button" @click="sendResource">Envoyer</button>
    </fieldset>
    <div v-if="alert.type && alert.message && alert.for === 'post'">
      <Alert :type="alert.type"> {{ alert.message }} </Alert>
    </div>
  </form>
</template>

<script>
import Alert from "@/components/common/alert.component.vue";

export default {
  name: "postpage",
  components: {
    Alert,
  },
  data() {
    return {
      alert: {},
    };
  },
  methods: {
    async sendResource() {
      const content = JSON.stringify({
        name: document.getElementById("title").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        content: document.getElementById("content").value,
        author: document.getElementById("author").value,
      });
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: content,
        credentials: "include",
        withCredentials: true,
      };
      const responce = await fetch(
        `${this.$store.state.host}api/v1/resources`,
        options
      );
      const result = await responce.json();
      if (result.status === "success") {
        this.alert = {
          for: "post",
          type: "success",
          message: "Success",
        };
        setTimeout(() => {
          this.$router.push("/admin");
        }, 3000);
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
</style>