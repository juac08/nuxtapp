<template>
  <div class="container" v-if="popup && selectedProject">
    <div class="radio-container">
      <transition name="fade" appear>
        <div class="heading">
          <h3>Messages:</h3>
          <ul>
            <li v-for="(c, i) in selectedProject.comments" :key="i">
              <p>{{ c.comment }}......</p>
            </li>
          </ul>
        </div>
      </transition>
      <AppButton class="btn" @click="setModal(false)">Close</AppButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/components/UI/AppBaseButton.vue";
export default {
  computed: { ...mapGetters(["popup", "selectedProject"]) },
  methods: { ...mapActions(["setModal"]) },
  components: { AppButton },
};
</script>

<style>
.radio-container {
  display: flex;
  position: absolute;
  top: 10%;
  left: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgb(241, 242, 247);
  box-shadow: var(--light-shadow);
  width: 20rem;
  min-height: 20rem;
  padding: 30px 60px;
  margin: 4rem auto;
  border-radius: 0 50px 0 50px;
}
.radio-container h3 {
  color: rgb(91, 139, 251);
}
</style>