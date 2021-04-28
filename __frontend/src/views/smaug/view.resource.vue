<template>
  <div v-if="result">
    <form>
      <fieldset>
        <legend>Projet :</legend>
        <ul>
          <li>
            <label for="title">Title : </label>
            <input
              type="text"
              placeholder="Titre de votre projet"
              id="title"
              :value="result.name ? result.name : ''"
            />
          </li>
          <li>
            <label for="category">Category : </label>
            <input
              type="text"
              id="category"
              placeholder="Categorie"
              :value="result.category ? result.category : ''"
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
              rows="25"
              placeholder="Contenu du projet"
              v-text="result.content ? result.content : ''"
            ></textarea>
          </li>
          <li>
            <label for="description">Author : </label>
            <input
              type="text"
              id="author"
              placeholder="Author of project."
              :value="result.author ? result.author : ''"
            />
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
              Delete this resource
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
const resourceId = window.location.href.split("/").reverse()[0];
export default {
  name: "View resource admin",
  async beforeMount() {
    console.log(this.result);

    const responce = await fetch(
      `${this.$store.state.host}api/v1/resources/${resourceId}`
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
      const content = JSON.stringify({
        name: document.getElementById("title").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        content: document.getElementById("content").value,
        author: document.getElementById("author").value,
      });
      const options = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: content,
        credentials: "include",
        withCredentials: true,
      };
      const responce = await fetch(
        `${this.$store.state.host}api/v1/resources/${resourceId}`,
        options
      );
      const result = await responce.json();
      if (result.status && result.status === "success")
        this.alert = { for: "update", type: "success", message: "Success" };
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
          `${this.$store.state.host}api/v1/resources/${resourceId}`,
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
            this.$router.push("/admin");
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