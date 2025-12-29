<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Brand Section -->
      <div class="navbar-brand">
        <nuxt-link to="/" class="brand-link">
          <div class="brand-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 11l3 3L22 4"></path>
              <path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
              ></path>
            </svg>
          </div>
          <span class="brand-text">TaskFlow</span>
        </nuxt-link>
      </div>

      <!-- Navigation Menu -->
      <nav class="navbar-nav">
        <nuxt-link to="/" class="nav-link">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </nuxt-link>
        <nuxt-link to="/marketing" class="nav-link">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>Marketing</span>
        </nuxt-link>
      </nav>

      <!-- Search Section -->
      <div class="navbar-search">
        <div class="search-wrapper">
          <svg
            class="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="search-input"
            placeholder="Search tasks, projects..."
            v-model="search"
            @keyup="searchProject"
          />
          <kbd class="search-shortcut">⌘K</kbd>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="navbar-actions">
        <button class="action-btn" title="Notifications">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notification-badge">3</span>
        </button>

        <button class="action-btn" title="Add Task">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <!-- User Menu -->
      <div class="navbar-user">
        <button class="user-menu-btn" @click="toggleUserMenu">
          <div class="user-avatar">
            <img
              v-if="userAvatar"
              :src="userAvatar"
              alt="User"
              class="avatar-img"
            />
            <span v-else>{{ userInitials }}</span>
          </div>
          <div class="user-info">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">Admin</span>
          </div>
          <svg
            class="dropdown-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- User Dropdown Menu -->
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="dropdown-header">
            <div class="dropdown-avatar">
              <span>{{ userInitials }}</span>
            </div>
            <div>
              <div class="dropdown-name">{{ userName }}</div>
              <div class="dropdown-email">admin@taskflow.com</div>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </a>
          <a href="#" class="dropdown-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6"></path>
              <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"></path>
              <path d="M1 12h6m6 0h6"></path>
              <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"></path>
            </svg>
            <span>Settings</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item logout">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Log out</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      showUserMenu: false,
      userName: "Michael Scott",
      userAvatar: null,
    };
  },
  computed: {
    userInitials() {
      return this.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    searchProject() {
      // Search functionality
      console.log("Searching:", this.search);
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.showUserMenu = false;
      }
    });
  },
};
</script>

<style scoped>
/* Navbar Container */
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.98);
}

.navbar-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.875rem 2rem;
  max-width: 100%;
}

/* Brand Section */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #111827;
  transition: all 0.2s ease;
}

.brand-link:hover {
  opacity: 0.8;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
  transition: all 0.2s ease;
}

.brand-link:hover .brand-icon {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px -2px rgba(102, 126, 234, 0.4);
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link svg {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  color: #667eea;
  background: #f5f3ff;
}

.nav-link:hover svg {
  opacity: 1;
}

.nav-link.router-link-active {
  color: #667eea;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  font-weight: 600;
}

.nav-link.router-link-active svg {
  opacity: 1;
}

/* Search Section */
.navbar-search {
  flex: 1;
  max-width: 500px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.625rem 1rem;
  transition: all 0.2s ease;
}

.search-wrapper:focus-within {
  background: #ffffff;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-icon {
  color: #9ca3af;
  margin-right: 0.75rem;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.search-wrapper:focus-within .search-icon {
  color: #667eea;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  color: #111827;
  outline: none;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-shortcut {
  padding: 0.25rem 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: system-ui, -apple-system, sans-serif;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

/* Actions Section */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: #f9fafb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f3f4f6;
  color: #667eea;
  transform: translateY(-1px);
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(244, 63, 94, 0.3);
}

/* User Menu */
.navbar-user {
  position: relative;
  flex-shrink: 0;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.375rem 0.75rem;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu-btn:hover {
  background: #ffffff;
  border-color: #667eea;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.user-role {
  font-size: 0.75rem;
  color: #9ca3af;
}

.dropdown-icon {
  color: #9ca3af;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.user-menu-btn:hover .dropdown-icon {
  color: #667eea;
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 0.75rem;
  z-index: 1001;
  animation: slideDown 0.2s ease;
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
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.dropdown-avatar {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}

.dropdown-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.125rem;
}

.dropdown-email {
  font-size: 0.8125rem;
  color: #6b7280;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: #374151;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: #f9fafb;
  color: #667eea;
}

.dropdown-item svg {
  color: #9ca3af;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.dropdown-item:hover svg {
  color: #667eea;
}

.dropdown-item.logout {
  color: #ef4444;
}

.dropdown-item.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

.dropdown-item.logout svg {
  color: #ef4444;
}

.dropdown-item.logout:hover svg {
  color: #dc2626;
}

/* Responsive Design */
@media screen and (max-width: 1024px) {
  .navbar-container {
    gap: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .user-info {
    display: none;
  }

  .user-menu-btn {
    padding: 0.375rem;
  }
}

@media screen and (max-width: 768px) {
  .navbar-container {
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .brand-text {
    display: none;
  }

  .navbar-nav {
    display: none;
  }

  .navbar-search {
    max-width: 100%;
  }

  .search-shortcut {
    display: none;
  }

  .navbar-actions {
    gap: 0.25rem;
  }

  .action-btn {
    width: 36px;
    height: 36px;
  }
}
</style>
