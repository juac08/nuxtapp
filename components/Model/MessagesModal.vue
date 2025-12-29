<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content messages-modal">
      <div class="modal-header">
        <h3>Messages</h3>
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
        <div v-if="messages.length === 0" class="empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <p>No messages yet</p>
        </div>

        <div v-else class="messages-list">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-item"
            :class="{ unread: !message.read }"
            @click="markAsRead(message.id)"
          >
            <img
              :src="message.avatar"
              :alt="message.sender"
              class="message-avatar"
            />
            <div class="message-content">
              <div class="message-header">
                <span class="message-sender">{{ message.sender }}</span>
                <span class="message-time">{{ message.time }}</span>
              </div>
              <p class="message-text">{{ message.text }}</p>
            </div>
            <div v-if="!message.read" class="unread-badge"></div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="markAllAsRead">
          Mark All as Read
        </button>
        <button class="btn btn-primary" @click="close">Close</button>
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
    };
  },
  computed: {
    messages() {
      return this.store.getMessages;
    },
  },
  methods: {
    markAsRead(messageId) {
      this.store.markMessageAsRead(messageId);
    },
    markAllAsRead() {
      this.store.markAllMessagesAsRead();
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

.messages-modal {
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
  padding: 0;
  overflow-y: auto;
  flex: 1;
  min-height: 200px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #a3aec1;
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

.messages-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  gap: 0.875rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e4e7eb;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.message-item:last-child {
  border-bottom: none;
}

.message-item:hover {
  background: #f8fafc;
}

.message-item.unread {
  background: #f0f4ff;
}

.message-item.unread:hover {
  background: #e5edff;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.message-sender {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
}

.message-time {
  font-size: 0.75rem;
  color: #a3aec1;
}

.message-text {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.unread-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5f6cff;
  flex-shrink: 0;
  margin-top: 0.25rem;
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
  background: #5f6cff;
  color: white;
}

.btn-primary:hover {
  background: #4c5fd5;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 108, 255, 0.3);
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
