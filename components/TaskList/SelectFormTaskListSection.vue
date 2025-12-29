<template>
  <div class="task-list-section">
    <TaskList :searchQuery="searchQuery" :filterStatus="filterStatus" />
  </div>
</template>

<script>
import TaskList from "~/components/TaskList/TaskList.vue";
export default {
  components: {
    TaskList,
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
    filterStatus: {
      type: String,
      default: "all",
    },
  },
};
</script>

<style scoped>
.task-list-section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
