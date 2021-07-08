<template>
  <button class="btn" v-bind="$attrs" v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  name: "AppButton",
};
</script>


<style scoped>
.btn {
  background: rgb(80, 120, 254);
  color: white;
  padding: 10px 40px;
  border-radius: 20px;
  letter-spacing: 0;
}
button {
  box-shadow: var(--light-shadow);
  transition: all 0.3s;
}
button:hover {
  background: blue;
  transform: translateY(-2px);
}
button:active {
  transform: translateY(2px);
}
</style>
