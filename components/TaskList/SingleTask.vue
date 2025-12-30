<template>
  <div
    class="task-card"
    :class="{ selected: selected, completed: project.completed }"
    @click="select"
  >
    <!-- Checkbox -->
    <div class="task-checkbox" @click.stop="done">
      <div
        class="checkbox-custom"
        :class="{ checked: project.completed, loading: isToggling }"
      >
        <LoadingSpinner v-if="isToggling" size="small" inline />
        <svg
          v-else-if="project.completed"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>

    <!-- Task Content -->
    <div class="task-content">
      <p class="task-title">{{ project.title }}</p>
      <div class="task-meta">
        <span class="meta-date">{{ project.date }}</span>
        <span
          v-if="project.comments && project.comments.length > 0"
          class="meta-divider"
          >•</span
        >
        <span
          v-if="project.comments && project.comments.length > 0"
          class="meta-count"
          >{{ project.comments.length }} comment{{
            project.comments.length !== 1 ? "s" : ""
          }}</span
        >
      </div>
    </div>

    <!-- Avatar -->
    <div class="task-avatar" v-if="assignedUser">
      <img
        :src="assignedUser.avatar"
        :alt="assignedUser.name"
        :title="assignedUser.name"
      />
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";
import LoadingSpinner from "~/components/UI/LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
  props: ["project"],
  data() {
    return {
      store: useMainStore(),
      isToggling: false,
    };
  },
  computed: {
    selected() {
      return this.store?.selected === this.project.id;
    },
    assignedUser() {
      if (this.project.assignedTo) {
        return this.store.getTeamMemberById(this.project.assignedTo);
      }
      return null;
    },
  },
  methods: {
    done() {
      if (this.store && this.project && !this.isToggling) {
        this.isToggling = true;

        setTimeout(() => {
          this.store.toggleTaskCompletion(this.project.id);
          this.isToggling = false;
        }, 400);
      }
    },
    select() {
      if (this.store) {
        this.store.setSelected(this.project.id);
      }
    },
  },
};
</script>

<style scoped>
.task-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  background: #ffffff;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  margin-bottom: 0.375rem;
}

.task-card:hover {
  background: #f5f7fa;
}

.task-card.selected {
  background: rgba(14, 165, 233, 0.08);
  border-left: 3px solid #0ea5e9;
}

.task-card.completed {
  background: #fafbfc;
}

.task-card.completed:hover {
  background: #f5f7fa;
}

.task-card.completed .task-title {
  color: #9ca3af;
}

.task-card.completed .task-meta {
  color: #c7cdd4;
}

.task-card.completed .task-avatar {
  opacity: 0.6;
}

/* Checkbox */
.task-checkbox {
  position: relative;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
  cursor: pointer;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  transition: all 0.2s ease;
}

.checkbox-custom.loading {
  border-color: #0ea5e9;
  pointer-events: none;
}

.checkbox-custom.checked {
  background: #0ea5e9;
  border-color: #0ea5e9;
}

.checkbox-custom svg {
  color: #ffffff;
  display: block;
}

.task-checkbox:hover .checkbox-custom {
  border-color: #0ea5e9;
}

/* Task Content */
.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.875rem;
  color: #2c3e50;
  font-weight: 500;
  margin: 0 0 0.125rem 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.35;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 400;
}

.meta-divider {
  color: #d1d5db;
  font-size: 0.625rem;
}

.meta-count {
  font-weight: 400;
  color: #9ca3af;
}

/* Avatar */
.task-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-top: 1px;
}

.task-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
