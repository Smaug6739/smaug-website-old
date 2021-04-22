<template>
  <div id="alert" v-bind:class="type || 'primary'">
    <slot> </slot>
  </div>
</template>

<style scoped>
#alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  max-width: 80%;
  margin: auto;
}
.primary {
  color: #41464b;
  background-color: #e2e3e5;
  border-color: #d3d6d8;
}
.success {
  color: #155724;
  background-color: #308644;
  border-color: #c3e6cb;
}
.danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
.warning {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}
</style>

<script>
export default {
  name: "HelloWorld",
  props: {
    type: String,
  },
};
</script>