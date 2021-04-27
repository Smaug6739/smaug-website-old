<template>
  <div>
    <h2>
      Admin dashboard :
      <a href="#" @click="disconnect">Disconnection</a>
    </h2>
    <div id="projects">
      <div class="new">
        <h3>Projects:</h3>
        <router-link to="/admin/projects/new">
          <Button class="btn">New</Button></router-link
        >
      </div>
      <div v-if="projects && projects.result">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Order</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="element in projects.result" :key="element">
              <td v-if="element.name">{{ element.name }}</td>
              <td v-if="element.version">{{ element.version }}</td>
              <td v-if="element.order">{{ element.order }}</td>
              <td v-if="element.id" class="action">
                <a :href="'/admin/projects/' + element.id">
                  <Button class="btn">View</Button>
                </a>
                <a :href="'/admin/projects/' + element.id">
                  <Button class="btn">Delete</Button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btns">
        <button
          type="button"
          @click="previousProjects"
          v-text="'< Previous'"
        ></button>
        <button type="button" @click="nextProjects">Next ></button>
      </div>
    </div>
    <div id="resources">
      <div class="new">
        <h3>Resources:</h3>
        <router-link to="/admin/resources/new">
          <Button class="btn">New</Button></router-link
        >
      </div>
      <div v-if="resources && resources.result">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Author</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="element in resources.result" :key="element">
              <td v-if="element.name">{{ element.name }}</td>
              <td v-if="element.date_insert">
                {{ new Date(element.date_insert) }}
              </td>
              <td v-if="element.author">{{ element.author }}</td>
              <td v-if="element.id" class="action">
                <a :href="'/admin/resources/' + element.id">
                  <Button class="btn">View</Button>
                </a>
                <a :href="'/admin/resources/' + element.id">
                  <Button class="btn">Delete</Button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btns">
          <button
            type="button"
            @click="previousResources"
            v-text="'< Previous'"
          ></button>
          <button type="button" @click="nextResources">Next ></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/common/btn.component.vue";
export default {
  name: "Admin",
  data() {
    return {
      projects: [],
      resources: [],
      projectsPage: 1,
      resourcesPage: 1,
    };
  },
  components: {
    Button,
  },
  async beforeMount() {
    this.fetchProjectsAPI();
    this.fetchResourcesAPI();
  },

  methods: {
    async fetchProjectsAPI() {
      const responce = await fetch(
        `${this.$store.state.host}api/v1/project/all/${this.projectsPage}`
      );
      this.projects = await responce.json();
    },
    async fetchResourcesAPI() {
      const responce = await fetch(
        `${this.$store.state.host}api/v1/resources/all/${this.resourcesPage}`
      );
      this.resources = await responce.json();
    },
    nextProjects() {
      this.projectsPage++;
      this.fetchProjectsAPI();
    },
    previousProjects() {
      this.projectsPage--;
      this.fetchProjectsAPI();
    },
    nextResources() {
      this.resourcesPage++;
      this.fetchResourcesAPI();
    },
    previousResources() {
      this.resourcesPage--;
      this.fetchResourcesAPI();
    },
    async disconnect() {
      await fetch(`${this.$store.state.host}api/v1/auth/disconnection`, {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      }).then(() => {
        window.location.href = "/";
      });
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
}
.new {
  display: flex;
}
#projects {
  width: 90%;
  margin-left: 5%;
  table,
  td {
    border: 1px solid #333;
    text-align: center;
  }
  table {
    width: 100%;
  }
  thead,
  tfoot {
    background-color: #333;
    color: #fff;
  }
  .action {
    display: flex;
    justify-content: center;
  }
  .btn {
    margin: 0px 5px 5px 5px;
  }
}
.btns {
  display: flex;
  justify-content: center;
  margin: 5px;
  button {
    margin: 5px;
  }
}
#resources {
  width: 90%;
  margin-left: 5%;
  table,
  td {
    border: 1px solid #333;
    text-align: center;
  }
  table {
    width: 100%;
  }
  thead,
  tfoot {
    background-color: #333;
    color: #fff;
  }
  .action {
    display: flex;
    justify-content: center;
  }
  .btn {
    margin: 0px 5px 5px 5px;
  }
}
</style>