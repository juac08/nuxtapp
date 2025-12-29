<template>
  <ClientOnly>
    <div class="app-container">
      <!-- Top Header -->
      <div class="app-header">
        <div class="header-left">
          <div class="brand-section">
            <div class="brand-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path d="M9 11l3 3L22 4"></path>
                <path
                  d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                ></path>
              </svg>
            </div>
            <div class="brand-text">
              <h1 class="app-title">TaskFlow</h1>
              <span class="app-subtitle">Organize & Track</span>
            </div>
          </div>
        </div>
        <div class="header-center">
          <div class="search-box">
            <svg
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
              placeholder="Search tasks, projects, or people..."
              class="search-input"
              v-model="searchQuery"
              @input="handleSearch"
            />
            <kbd class="search-kbd">⌘K</kbd>
          </div>
        </div>
        <div class="header-right">
          <div class="filter-wrapper">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon
                points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
              ></polygon>
            </svg>
            <select
              class="filter-dropdown"
              v-model="filterStatus"
              @change="handleFilter"
            >
              <option value="all">All tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <div class="sidebar-panel">
          <SideBarSection
            @open-team-modal="openTeamModal"
            @open-departments-modal="openDepartmentsModal"
            @open-settings-modal="openSettingsModal"
            @open-messages-modal="openMessagesModal"
          />
        </div>

        <div class="tasks-panel">
          <ListSection
            :searchQuery="searchQuery"
            :filterStatus="filterStatus"
          />
        </div>

        <div class="details-panel">
          <DescriptionSection />
        </div>
      </div>

      <!-- Modals -->
      <ManageTeamModal :isOpen="showTeamModal" @close="showTeamModal = false" />
      <ManageDepartmentsModal
        :isOpen="showDepartmentsModal"
        @close="showDepartmentsModal = false"
      />
      <SettingsModal
        :isOpen="showSettingsModal"
        @close="showSettingsModal = false"
      />
      <MessagesModal
        :isOpen="showMessagesModal"
        @close="showMessagesModal = false"
      />
    </div>
  </ClientOnly>
</template>

<script>
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
import ListSection from "~/components/TaskList/SelectFormTaskListSection.vue";
import DescriptionSection from "~/components/TaskDescription/DescriptionSection.vue";
import ManageTeamModal from "~/components/Model/ManageTeamModal.vue";
import ManageDepartmentsModal from "~/components/Model/ManageDepartmentsModal.vue";
import SettingsModal from "~/components/Model/SettingsModal.vue";
import MessagesModal from "~/components/Model/MessagesModal.vue";
import { useMainStore } from "~/stores/main";

export default {
  components: {
    SideBarSection,
    ListSection,
    DescriptionSection,
    ManageTeamModal,
    ManageDepartmentsModal,
    SettingsModal,
    MessagesModal,
  },
  data() {
    return {
      searchQuery: "",
      filterStatus: "all",
      store: useMainStore(),
      showTeamModal: false,
      showDepartmentsModal: false,
      showSettingsModal: false,
      showMessagesModal: false,
    };
  },
  methods: {
    handleSearch() {
      this.store.setSearch(this.searchQuery);
    },
    handleFilter() {
      // Filter is passed as prop to ListSection
    },
    openTeamModal() {
      this.showTeamModal = true;
    },
    openDepartmentsModal() {
      this.showDepartmentsModal = true;
    },
    openSettingsModal() {
      this.showSettingsModal = true;
    },
    openMessagesModal() {
      this.showMessagesModal = true;
    },
  },
  head: {
    title: "Task Manager",
  },
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  overflow: hidden;
}

/* Header */
.app-header {
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 2rem;
  flex-shrink: 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.header-left {
  flex-shrink: 0;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.brand-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.4);
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
  line-height: 1;
}

.app-subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  max-width: none;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  transition: all 0.2s ease;
}

.search-box:focus-within {
  background: #ffffff;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
}

.search-box svg {
  color: #9ca3af;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.search-box:focus-within svg {
  color: #0ea5e9;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9375rem;
  color: #111827;
  width: 100%;
  font-weight: 400;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-kbd {
  padding: 0.25rem 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 500;
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  margin-left: auto;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1rem;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.filter-wrapper:hover {
  border-color: #0ea5e9;
  background: #ffffff;
}

.filter-wrapper svg {
  color: #9ca3af;
  flex-shrink: 0;
}

.filter-wrapper:hover svg {
  color: #0ea5e9;
}

.filter-dropdown {
  border: none;
  background: transparent;
  color: #374151;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  padding-right: 0.5rem;
}

.filter-dropdown option {
  background: #ffffff;
  color: #374151;
  padding: 0.5rem;
}

/* Content */
.content-wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 380px 1fr;
  gap: 0;
  overflow: hidden;
}

.sidebar-panel {
  background: #ffffff;
  border-right: 1px solid #e4e7eb;
  overflow-y: auto;
  overflow-x: visible;
}

.tasks-panel {
  background: #f5f7fa;
  overflow-y: auto;
  border-right: 1px solid #e4e7eb;
}

.details-panel {
  background: #ffffff;
  overflow-y: auto;
}

/* Responsive Design */
@media screen and (max-width: 1200px) {
  .app-header {
    padding: 0 1.5rem;
    gap: 1.5rem;
  }

  .search-box {
    max-width: 400px;
  }
}

@media screen and (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 260px 340px 1fr;
  }

  .app-header {
    padding: 0 1rem;
    gap: 1rem;
  }

  .brand-text {
    display: none;
  }

  .search-box {
    max-width: 350px;
  }

  .search-kbd {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .app-header {
    height: 60px;
    padding: 0 1rem;
    gap: 0.75rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar-panel,
  .details-panel {
    display: none;
  }

  .brand-icon {
    width: 36px;
    height: 36px;
  }

  .brand-icon svg {
    width: 20px;
    height: 20px;
  }

  .app-subtitle {
    display: none;
  }

  .search-box {
    padding: 0.625rem 1rem;
    max-width: none;
  }

  .search-input {
    font-size: 0.875rem;
  }

  .filter-wrapper {
    padding: 0.5rem 0.75rem;
  }

  .filter-wrapper svg {
    display: none;
  }

  .filter-dropdown {
    font-size: 0.875rem;
    padding-right: 0.25rem;
  }
}

@media screen and (max-width: 480px) {
  .app-header {
    padding: 0 0.75rem;
    gap: 0.5rem;
  }

  .app-title {
    font-size: 1rem;
  }

  .search-input::placeholder {
    content: "Search...";
  }

  .filter-dropdown {
    font-size: 0.8125rem;
  }
}
</style>
