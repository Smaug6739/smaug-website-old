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
      <div v-if="result && result.result">
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
            <tr v-for="element in result.result" :key="element">
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
    </div>
  </div>
</template>
<script>
import Button from "@/components/common/btn.component.vue";
export default {
  name: "Admin",
  data() {
    return { result: [] };
  },
  components: {
    Button,
  },
  async beforeMount() {
    const responce = await fetch(
      `${this.$store.state.host}api/v1/project/all/1`
    );
    this.result = await responce.json();
  },
  methods: {
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
</style>