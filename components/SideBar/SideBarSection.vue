<template>
  <div class="sidebar">
    <!-- Profile Card -->
    <div class="profile-card">
      <div class="profile-avatar">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="User"
          class="avatar-img"
        />
      </div>
      <h3 class="profile-name">{{ setName }}</h3>
      <p class="profile-email">{{ setUserEmail }}</p>
      
      <!-- Action Icons -->
      <div class="action-icons">
        <button class="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <button class="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="badge">5</span>
        </button>
        <button class="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="badge">2</span>
        </button>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stats-header">
        <span class="progress-indicator">12/34</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 35%"></div>
      </div>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">12</div>
          <div class="stat-label">Completed tasks</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">22</div>
          <div class="stat-label">To do tasks</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">243</div>
          <div class="stat-label">All completed</div>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <div class="section">
      <h4 class="section-title">PROJECTS</h4>
      <div class="project-list">
        <div class="project-item">
          <span class="project-dot marketing"></span>
          <span class="project-name">Marketing</span>
        </div>
        <div class="project-item">
          <span class="project-dot design"></span>
          <span class="project-name">Design</span>
        </div>
        <div class="project-item">
          <span class="project-dot development"></span>
          <span class="project-name">Development</span>
        </div>
        <div class="project-item">
          <span class="project-dot management"></span>
          <span class="project-name">Management</span>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="section">
      <h4 class="section-title">TEAM</h4>
      <div class="team-avatars">
        <div class="team-avatar">
          <img src="https://i.pravatar.cc/150?img=1" alt="Team member" />
        </div>
        <div class="team-avatar">
          <img src="https://i.pravatar.cc/150?img=2" alt="Team member" />
        </div>
        <div class="team-avatar">
          <img src="https://i.pravatar.cc/150?img=3" alt="Team member" />
        </div>
        <div class="team-avatar">
          <img src="https://i.pravatar.cc/150?img=4" alt="Team member" />
        </div>
        <div class="team-avatar">
          <img src="https://i.pravatar.cc/150?img=6" alt="Team member" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";

export default {
  data() {
    return {
      store: useMainStore(),
    };
  },
  computed: {
    setName() {
      return this.store?.setName || "Natalie Smith";
    },
    setUserEmail() {
      return this.store?.setUserEmail || "natalie.smith@gmail.com";
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 1.5rem;
  gap: 2rem;
  overflow-y: auto;
}

/* Profile Card */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
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
  margin: 0 0 1rem 0;
}

.action-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.icon-btn {
  width: 40px;
  height: 40px;
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
  border-color: #5f6cff;
  color: #5f6cff;
}

.icon-btn .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #5f6cff;
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
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.stats-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
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
  background: linear-gradient(90deg, #5f6cff 0%, #7c88ff 100%);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
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
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
}

.section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #a3aec1;
  letter-spacing: 0.1em;
  margin: 0 0 1rem 0;
}

/* Projects */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.project-item:hover {
  background: #f5f7fa;
}

.project-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-dot.marketing {
  background: #ec4899;
}

.project-dot.design {
  background: #8b5cf6;
}

.project-dot.development {
  background: #f59e0b;
}

.project-dot.management {
  background: #10b981;
}

.project-name {
  font-size: 0.875rem;
  color: #2c3e50;
  font-weight: 500;
}

/* Team */
.team-avatars {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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

/* Scrollbar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #e4e7eb;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}
</style>
