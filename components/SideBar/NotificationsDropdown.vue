<template>
  <div v-if="isOpen" class="notifications-dropdown" :style="dropdownStyle">
    <div class="dropdown-header">
      <h4>Notifications</h4>
      <button
        class="clear-btn"
        @click="clearAll"
        v-if="notifications.length > 0"
      >
        Clear All
      </button>
    </div>

    <div class="dropdown-body">
      <div v-if="notifications.length === 0" class="empty-state">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <p>No notifications</p>
      </div>

      <div v-else class="notifications-list">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markAsRead(notification.id)"
        >
          <div class="notification-icon" :class="notification.type">
            <svg
              v-if="notification.type === 'task'"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="9 11 12 14 22 4"></polyline>
              <path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
              ></path>
            </svg>
            <svg
              v-else-if="notification.type === 'team'"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="notification-content">
            <p class="notification-text">{{ notification.text }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
          <div v-if="!notification.read" class="unread-badge"></div>
        </div>
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
    buttonRef: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      store: useMainStore(),
      dropdownStyle: {},
    };
  },
  computed: {
    notifications() {
      return this.store.getNotificationsList;
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.buttonRef) {
        this.$nextTick(() => {
          this.calculatePosition();
        });
      }
    },
  },
  methods: {
    calculatePosition() {
      if (!this.buttonRef) return;

      const rect = this.buttonRef.getBoundingClientRect();
      this.dropdownStyle = {
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
      };
    },
    markAsRead(notificationId) {
      this.store.markNotificationAsRead(notificationId);
    },
    clearAll() {
      this.store.clearAllNotifications();
    },
  },
};
</script>

<style scoped>
.notifications-dropdown {
  position: fixed;
  width: 340px;
  max-height: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  animation: slideDown 0.2s ease;
  /* Will be positioned via inline styles from parent component */
}

@media (max-width: 768px) {
  .notifications-dropdown {
    width: 280px;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e4e7eb;
}

.dropdown-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.clear-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.dropdown-body {
  overflow-y: auto;
  flex: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  color: #a3aec1;
}

.empty-state svg {
  margin-bottom: 0.75rem;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

.notifications-list {
  display: flex;
  flex-direction: column;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e4e7eb;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f8fafc;
}

.notification-item.unread {
  background: #f0f4ff;
}

.notification-item.unread:hover {
  background: #e5edff;
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-icon.task {
  background: #e0f2fe;
  color: #0284c7;
}

.notification-icon.team {
  background: #fef3c7;
  color: #d97706;
}

.notification-icon.info {
  background: #e0e7ff;
  color: #6366f1;
}

.notification-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
}

.notification-text {
  font-size: 0.8125rem;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
}

.notification-time {
  font-size: 0.6875rem;
  color: #a3aec1;
  line-height: 1;
  text-align: left;
  align-self: flex-start;
}

.unread-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0ea5e9;
  flex-shrink: 0;
}

/* Scrollbar */
.dropdown-body::-webkit-scrollbar {
  width: 4px;
}

.dropdown-body::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-body::-webkit-scrollbar-thumb {
  background: #e4e7eb;
  border-radius: 2px;
}

.dropdown-body::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}
</style>
