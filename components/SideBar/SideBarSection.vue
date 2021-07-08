<template>
  <div>
    <section class="section-center">
      <article class="container item-1">
        <div class="header">
          <img src="@/assets/images/user-3.jpg" alt="Profile" class="image" />
        </div>
        <div class="content">
          <div class="heading">
            <h4>{{ setName }}</h4>
          </div>
          <div class="mail">
            <p>{{ setUserEmail }}</p>
          </div>
        </div>
        <Icons />
        <Tasks />
        <Projects />
        <div class="team">
          <Team />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import Icons from "~/components/SideBar/Icons.vue";
import Tasks from "~/components/SideBar/TaskBar.vue";
import Projects from "~/components/SideBar/ProjectOverview.vue";
import Team from "~/components/SideBar/Team.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Icons,
    Tasks,
    Projects,
    Team,
  },
  computed: { ...mapGetters(["setName", "setUserEmail"]) },
};
</script>

<style scoped>
.team {
  margin-top: -4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list {
  margin: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 370px;
  min-height: 19.1rem;
  padding: 10px;
  border: 1px solid lightgray;
  border-left: none;
  margin-top: -1.2rem;
  margin-bottom: 6.65rem;
}
.image {
  object-fit: cover;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px solid rgb(4, 236, 236);
  box-shadow: var(--light-shadow);
}
.heading {
  margin-top: 6px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>