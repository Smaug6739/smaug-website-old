<template>
  <button
    type="button"
    :class="size ? size : ''"
    :style="{ 'background-color': color }"
  >
    <slot> </slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "../../../public/scss/theme-variables";
button {
  display: flex;
  justify-content: center;
  font-weight: 600;
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
  background-color: $pink;
}
.auto {
  width: auto;
}
.normal {
  width: 110px;
}
.large {
  width: 150px;
}
.logo {
  width: 24px;
  height: 24px;
}
</style>