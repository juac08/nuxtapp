<template>
  <div class="container section-center">
    <SideBarSection />
    <ListSection />
    <div class="add">
      <AddTask />
    </div>
  </div>
</template>

<script>
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
import ListSection from "~/components/TaskList/SelectFormTaskListSection.vue";
import AddTask from "~/components/TaskList/AddTask.vue";

export default {
  components: {
    SideBarSection,
    ListSection,
    AddTask,
  },
  head: {
    title: "Task Manager | Add Project",
  },
};
</script>

<style  scoped>
.section-center {
  margin: 10px;
  padding: 10px 0px;
  display: flex;
  justify-content: baseline;
  margin-left: -20px;
}
</style>