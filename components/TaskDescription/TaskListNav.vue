<template>
  <div class="task-nav">
    <!-- User Info -->
    <div class="user-info" v-if="assignedUser">
      <div class="user-avatar">
        <img :src="assignedUser.avatar" :alt="assignedUser.name" />
      </div>
      <span class="user-name">{{ assignedUser.name }}</span>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="action-btn" title="Edit Task" @click="editTask">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
      </button>
      <button class="action-btn danger" title="Delete Task" @click="deleteTask">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
      </button>
      <button
        class="action-btn success"
        title="Approve Task"
        @click="approveTask"
        v-if="selectedProject && !selectedProject.approved"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";

export default {
  data() {
    return {
      store: useMainStore(),
    };
  },
  computed: {
    selectedProject() {
      return this.store?.selectedProject || null;
    },
    assignedUser() {
      if (this.selectedProject && this.selectedProject.assignedTo) {
        return this.store.getTeamMemberById(this.selectedProject.assignedTo);
      }
      return null;
    },
  },
  methods: {
    editTask() {
      if (this.selectedProject) {
        this.$emit("edit-task", this.selectedProject);
      }
    },
    deleteTask() {
      if (this.selectedProject) {
        this.store.remove(this.selectedProject.id);
      }
    },
    approveTask() {
      if (this.selectedProject) {
        this.store.setApprove(this.selectedProject.id);
      }
    },
  },
};
</script>

<style scoped>
.task-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
  background: #ffffff;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid #e4e7eb;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #a3aec1;
}

.action-btn:hover {
  background: #f5f7fa;
  border-color: #5f6cff;
  color: #5f6cff;
}

.action-btn.success {
  background: #10b981;
  border-color: #10b981;
  color: #ffffff;
}

.action-btn.success:hover {
  background: #059669;
}

.action-btn.danger {
  border-color: #e4e7eb;
  color: #a3aec1;
}

.action-btn.danger:hover {
  background: #fef2f2;
  border-color: #ef4444;
  color: #ef4444;
}

.action-btn.primary {
  background: #5f6cff;
  border-color: #5f6cff;
  color: #ffffff;
}

.action-btn.primary:hover {
  background: #4c5aee;
}
</style>
