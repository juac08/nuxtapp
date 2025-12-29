<template>
  <ClientOnly>
    <div class="app-container">
      <!-- Top Header -->
      <div class="app-header">
        <div class="header-left">
          <h1 class="app-title">TASK MANAGER</h1>
        </div>
        <div class="header-center">
          <div class="search-box">
            <svg
              width="16"
              height="16"
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
              placeholder="Search..."
              class="search-input"
              v-model="searchQuery"
              @input="handleSearch"
            />
          </div>
        </div>
        <div class="header-right">
          <select
            class="filter-dropdown"
            v-model="filterStatus"
            @change="handleFilter"
          >
            <option value="all">All tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button class="menu-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <circle cx="12" cy="19" r="2"></circle>
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <div class="sidebar-panel">
          <SideBarSection />
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
    </div>
  </ClientOnly>
</template>

<script>
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
import ListSection from "~/components/TaskList/SelectFormTaskListSection.vue";
import DescriptionSection from "~/components/TaskDescription/DescriptionSection.vue";
import { useMainStore } from "~/stores/main";

export default {
  components: {
    SideBarSection,
    ListSection,
    DescriptionSection,
  },
  data() {
    return {
      searchQuery: "",
      filterStatus: "all",
      store: useMainStore(),
    };
  },
  methods: {
    handleSearch() {
      this.store.setSearch(this.searchQuery);
    },
    handleFilter() {
      // Filter is passed as prop to ListSection
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
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e4e7eb;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 2rem;
  flex-shrink: 0;
}

.header-left {
  width: 280px;
}

.app-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #a3aec1;
  letter-spacing: 0.1em;
  margin: 0;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #f5f7fa;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.search-box svg {
  color: #a3aec1;
  flex-shrink: 0;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9375rem;
  color: #2c3e50;
  width: 100%;
}

.search-input::placeholder {
  color: #a3aec1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-dropdown {
  padding: 0.5rem 1rem;
  border: 1px solid #e4e7eb;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #2c3e50;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

.menu-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #a3aec1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: #f5f7fa;
}

/* Content */
.content-wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: 288px 1fr 1fr;
  gap: 0;
  overflow: hidden;
}

.sidebar-panel {
  background: #ffffff;
  border-right: 1px solid #e4e7eb;
  overflow-y: auto;
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
</style>
