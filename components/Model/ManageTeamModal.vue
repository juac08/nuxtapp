<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Manage Team Members</h3>
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
          <!-- Add New Member Form -->
          <form @submit.prevent="addMember" class="add-member-form">
            <h4 class="section-title">Add New Member</h4>
            <div class="form-row-2">
              <div class="form-group">
                <label for="memberName">Name *</label>
                <input
                  id="memberName"
                  type="text"
                  v-model="newMember.name"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="memberDepartments">Departments *</label>
                <select
                  id="memberDepartments"
                  v-model="newMember.departments"
                  multiple
                  required
                  class="multi-select"
                >
                  <option
                    v-for="dept in departments"
                    :key="dept.id"
                    :value="dept.id"
                  >
                    {{ dept.name }}
                  </option>
                </select>
                <small class="hint">Hold Ctrl/Cmd to select multiple</small>
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
              Add Member
            </button>
          </form>

          <!-- Team Members List -->
          <div class="members-list">
            <h4 class="section-title">
              Team Members ({{ teamMembers.length }})
            </h4>
            <div class="member-items">
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="member-item"
              >
                <div class="member-info">
                  <img
                    :src="member.avatar"
                    :alt="member.name"
                    class="member-avatar"
                  />
                  <div class="member-details">
                    <span class="member-name">{{ member.name }}</span>
                    <span class="member-departments">
                      {{ getDepartmentNames(member.departments).join(", ") }}
                    </span>
                  </div>
                </div>
                <button
                  class="btn-delete"
                  @click="deleteMember(member.id)"
                  title="Delete member"
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
      newMember: {
        name: "",
        departments: [],
      },
    };
  },
  computed: {
    teamMembers() {
      return this.store.getTeamMembers;
    },
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
      this.newMember = {
        name: "",
        departments: [],
      };
    },
    addMember() {
      if (!this.newMember.name || this.newMember.departments.length === 0) {
        return;
      }

      // Get the next sequential avatar number
      const nextAvatarNumber = this.teamMembers.length + 1;
      const avatar = `https://i.pravatar.cc/150?img=${nextAvatarNumber}`;

      this.store.addTeamMember({
        name: this.newMember.name,
        avatar: avatar,
        departments: this.newMember.departments,
      });

      this.resetForm();
    },
    deleteMember(memberId) {
      const member = this.teamMembers.find((m) => m.id === memberId);
      if (
        member &&
        confirm(`Are you sure you want to remove ${member.name} from the team?`)
      ) {
        this.store.deleteTeamMember(memberId);
      }
    },
    getDepartmentNames(deptIds) {
      return deptIds.map((id) => {
        const dept = this.departments.find((d) => d.id === id);
        return dept ? dept.name : id;
      });
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
  max-width: 700px;
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

/* Add Member Form */
.add-member-form {
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.form-group input,
.form-group select {
  padding: 0.625rem 0.875rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #2c3e50;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(95, 108, 255, 0.1);
}

.multi-select {
  min-height: 80px;
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

/* Members List */
.member-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.member-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.member-item:hover {
  border-color: #cbd5e0;
  background: #fafbfc;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.member-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.member-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
}

.member-departments {
  font-size: 0.75rem;
  color: #a3aec1;
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

.btn-delete:hover {
  background: #fef2f2;
  color: #ef4444;
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
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}
</style>
