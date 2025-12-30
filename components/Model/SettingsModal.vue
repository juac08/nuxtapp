<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content settings-modal">
      <div class="modal-header">
        <h3>Settings</h3>
        <button class="close-btn" @click="close">
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
        <!-- Profile Settings -->
        <div class="settings-section">
          <h4 class="section-title">Profile</h4>
          <div class="setting-item">
            <label for="userName">Name</label>
            <input
              id="userName"
              type="text"
              v-model="settings.name"
              class="setting-input"
            />
          </div>
          <div class="setting-item">
            <label for="userEmail">Email</label>
            <input
              id="userEmail"
              type="email"
              v-model="settings.email"
              class="setting-input"
            />
          </div>
        </div>

        <!-- Display Settings -->
        <div class="settings-section">
          <h4 class="section-title">Display</h4>
          <div class="setting-item toggle-item">
            <div class="setting-info">
              <label>Show Completed Tasks</label>
              <span class="setting-description"
                >Display completed tasks in the task list</span
              >
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                v-model="settings.showCompleted"
                @change="updateShowCompleted"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item toggle-item">
            <div class="setting-info">
              <label>Compact View</label>
              <span class="setting-description"
                >Use a more condensed layout for tasks</span
              >
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.compactView" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="settings-section">
          <h4 class="section-title">Notifications</h4>
          <div class="setting-item toggle-item">
            <div class="setting-info">
              <label>Task Reminders</label>
              <span class="setting-description"
                >Get notified about upcoming tasks</span
              >
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.taskReminders" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item toggle-item">
            <div class="setting-info">
              <label>Team Updates</label>
              <span class="setting-description"
                >Receive notifications about team activity</span
              >
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.teamUpdates" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Task Settings -->
        <div class="settings-section">
          <h4 class="section-title">Tasks</h4>
          <div class="setting-item">
            <label for="defaultPriority">Default Priority</label>
            <select
              id="defaultPriority"
              v-model="settings.defaultPriority"
              class="setting-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="setting-item">
            <label for="sortBy">Sort Tasks By</label>
            <select
              id="sortBy"
              v-model="settings.sortBy"
              class="setting-select"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="saveSettings">
          Save Changes
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
      required: true,
    },
  },
  data() {
    return {
      store: useMainStore(),
      settings: {
        name: "",
        email: "",
        showCompleted: true,
        compactView: false,
        taskReminders: true,
        teamUpdates: true,
        defaultPriority: "medium",
        sortBy: "date",
      },
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.loadSettings();
      }
    },
  },
  mounted() {
    this.loadSettings();
  },
  methods: {
    loadSettings() {
      const currentUser = this.store.getCurrentUser;
      const appSettings = this.store.getSettings;

      this.settings = {
        name: currentUser.name || "",
        email: currentUser.email || "",
        showCompleted: appSettings.showCompleted ?? true,
        compactView: appSettings.compactView ?? false,
        taskReminders: appSettings.taskReminders ?? true,
        teamUpdates: appSettings.teamUpdates ?? true,
        defaultPriority: appSettings.defaultPriority || "medium",
        sortBy: appSettings.sortBy || "date",
      };
    },
    updateShowCompleted() {
      // Immediately update the store when toggling show completed
      this.store.updateSettings({ showCompleted: this.settings.showCompleted });
    },
    saveSettings() {
      // Update user profile
      this.store.updateUserProfile({
        name: this.settings.name,
        email: this.settings.email,
      });

      // Update app settings
      this.store.updateSettings({
        showCompleted: this.settings.showCompleted,
        compactView: this.settings.compactView,
        taskReminders: this.settings.taskReminders,
        teamUpdates: this.settings.teamUpdates,
        defaultPriority: this.settings.defaultPriority,
        sortBy: this.settings.sortBy,
      });

      const toast = this.store.getToast();
      if (toast) {
        toast.success("Settings saved successfully");
      }

      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000 !important;
  padding: 1rem;
}

.settings-modal {
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #2c3e50;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.settings-section .section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.setting-item {
  margin-bottom: 1rem;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.setting-input,
.setting-select {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #2c3e50;
  transition: all 0.2s;
}

.setting-input:focus,
.setting-select:focus {
  outline: none;
  border-color: #0ea5e9;
  background: #fff;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.setting-info {
  flex: 1;
}

.setting-info label {
  margin-bottom: 0.25rem;
}

.setting-description {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  margin: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #0ea5e9;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e4e7eb;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #475569;
}

.btn-primary {
  background: #0ea5e9;
  color: white;
}

.btn-primary:hover {
  background: #0284c7;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
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
</style>
