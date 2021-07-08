<template>
  <div>
    <NavBar />
    <Model />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "~/components/NavBar/NavBar.vue";
import Model from "~/components/Model/Model.vue";

export default {
  components: {
    NavBar,
    Model,
  },
};
</script>


