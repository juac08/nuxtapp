<template>
  <div class="container">
    <div class="s1">
      <SideBarSection />
    </div>

    <transition name="fade" appear>
      <MarketingProjects />
    </transition>
  </div>
</template>

<script>
import MarketingProjects from "~/components/Departments/Marketing/MarketingProjects.vue";
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
export default {
  layout: "department",
  components: {
    SideBarSection,
    MarketingProjects,
  },
  head: {
    title: "Task Manager | Marketing",
  },
};
</script>

<style  scoped>
.s1 {
  margin-top: 1.2rem;
}
.container {
  display: flex;
  gap: 8rem;
}
</style>