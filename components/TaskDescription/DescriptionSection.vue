<template>
  <div class="task-details-section">
    <TaskListNav @edit-task="openEditModal" />
    <Description />
    <EditTaskModal
      :isOpen="showEditModal"
      :task="taskToEdit"
      @close="closeEditModal"
    />
  </div>
</template>

<script>
import TaskListNav from "~/components/TaskDescription/TaskListNav.vue";
import Description from "~/components/TaskDescription/ProjectDescription.vue";
import EditTaskModal from "~/components/Model/EditTaskModal.vue";

export default {
  components: {
    TaskListNav,
    Description,
    EditTaskModal,
  },
  data() {
    return {
      showEditModal: false,
      taskToEdit: null,
    };
  },
  methods: {
    openEditModal(task) {
      this.taskToEdit = task;
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.taskToEdit = null;
    },
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
