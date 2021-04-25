<template>
  <div>
    <div id="alert" v-bind:class="type || 'primary'">
      <slot> </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
#alert {
  margin: 5px;
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  max-width: 80%;
  margin: auto;
  font-size: 1.1rem;
  a {
    font-weight: 700;
  }
}
.primary {
  color: #41464b;
  background-color: #e2e3e5;
  border-color: #d3d6d8;
}
.success {
  background: #d1e7dd;
  color: #0f5132;
  border-color: #badbcc;
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