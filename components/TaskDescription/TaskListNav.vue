<template>
  <div class="nav">
    <div class="title">
      <img src="@/assets/images/user-3.jpg" alt="" class="image" />
      <h5>{{ setName }}</h5>
    </div>
    <div class="icons">
      <div>
        <div
          v-html="$feathericons['trash-2'].toSvg()"
          class="icon"
          @click="remove"
        ></div>
      </div>
      <div>
        <div v-html="$feathericons['user'].toSvg()" class="icon"></div>
      </div>
      <div>
        <div class="tag" v-if="selectedProject.tags">{{ count }}</div>
        <div v-html="$feathericons['tag'].toSvg()" class="icon"></div>
      </div>
      <div v-if="selectedProject">
        <div
          v-html="$feathericons['check-square'].toSvg()"
          class="icon"
          :class="[selectedProject.approved && 'approved']"
          @click="approve"
        ></div>
      </div>
      <div>
        <div v-html="$feathericons['paperclip'].toSvg()" class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["setName", "selectedProject"]),

    count() {
      return this.selectedProject.tags.length;
    },
  },
  methods: {
    remove() {
      return this.$store.dispatch("remove", this.selectedProject.id);
    },
    approve() {
      this.$store.dispatch("setApprove", this.selectedProject.id);
    },
  },
};
</script>

<style  scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 67px;
  border: 1px solid lightgray;
  border-right: none;
  margin-top: -1.2rem;
  padding: 32px;
  box-shadow: var(--light-shadow);
  margin-right: -1rem;
  width: 100%;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-left: 19rem;
}
.image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid rgb(4, 236, 236);
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
  transform: rotate(10deg);
  box-shadow: var(--dark-shadow);
}
.tag {
  position: absolute;
  background: rgb(240, 57, 57);
  border-radius: 50%;
  text-align: center;
  height: 19px;
  width: 19px;
  z-index: 1;
  color: white;
}

.approved {
  background: rgb(80, 120, 254);
  color: white;
}
</style>