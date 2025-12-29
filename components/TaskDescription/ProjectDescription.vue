<template>
  <div class="task-details-wrapper">
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
      <div class="activity-section">
        <div class="activity-item">
          <span class="activity-user">Olka Nowak</span>
          <span class="activity-text">assigned to Natalie Smith.</span>
          <span class="activity-date">19 Feb, 2018</span>
        </div>
        <div class="activity-item">
          <span class="activity-user">Olka Nowak</span>
          <span class="activity-text">added to Marketing.</span>
          <span class="activity-date">18 Feb, 2018</span>
        </div>
        <div class="activity-item">
          <span class="activity-user">Olka Nowak</span>
          <span class="activity-text">created task.</span>
          <span class="activity-date">18 Feb, 2018</span>
        </div>
      </div>

      <!-- Completion Notice -->
      <div class="completion-notice">
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
        <span><strong>Natalie</strong> completed this task.</span>
        <span class="completion-date">26 Feb, 2018</span>
      </div>

      <!-- Attachment -->
      <div class="attachment-item">
        <div class="attachment-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="attachment-info">
          <div class="attachment-name">Article.docx</div>
          <div class="attachment-meta">added 26 Feb, 2018</div>
        </div>
        <div class="attachment-actions">
          <button class="icon-btn">
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
          <button class="icon-btn">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
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
    };
  },
  computed: {
    selectedProject() {
      return this.store?.selectedProject || null;
    },
  },
  methods: {
    addComment() {
      if (this.comment.trim() && this.selectedProject) {
        this.store.setComment({
          id: this.selectedProject.id,
          comment: this.comment,
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

/* Attachment */
.attachment-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e4e7eb;
}

.attachment-icon {
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6cff;
  flex-shrink: 0;
}

.attachment-info {
  flex: 1;
}

.attachment-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.125rem;
}

.attachment-meta {
  font-size: 0.8125rem;
  color: #a3aec1;
}

.attachment-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 0.375rem;
  border: 1px solid #e4e7eb;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #a3aec1;
}

.icon-btn:hover {
  background: #f5f7fa;
  border-color: #5f6cff;
  color: #5f6cff;
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
