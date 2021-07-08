<template>
  <div class="container section-center">
    <SideBarSection />
    <ListSection />
    <div class="des">
      <DescriptionSection />
    </div>
  </div>
</template>

<script>
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
import ListSection from "~/components/TaskList/SelectFormTaskListSection.vue";
import DescriptionSection from "~/components/TaskDescription/DescriptionSection.vue";

export default {
  components: {
    SideBarSection,
    ListSection,
    DescriptionSection,
  },
  head: {
    title: "Task Manager | Home",
  },
};
</script>

<style  scoped>
.section-center {
  margin: 10px;
  padding: 10px 0px;
  display: flex;
  justify-content: inherit;
  margin-left: -20px;
}
.container {
  display: flex;
  flex-grow: 1;
}
.des {
  flex-grow: 1;
}
</style>