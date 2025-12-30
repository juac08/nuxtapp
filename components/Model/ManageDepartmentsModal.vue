<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="modal-title">Manage Departments</h3>
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

      <div class="modal-body">
        <!-- Add New Department Form -->
        <form @submit.prevent="addDepartment" class="add-department-form">
          <h4 class="section-title">Add New Department</h4>
          <div class="form-row">
            <div class="form-group">
              <label for="deptId">Department ID *</label>
              <input
                id="deptId"
                type="text"
                v-model="newDepartment.id"
                placeholder="e.g., sales"
                required
                pattern="[a-z-]+"
                title="Only lowercase letters and hyphens"
              />
              <small class="hint">Lowercase letters and hyphens only</small>
            </div>
            <div class="form-group">
              <label for="deptName">Department Name *</label>
              <input
                id="deptName"
                type="text"
                v-model="newDepartment.name"
                placeholder="e.g., Sales"
                required
              />
            </div>
            <div class="form-group">
              <label for="deptColor">Color</label>
              <input
                id="deptColor"
                type="color"
                v-model="newDepartment.color"
                class="color-input"
              />
            </div>
          </div>
          <button type="submit" class="btn-add">
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
            Add Department
          </button>
        </form>

        <!-- Departments List -->
        <div class="departments-list">
          <h4 class="section-title">Departments ({{ departments.length }})</h4>
          <div class="department-items">
            <div
              v-for="dept in departments"
              :key="dept.id"
              class="department-item"
            >
              <div class="department-info">
                <div
                  class="department-color"
                  :style="{ background: dept.color || '#0ea5e9' }"
                ></div>
                <div class="department-details">
                  <span class="department-name">{{ dept.name }}</span>
                  <span class="department-id">{{ dept.id }}</span>
                </div>
                <span class="task-count"
                  >{{ getDepartmentTaskCount(dept.id) }} tasks</span
                >
              </div>
              <button
                class="btn-delete"
                @click="deleteDepartment(dept.id)"
                title="Delete department"
                :disabled="getDepartmentTaskCount(dept.id) > 0"
              >
                <svg
                  width="16"
                  height="16"
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
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-cancel" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </div>
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
      newDepartment: {
        id: "",
        name: "",
        color: "#0ea5e9",
      },
    };
  },
  computed: {
    departments() {
      return this.store.getCategories;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.newDepartment = {
        id: "",
        name: "",
        color: "#0ea5e9",
      };
    },
    addDepartment() {
      if (!this.newDepartment.id || !this.newDepartment.name) {
        return;
      }

      // Check if ID already exists
      const exists = this.departments.some(
        (d) => d.id === this.newDepartment.id
      );
      if (exists) {
        alert("Department ID already exists. Please use a different ID.");
        return;
      }

      this.store.addDepartment({
        id: this.newDepartment.id,
        name: this.newDepartment.name,
        color: this.newDepartment.color,
      });

      this.resetForm();
    },
    deleteDepartment(deptId) {
      const taskCount = this.getDepartmentTaskCount(deptId);
      if (taskCount > 0) {
        alert(
          `Cannot delete department with ${taskCount} tasks. Please reassign or delete the tasks first.`
        );
        return;
      }

      if (
        confirm(
          "Are you sure you want to delete this department? This action cannot be undone."
        )
      ) {
        this.store.deleteDepartment(deptId);
      }
    },
    getDepartmentTaskCount(deptId) {
      return this.store.projectList.filter((task) => task.cat === deptId)
        .length;
    },
  },
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10000 !important;
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

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

/* Add Department Form */
.add-department-form {
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"] {
  padding: 0.625rem 0.875rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #2c3e50;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input[type="text"]:focus {
  outline: none;
  border-color: #0ea5e9;
  background: #fff;
}

.color-input {
  width: 60px;
  height: 38px;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.color-input:hover {
  border-color: #0ea5e9;
}

.hint {
  font-size: 0.75rem;
  color: #a3aec1;
  margin-top: 0.25rem;
}

.btn-add {
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
  background: #0ea5e9;
  color: #ffffff;
}

.btn-add:hover {
  background: #0284c7;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

/* Departments List */
.department-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.department-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.department-item:hover {
  border-color: #cbd5e0;
  background: #fafbfc;
}

.department-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.department-color {
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  flex-shrink: 0;
}

.department-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.department-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
}

.department-id {
  font-size: 0.75rem;
  color: #a3aec1;
  font-family: monospace;
}

.task-count {
  font-size: 0.75rem;
  color: #a3aec1;
  padding: 0.25rem 0.5rem;
  background: #f5f7fa;
  border-radius: 0.25rem;
}

.btn-delete {
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

.btn-delete:hover:not(:disabled) {
  background: #fef2f2;
  color: #ef4444;
}

.btn-delete:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid #e4e7eb;
}

.btn-cancel {
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e4e7eb;
  background: transparent;
  color: #64748b;
}

.btn-cancel:hover {
  background: #f5f7fa;
  color: #2c3e50;
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
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
