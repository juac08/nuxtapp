<template>
  <div class="add-page">
    <div class="page-hero">
      <div>
        <p class="eyebrow">Task Manager</p>
        <h2>Plan, track, and add work without clutter</h2>
        <p class="hero-copy">
          Use the live task list on the left to scan what exists and drop new
          work in with priorities and due dates.
        </p>
      </div>
      <div class="hero-pills">
        <span class="pill">Responsive grid</span>
        <span class="pill">No horizontal scroll</span>
        <span class="pill">Mobile ready</span>
      </div>
    </div>

    <div class="layout-grid">
      <div class="layout-card sidebar-panel">
        <SideBarSection />
      </div>
      <div class="layout-card list-panel">
        <ListSection />
      </div>
      <div class="layout-card add-panel">
        <AddTask />
      </div>
    </div>
  </div>
</template>

<script>
import SideBarSection from "~/components/SideBar/SideBarSection.vue";
import ListSection from "~/components/TaskList/SelectFormTaskListSection.vue";
import AddTask from "~/components/TaskList/AddTask.vue";

export default {
  components: {
    SideBarSection,
    ListSection,
    AddTask,
  },
  head: {
    title: "Task Manager | Add Project",
  },
};
</script>

<style scoped>
.add-page {
  min-height: 100vh;
  background: var(--clr-gray-50);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: var(--clr-primary);
  margin-bottom: var(--spacing-xs);
}

.page-hero {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(120deg, rgba(79, 70, 229, 0.12), rgba(6, 182, 212, 0.12));
  border-bottom: 1px solid var(--clr-gray-200);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.hero-copy {
  max-width: 640px;
  color: var(--clr-gray-600);
}

.hero-pills {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-items: flex-end;
}

.pill {
  padding: 0.4rem 0.8rem;
  background: var(--clr-white);
  border: 1px solid var(--clr-gray-200);
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
  font-size: 0.85rem;
  color: var(--clr-gray-700);
}

.layout-grid {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) minmax(360px, 0.95fr);
  grid-template-areas: "sidebar list add";
  gap: var(--spacing-lg);
  align-items: start;
}

.layout-card {
  background: var(--clr-white);
  border: 1px solid var(--clr-gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  height: 100%;
  min-width: 0;
  overflow: hidden;
}

.sidebar-panel {
  grid-area: sidebar;
}

.list-panel {
  grid-area: list;
}

.add-panel {
  grid-area: add;
}

@media (max-width: 1080px) {
  .page-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .layout-grid {
    grid-template-columns: 240px minmax(0, 1fr);
    grid-template-areas:
      "sidebar list"
      "add add";
  }
}

@media (max-width: 768px) {
  .layout-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "list"
      "add";
    padding: var(--spacing-lg);
  }

  .layout-card {
    padding: var(--spacing-md);
  }
}

@media (max-width: 540px) {
  .layout-grid {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }
}
</style>
