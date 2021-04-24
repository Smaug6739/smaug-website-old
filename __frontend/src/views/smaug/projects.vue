<template>
  <strong>
    This is an admin page.
    <a href="#" @click="disconnect">Disconnection</a>
  </strong>
  <div v-if="result && result.result">
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Version</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in result.result" :key="element">
          <td v-if="element.name">{{ element.name }}</td>
          <td v-if="element.version">{{ element.version }}</td>
          <td v-if="element.id">
            <a :href="'/admin/projects/' + element.id">Voir</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <strong>Projects page </strong>
</template>
<script>
export default {
  name: "adminprojects",
  data() {
    return { result: [] };
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

<style scoped>
table,
td {
  border: 1px solid #333;
  width: 90%;
  margin-left: 5%;
}
thead,
tfoot {
  background-color: #333;
  color: #fff;
}
</style>