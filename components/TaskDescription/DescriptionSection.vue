<template>
  <div class="task-details-section">
    <TaskListNav />
    <Description />
  </div>
</template>

<script>
import TaskListNav from "~/components/TaskDescription/TaskListNav.vue";
import Description from "~/components/TaskDescription/ProjectDescription.vue";
export default {
  components: {
    TaskListNav,
    Description,
  },
};
</script>

<style scoped>
.task-details-section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
