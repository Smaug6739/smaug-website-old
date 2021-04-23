<template>
  <strong>
    This is an admin page.
    <a href="#" @click="disconnect">Disconnection</a>
  </strong>
</template>

<script>
export default {
  name: "Admin",
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
