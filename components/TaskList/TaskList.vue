<template>
  <div class="task-list-container">
    <!-- Grouped Tasks -->
    <div class="task-groups">
      <div
        v-for="(tasks, category) in groupedTasks"
        :key="category"
        class="task-group"
      >
        <div class="group-header" @click="toggleGroup(category)">
          <div class="group-title-wrapper">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="chevron"
              :class="{ collapsed: !expandedGroups[category] }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <h3 class="group-title">{{ String(category).toUpperCase() }}</h3>
          </div>
        </div>

        <transition name="expand">
          <div v-if="expandedGroups[category]" class="task-items">
            <SingleTask
              v-for="(project, i) in tasks"
              :key="i"
              :project="project"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- Add Task Button -->
    <div class="add-task-section">
      <button class="add-task-btn" @click="addtask">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add task
      </button>
    </div>
  </div>
</template>

<script>
import SingleTask from "~/components/TaskList/SingleTask.vue";
import { useMainStore } from "~/stores/main";

export default {
  components: {
    SingleTask,
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
  data() {
    return {
      store: useMainStore(),
      expandedGroups: {
        marketing: true,
        design: true,
        development: true,
        management: true,
      },
    };
  },
  computed: {
    filteredTasks() {
      if (!this.store) return [];

      let tasks = this.store.pList || [];

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        tasks = tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            (task.description && task.description.toLowerCase().includes(query))
        );
      }

      // Apply status filter
      if (this.filterStatus === "completed") {
        tasks = tasks.filter((task) => task.completed);
      } else if (this.filterStatus === "active") {
        tasks = tasks.filter((task) => !task.completed);
      }

      return tasks;
    },
    groupedTasks() {
      const grouped = {};

      this.filteredTasks.forEach((task) => {
        const category = task.cat || "uncategorized";
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(task);
      });

      return grouped;
    },
  },
  mounted() {
    // Automatically select the first task on render
    this.$nextTick(() => {
      const projectList = this.store.pList;
      if (projectList && projectList.length > 0 && !this.store.selected) {
        this.store.setSelected(projectList[0].id);
      }
    });
  },
  methods: {
    toggleGroup(category) {
      this.expandedGroups[category] = !this.expandedGroups[category];
    },
    addtask() {
      return this.$router.push("/addnewtask");
    },
  },
};
</script>

<style scoped>
.task-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Task Groups */
.task-groups {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.task-group {
  margin-bottom: 1.5rem;
}

.task-group:last-child {
  margin-bottom: 0;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.5rem;
}

.group-header:hover {
  background: rgba(95, 108, 255, 0.05);
}

.group-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chevron {
  color: #a3aec1;
  transition: transform 0.2s;
}

.chevron.collapsed {
  transform: rotate(-90deg);
}

.group-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 0.05em;
  margin: 0;
}

.task-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

/* Add Task Section */
.add-task-section {
  padding: 1.5rem;
  border-top: 1px solid #e4e7eb;
  background: #f5f7fa;
}

.add-task-btn {
  width: 100%;
  padding: 0.75rem;
  background: #5f6cff;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.add-task-btn:hover {
  background: #4c5aee;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 108, 255, 0.3);
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}

/* Scrollbar */
.task-groups::-webkit-scrollbar {
  width: 6px;
}

.task-groups::-webkit-scrollbar-track {
  background: transparent;
}

.task-groups::-webkit-scrollbar-thumb {
  background: #e4e7eb;
  border-radius: 3px;
}

.task-groups::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}
</style>
