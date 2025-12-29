<template>
  <div
    class="task-details-wrapper"
    v-if="selectedProject"
    :key="selectedProject.id"
  >
    <!-- Task Header -->
    <div class="task-header">
      <div class="header-left">
        <div
          class="status-badge"
          :class="
            selectedProject && selectedProject.completed
              ? 'completed'
              : 'in-progress'
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          {{
            selectedProject && selectedProject.completed
              ? "Completed"
              : "In Progress"
          }}
        </div>
        <h2 class="task-title">
          {{
            (selectedProject && selectedProject.title) ||
            "Write an article about design trends"
          }}
        </h2>
        <div class="task-date">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ (selectedProject && selectedProject.date) || "12 Mar, 2018" }}
        </div>
      </div>
    </div>

    <!-- Task Description -->
    <div class="task-body">
      <p class="description-text">
        {{
          (selectedProject && selectedProject.description) ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }}
      </p>

      <!-- Activity Timeline -->
      <div
        class="activity-section"
        v-if="
          selectedProject &&
          selectedProject.activities &&
          selectedProject.activities.length > 0
        "
      >
        <div
          v-for="(activity, index) in selectedProject.activities"
          :key="index"
          class="activity-item"
        >
          <span class="activity-user">{{ activity.user }}</span>
          <span class="activity-text">{{
            getActivityText(activity.type)
          }}</span>
          <span class="activity-date">{{ activity.date }}</span>
        </div>
      </div>

      <!-- Completion Notice -->
      <div
        class="completion-notice"
        v-if="selectedProject && selectedProject.completed"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span
          ><strong>{{ currentUserName }}</strong> completed this task.</span
        >
        <span class="completion-date">{{ selectedProject.date }}</span>
      </div>
    </div>

    <!-- Comments Section -->
    <div
      class="comments-section"
      v-if="
        selectedProject &&
        selectedProject.comments &&
        selectedProject.comments.length > 0
      "
    >
      <div class="comments-header" @click="toggleComments">
        <div class="comments-title-wrapper">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="chevron"
            :class="{ collapsed: !showComments }"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <h4 class="comments-title">
            Comments ({{ selectedProject.comments.length }})
          </h4>
        </div>
      </div>
      <transition name="expand">
        <div class="comments-list" v-if="showComments">
          <div
            v-for="(commentItem, index) in selectedProject.comments"
            :key="index"
            class="comment-item"
          >
            <div class="comment-header">
              <span class="comment-user">{{ commentItem.user }}</span>
              <span class="comment-date">{{ commentItem.date }}</span>
            </div>
            <p class="comment-text">{{ commentItem.comment }}</p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Comment Input -->
    <div class="comment-input-section">
      <input
        type="text"
        v-model="comment"
        placeholder="Write a comment..."
        class="comment-input"
        @keyup.enter="addComment"
      />
      <button class="attach-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
          ></path>
        </svg>
      </button>
      <button class="send-btn" @click="addComment">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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
      comment: "",
      store: useMainStore(),
      showComments: false,
    };
  },
  computed: {
    selectedProject() {
      return this.store.selectedProject;
    },
    assignedUserName() {
      if (this.selectedProject && this.selectedProject.assignedTo) {
        const user = this.store.getTeamMemberById(
          this.selectedProject.assignedTo
        );
        return user ? user.name : "User";
      }
      return "User";
    },
    currentUserName() {
      return this.store.getCurrentUser?.name || "User";
    },
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    getActivityText(type) {
      const texts = {
        assigned: `assigned to ${this.assignedUserName}.`,
        added: `added to ${this.getCategoryName()}.`,
        created: "created task.",
      };
      return texts[type] || type;
    },
    getCategoryName() {
      if (this.selectedProject && this.selectedProject.cat) {
        const category = this.store.getCategories.find(
          (cat) => cat.id === this.selectedProject.cat
        );
        return category ? category.name : this.selectedProject.cat;
      }
      return "";
    },
    addComment() {
      if (this.comment.trim() && this.selectedProject) {
        this.store.setComment({
          id: this.selectedProject.id,
          comment: this.comment,
          user: this.store.getCurrentUser.name,
          date: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        });
        this.comment = "";
      }
    },
  },
};
</script>

<style scoped>
.task-details-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}

/* Task Header */
.task-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.completed svg {
  color: #10b981;
}

.status-badge.in-progress {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.in-progress svg {
  color: #3b82f6;
}

.task-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.task-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a3aec1;
}

.task-date svg {
  color: #a3aec1;
}

/* Task Body */
.task-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.description-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 2rem 0;
}

/* Activity Section */
.activity-section {
  margin-bottom: 2rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.activity-user {
  font-weight: 600;
  color: #2c3e50;
}

.activity-text {
  color: #6b7280;
}

.activity-date {
  margin-left: auto;
  color: #a3aec1;
}

/* Completion Notice */
.completion-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #eff6ff;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #1e40af;
}

.completion-notice svg {
  color: #3b82f6;
  flex-shrink: 0;
}

.completion-date {
  margin-left: auto;
  color: #60a5fa;
}

/* Comment Input */
.comment-input-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e4e7eb;
  background: #ffffff;
}

.comment-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: #2c3e50;
  outline: none;
  transition: all 0.2s;
}

.comment-input:focus {
  border-color: #5f6cff;
  box-shadow: 0 0 0 3px rgba(95, 108, 255, 0.1);
}

.comment-input::placeholder {
  color: #a3aec1;
}

.attach-btn,
.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 0.5rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.attach-btn {
  background: #f5f7fa;
  color: #a3aec1;
}

.attach-btn:hover {
  background: #e4e7eb;
  color: #2c3e50;
}

.send-btn {
  background: #5f6cff;
  color: #ffffff;
}

.send-btn:hover {
  background: #4c5aee;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 108, 255, 0.3);
}

/* Comments Section */
.comments-section {
  border-top: 1px solid #e4e7eb;
  background: #fafbfc;
}

.comments-header {
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.comments-header:hover {
  background: #f5f7fa;
}

.comments-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chevron {
  color: #a3aec1;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron.collapsed {
  transform: rotate(-90deg);
}

.comments-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #a3aec1;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.comments-list {
  padding: 0 2rem 0.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comment-item {
  background: #ffffff;
  padding: 0.5rem 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid #e4e7eb;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.comment-user {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #2c3e50;
}

.comment-date {
  font-size: 0.625rem;
  color: #a3aec1;
}

.comment-text {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.3;
  margin: 0;
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* Scrollbar */
.task-body::-webkit-scrollbar {
  width: 6px;
}

.task-body::-webkit-scrollbar-track {
  background: transparent;
}

.task-body::-webkit-scrollbar-thumb {
  background: #e4e7eb;
  border-radius: 3px;
}

.task-body::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}
</style>
