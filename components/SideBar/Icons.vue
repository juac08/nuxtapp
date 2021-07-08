<template>
  <div class="icons">
    <div v-html="$feathericons['settings'].toSvg()" class="icon"></div>
    <div @click="openModal">
      <div class="message" v-if="selectedProject">{{ comment }}</div>

      <div v-html="$feathericons['mail'].toSvg()" class="icon"></div>
    </div>
    <div>
      <div class="tag" v-if="selectedProject">{{ tag }}</div>
      <div v-html="$feathericons['bell'].toSvg()" class="icon"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapGetters(["selectedProject"]),
    comment() {
      return this.selectedProject.comments.length;
    },
    tag() {
      return this.selectedProject.tags.length;
    },
  },

  methods: {
    openModal() {
      return this.$store.dispatch("setModal", true);
    },
  },
};
</script>

<style  scoped>
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
}

.icon {
  color: rgb(0, 60, 255);
  background: rgb(234, 237, 252);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 65px;
  vertical-align: middle;
  border: 1px solid rgb(239, 235, 235);
  box-shadow: var(--light-shadow);
  transition: var(--transition);
}
.icon:hover {
  box-shadow: var(--dark-shadow);
  transform: rotate(90deg);
}
.message,
.tag {
  color: white;
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  transition: var(--transition);
  z-index: 1;
}
.pop {
  max-width: 2rem;
  max-height: 2rem;
  border-radius: var(--radius);
  position: absolute;
  top: 200px;
  left: 180px;
}
</style>