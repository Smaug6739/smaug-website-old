<template>
  <div v-if="result">
    <form>
      <fieldset>
        <legend>Projet :</legend>
        <ul>
          <li>
            <label for="title">Le titre de votre projet : </label>
            <input
              type="text"
              placeholder="Titre de votre projet"
              id="title"
              :value="result.name ? result.name : ''"
            />
          </li>
          <li>
            <label for="order">Order : </label>
            <input
              type="number"
              id="order"
              placeholder="0"
              :value="result.order ? result.order : ''"
            />
          </li>
          <li>
            <label for="version">Version : </label>
            <input
              type="text"
              id="version"
              placeholder="1.0.0"
              :value="result.version ? result.version : ''"
            />
          </li>
          <li>
            <label for="description">Description : </label>
            <input
              type="text"
              id="description"
              placeholder="Description du projet."
              :value="result.description ? result.description : ''"
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
              v-text="result.content ? result.content : ''"
            ></textarea>
          </li>
          <li>
            <label for="category">Categorie : </label>
            <input
              type="text"
              id="category"
              placeholder="Categorie"
              :value="result.category ? result.category : ''"
            />
          </li>
          <li>
            <label for="miniature">Miniature : </label>
            <input type="file" id="miniature" />
          </li>
          <li>
            <label for="github">Github : </label>
            <input
              type="text"
              id="github"
              placeholder="https://github.com"
              :value="result.github ? result.github : ''"
            />
          </li>
          <li>
            <label for="bugs">Bugs : </label>
            <input
              type="text"
              id="bugs"
              placeholder="https://github.com"
              :value="result.bugs ? result.bugs : ''"
            />
          </li>
          <li>
            <label for="link">Link : </label>
            <input
              type="text"
              id="link"
              placeholder="https://site.com"
              :value="result.link ? result.link : ''"
            />
          </li>
          <li>
            <label for="license">License : </label>
            <input
              type="text"
              id="license"
              placeholder="MIT/Apache2.0"
              :value="result.license ? result.license : ''"
            />
          </li>
          <li>
            <label for="source_code">Code source : </label>
            <input type="file" id="source_code" />
          </li>
        </ul>
        <button type="button" @click="updateProject">Update</button>
      </fieldset>
    </form>
    <div v-if="alert.type && alert.message && alert.for === 'update'">
      <Alert :type="alert.type"> {{ alert.message }} </Alert>
    </div>
    <form>
      <fieldset id="danger">
        <legend>Danger</legend>
        <ul>
          <li>
            <div id="danger-delete">
              <input
                type="checkbox"
                class="danger-delete"
                id="form-delete"
                name="form-delete"
                v-model="isCheck"
              />
              <label for="form-delete" class="danger-delete"
                >Confirmation</label
              >
            </div>
            <button type="button" @click="deleteProject">
              Supprimer le projet
            </button>
          </li>
        </ul>
      </fieldset>
      <div v-if="alert.type && alert.message && alert.for === 'delete'">
        <Alert :type="alert.type"> {{ alert.message }} </Alert>
      </div>
    </form>
  </div>
</template>


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
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.danger-delete {
  display: inline-block;
  text-align: end;
}
</style>






<script>
import Alert from "@/components/common/alert.component.vue";
const projectId = window.location.href.split("/").reverse()[0];
export default {
  name: "post page",
  async beforeMount() {
    const responce = await fetch(
      `${this.$store.state.host}api/v1/project/${projectId}`
    );
    const result = await responce.json();
    this.result = result.result;
  },
  data() {
    return {
      result: [],
      alert: {},
      isCheck: false,
    };
  },
  components: {
    Alert,
  },
  methods: {
    async updateProject() {
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
        method: "PATCH",
        body: body,
        credentials: "include",
        withCredentials: true,
      };
      const responce = await fetch(
        `${this.$store.state.host}api/v1/project/${projectId}`,
        options
      );
      const result = await responce.json();
      if (result.status && result.status === "success")
        this.alert = { for: "update", type: "success", message: "success" };
      else
        this.alert = {
          type: "danger",
          message: `Error ${result.message ? result.message : ""}`,
          for: "update",
        };
    },
    async deleteProject() {
      if (this.isCheck) {
        const responce = await fetch(
          `${this.$store.state.host}api/v1/project/${projectId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const result = await responce.json();
        if (result && result.result === "success") {
          this.alert = {
            for: "delete",
            type: "success",
            message: `Project deleted`,
          };
          setTimeout(() => {
            window.location.href = "/admin";
          }, 3000);
        } else {
          this.alert = {
            for: "delete",
            type: "danger",
            message: `Error`,
          };
        }
      }
    },
  },
};
</script>