<template>
  <div class="sidebar">
    <!-- Profile Card -->
    <div class="profile-card">
      <div class="profile-avatar">
        <img
          :src="currentUser.avatar"
          :alt="currentUser.name"
          class="avatar-img"
        />
      </div>
      <h3 class="profile-name">{{ currentUser.name }}</h3>
      <p class="profile-email">{{ currentUser.email }}</p>

      <!-- Action Icons -->
      <div class="action-icons">
        <button class="icon-btn" @click="openSettingsModal" title="Settings">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            ></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <button class="icon-btn" @click="openMessagesModal" title="Messages">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span class="badge">{{ notifications.messages }}</span>
        </button>
        <div style="position: relative">
          <button
            class="icon-btn"
            @click="toggleNotificationsDropdown"
            title="Notifications"
            ref="notificationsBtn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="badge">{{ notifications.alerts }}</span>
          </button>
          <NotificationsDropdown
            :isOpen="showNotificationsDropdown"
            :buttonRef="$refs.notificationsBtn"
          />
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stats-header">
        <span class="progress-indicator"
          >{{ stats.completed }}/{{ stats.completed + stats.todo }}</span
        >
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: statsProgress + '%' }"
        ></div>
      </div>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ stats.completed }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.todo }}</div>
          <div class="stat-label">To do</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.allCompleted }}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
    </div>

    <!-- Departments Section -->
    <div class="section">
      <div class="section-header">
        <h4 class="section-title">DEPARTMENTS ({{ categories.length }})</h4>
        <div class="section-actions">
          <button
            v-if="hasMoreProjects"
            type="button"
            class="icon-action-btn"
            @click="showAllProjects = !showAllProjects"
            :title="showAllProjects ? 'Show Less' : 'Show More'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :style="{
                transform: showAllProjects ? 'rotate(180deg)' : 'rotate(0)',
              }"
              style="transition: transform 0.2s"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="icon-action-btn"
            @click="openDepartmentsModal"
            title="Add Department"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="project-list">
        <div
          v-for="category in displayedCategories"
          :key="category.id"
          class="project-item"
          :class="{ active: selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <span
            class="project-dot"
            :style="{ backgroundColor: category.color }"
          ></span>
          <span class="project-name">{{ category.name }}</span>
          <span class="task-count">{{
            getCategoryTaskCount(category.id)
          }}</span>
        </div>
        <div
          class="project-item"
          :class="{ active: selectedCategory === null }"
          @click="selectCategory(null)"
        >
          <span class="project-dot all"></span>
          <span class="project-name">All Projects</span>
          <span class="task-count">{{ totalTaskCount }}</span>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="section">
      <div class="section-header">
        <h4 class="section-title">TEAM ({{ teamMembers.length }})</h4>
        <div class="section-actions">
          <button
            type="button"
            class="icon-action-btn"
            @click="openTeamModal"
            title="Add Team Member"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="team-avatars">
        <div
          v-for="member in displayedTeamMembers"
          :key="member.id"
          class="team-avatar"
          :title="member.name"
        >
          <img :src="member.avatar" :alt="member.name" />
        </div>
        <div
          v-if="remainingTeamCount > 0"
          class="team-avatar more-members"
          :title="`${remainingTeamCount} more members`"
        >
          <span>+{{ remainingTeamCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";
import NotificationsDropdown from "./NotificationsDropdown.vue";

export default {
  components: {
    NotificationsDropdown,
  },
  emits: [
    "open-team-modal",
    "open-departments-modal",
    "open-settings-modal",
    "open-messages-modal",
  ],
  data() {
    return {
      store: useMainStore(),
      selectedCategory: null,
      showAllProjects: false,
      showNotificationsDropdown: false,
    };
  },
  computed: {
    currentUser() {
      return this.store.getCurrentUser;
    },
    notifications() {
      return this.store.getNotifications;
    },
    stats() {
      return this.store.getStats;
    },
    statsProgress() {
      return this.store.getStatsProgress;
    },
    categories() {
      return this.store.getCategories;
    },
    displayedCategories() {
      return this.showAllProjects
        ? this.categories
        : this.categories.slice(0, 4);
    },
    hasMoreProjects() {
      return this.categories.length > 4;
    },
    teamMembers() {
      return this.store.getFilteredTeamMembers;
    },
    displayedTeamMembers() {
      return this.teamMembers.slice(0, 4);
    },
    remainingTeamCount() {
      return Math.max(0, this.teamMembers.length - 4);
    },
    totalTaskCount() {
      return this.store.projectList.length;
    },
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.store.setSelectedCategory(categoryId);
    },
    getCategoryTaskCount(categoryId) {
      return this.store.projectList.filter((task) => task.cat === categoryId)
        .length;
    },
    openTeamModal() {
      this.$emit("open-team-modal");
    },
    closeTeamModal() {
      // Not needed anymore
    },
    openDepartmentsModal() {
      this.$emit("open-departments-modal");
    },
    closeDepartmentsModal() {
      // Not needed anymore
    },
    openSettingsModal() {
      this.$emit("open-settings-modal");
    },
    openMessagesModal() {
      this.$emit("open-messages-modal");
    },
    toggleNotificationsDropdown() {
      this.showNotificationsDropdown = !this.showNotificationsDropdown;
    },
    handleClickOutside(event) {
      if (
        this.showNotificationsDropdown &&
        this.$refs.notificationsBtn &&
        !this.$refs.notificationsBtn.contains(event.target) &&
        !event.target.closest(".notifications-dropdown")
      ) {
        this.showNotificationsDropdown = false;
      }
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem 1.25rem;
  gap: 1.5rem;
  overflow-y: auto;
}

/* Profile Card */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e4e7eb;
  position: relative;
  overflow: visible;
}

.profile-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.75rem;
  border: 3px solid #f5f7fa;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
}

.profile-email {
  font-size: 0.8125rem;
  color: #a3aec1;
  margin: 0 0 0.75rem 0;
}

.action-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  border: 1px solid #e4e7eb;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  color: #a3aec1;
}

.icon-btn:hover {
  background: #f5f7fa;
  border-color: #0ea5e9;
  color: #0ea5e9;
}

.icon-btn .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #0ea5e9;
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stats Section */
.stats-section {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e4e7eb;
}

.stats-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.625rem;
}

.progress-indicator {
  font-size: 0.8125rem;
  color: #a3aec1;
  font-weight: 500;
}

.progress-bar {
  height: 8px;
  background: #f5f7fa;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9 0%, #7c88ff 100%);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.375rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.6875rem;
  color: #a3aec1;
  line-height: 1.3;
  font-weight: 500;
}

/* Section */
.section {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e4e7eb;
}

.section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.875rem;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.icon-action-btn {
  width: 24px;
  height: 24px;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #a3aec1;
  padding: 0;
}

.icon-action-btn:hover {
  background: #f5f7fa;
  color: #0ea5e9;
}

.section-title {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #a3aec1;
  letter-spacing: 0.1em;
  margin: 0;
}

.settings-btn {
  width: 24px;
  height: 24px;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #a3aec1;
  padding: 0;
}

.settings-btn:hover {
  background: #f5f7fa;
  color: #0ea5e9;
}

/* Projects */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.625rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-left: 3px solid transparent;
}

.project-item:hover {
  background: #f5f7fa;
}

.project-item.active {
  background: rgba(95, 108, 255, 0.08);
  border-left: 3px solid #0ea5e9;
}

.project-item.active .project-name {
  color: #0ea5e9;
  font-weight: 600;
}

.project-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-dot.all {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
}

.project-name {
  font-size: 0.875rem;
  color: #2c3e50;
  font-weight: 500;
  flex: 1;
}

.task-count {
  font-size: 0.75rem;
  color: #a3aec1;
  font-weight: 500;
  background: #f5f7fa;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  margin-left: auto;
}

.project-item.active .task-count {
  background: rgba(95, 108, 255, 0.1);
  color: #0ea5e9;
}

/* Team */
.team-avatars {
  display: flex;
  align-items: center;
}

.team-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  margin-left: -12px;
}

.team-avatar:first-child {
  margin-left: 0;
}

.team-avatar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-avatar.more-members {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
}

.team-avatar.more-members span {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
