<template>
  <div
    class="task-card"
    :class="{ selected: selected, completed: project.completed }"
    @click="select"
  >
    <!-- Checkbox -->
    <div class="task-checkbox" @click.stop="done">
      <input
        type="checkbox"
        :checked="project.completed"
        @change="done"
        class="checkbox-input"
      />
      <div class="checkbox-custom">
        <svg
          v-if="project.completed"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
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
        <span v-if="project.user" class="meta-divider">•</span>
        <span v-if="project.user" class="meta-count">7/12</span>
      </div>
    </div>

    <!-- Avatar -->
    <div class="task-avatar">
      <img
        :src="`https://i.pravatar.cc/150?img=${project.id}`"
        alt="User avatar"
      />
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";

export default {
  props: ["project"],
  data() {
    return {
      store: useMainStore(),
    };
  },
  computed: {
    selected() {
      return this.store?.selected === this.project.id;
    },
  },
  methods: {
    done() {
      if (this.store) {
        this.store.setSelectFilter(this.project.id);
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
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: #ffffff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.task-card:hover {
  background: #f8f9fa;
  transform: translateX(2px);
}

.task-card.selected {
  border-color: #5f6cff;
  background: rgba(95, 108, 255, 0.03);
}

.task-card.completed {
  opacity: 0.6;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #a3aec1;
}

/* Checkbox */
.task-checkbox {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #e4e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  transition: all 0.2s ease;
}

.checkbox-input:checked ~ .checkbox-custom {
  background: #5f6cff;
  border-color: #5f6cff;
}

.checkbox-custom svg {
  color: #ffffff;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.checkbox-input:checked ~ .checkbox-custom svg {
  opacity: 1;
  transform: scale(1);
}

.task-checkbox:hover .checkbox-custom {
  border-color: #5f6cff;
}

/* Task Content */
.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.9375rem;
  color: #2c3e50;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #a3aec1;
}

.meta-divider {
  color: #e4e7eb;
}

.meta-count {
  font-weight: 500;
}

/* Avatar */
.task-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #f5f7fa;
}

.task-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
