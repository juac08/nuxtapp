<template>
  <div>
    <section class="item-3">
      <div>
        <TaskListNav />
        <Description />
      </div>
    </section>
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

<style  scoped>
.item-3 {
  flex-grow: 1;
}
</style>