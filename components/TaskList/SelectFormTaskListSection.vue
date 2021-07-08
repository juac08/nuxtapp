<template>
  <div class="list-container">
    <section class="item-2">
      <div class="list">
        <TaskList />
      </div>
    </section>
  </div>
</template>

<script>
import SelectForm from "~/components/TaskList/SelectForm.vue";
import TaskList from "~/components/TaskList/TaskList.vue";
export default {
  components: {
    SelectForm,
    TaskList,
  },
};
</script>

<style scoped>
.item-2 {
  max-width: 37rem;
  min-height: 23.7rem;
}
</style>