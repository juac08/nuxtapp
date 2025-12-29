<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Add New Task</h3>
          <button class="close-btn" @click="closeModal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form class="modal-body" @submit.prevent="addTask">
          <div class="form-row">
            <div class="form-group">
              <label for="title">Task Title *</label>
              <input
                id="title"
                type="text"
                v-model="form.title"
                placeholder="Enter task title"
                required
              />
            </div>
          </div>

          <div class="form-group standalone">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Describe the task..."
              rows="3"
            ></textarea>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="category">Department *</label>
              <select id="category" v-model="form.category" required>
                <option value="">Select department</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="assignedTo">Assign To</label>
              <select id="assignedTo" v-model="form.assignedTo">
                <option value="">Select team member</option>
                <option
                  v-for="member in filteredTeamMembers"
                  :key="member.id"
                  :value="member.id"
                >
                  {{ member.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" v-model="form.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div class="form-group">
              <label for="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                v-model="form.dueDate"
                :min="today"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { useMainStore } from "~/stores/main";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  data() {
    return {
      store: useMainStore(),
      form: {
        title: "",
        description: "",
        category: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      },
    };
  },
  computed: {
    categories() {
      return this.store.getCategories;
    },
    teamMembers() {
      return this.store.getTeamMembers;
    },
    filteredTeamMembers() {
      if (!this.form.category) {
        return this.teamMembers;
      }
      return this.teamMembers.filter((member) =>
        member.departments.includes(this.form.category)
      );
    },
    today() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        title: "",
        description: "",
        category: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      };
    },
    addTask() {
      if (!this.form.title || !this.form.category) {
        return;
      }

      const newTask = {
        id: Date.now(),
        title: this.form.title,
        description: this.form.description || "No description provided",
        cat: this.form.category,
        assignedTo: this.form.assignedTo || 1,
        priority: this.form.priority,
        date: this.form.dueDate || new Date().toISOString().split("T")[0],
        completed: false,
        approved: false,
        tags: [],
        comments: [],
        activities: [
          {
            user: this.store.getCurrentUser.name,
            type: "created",
            date: new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          },
        ],
      };

      this.store.setProject(newTask);
      this.store.setSelected(newTask.id);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: #ffffff;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #a3aec1;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f7fa;
  color: #2c3e50;
}

/* Modal Body */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Form Styles */
.form-row,
.form-row-2 {
  display: grid;
  gap: 1rem;
}

.form-row {
  margin-bottom: 1rem;
}

.form-row-2 {
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.standalone {
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.625rem 0.875rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #2c3e50;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(95, 108, 255, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #a3aec1;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e7eb;
  margin-top: 0.5rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-cancel {
  background: transparent;
  color: #64748b;
  border: 1px solid #e4e7eb;
}

.btn-cancel:hover {
  background: #f5f7fa;
  color: #2c3e50;
}

.btn-submit {
  background: #0ea5e9;
  color: #ffffff;
}

.btn-submit:hover {
  background: #0284c7;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Scrollbar */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #e4e7eb;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}

/* Responsive */
@media (max-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }

  .modal-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
  }
}
</style>
