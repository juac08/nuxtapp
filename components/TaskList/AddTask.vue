<template>
  <div class="add-wrapper">
    <div class="heading">
      <div>
        <p class="eyebrow">Create</p>
        <h3>Add New Task</h3>
        <p class="subhead">
          Keep it short and clear so everyone can pick it up quickly.
        </p>
      </div>
      <div class="pill-row">
        <span class="pill">Draft friendly</span>
        <span class="pill">Auto-assign later</span>
        <span class="pill">Categories from history</span>
      </div>
    </div>

    <div class="add-items">
      <form class="form-control" @submit.prevent="add">
        <div class="grid-2">
          <div class="item">
            <label for="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              v-model="name"
            />
          </div>

          <div class="item">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="Enter the project title"
              v-model="title"
            />
          </div>
        </div>

        <div class="item">
          <label for="description">Description</label>
          <textarea
            v-model="description"
            name="description"
            id="description"
            rows="5"
            required
            placeholder="Describe the work to be done"
          ></textarea>
        </div>

        <div class="grid-3">
          <div class="item">
            <label for="cat">Category</label>
            <input
              type="text"
              id="cat"
              list="cat-list"
              required
              placeholder="Marketing, design, devops..."
              v-model="category"
            />
            <datalist id="cat-list">
              <option
                v-for="option in categories"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </datalist>
          </div>

          <div class="item">
            <label for="priority">Priority</label>
            <select id="priority" v-model="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="item">
            <label for="due">Due Date</label>
            <input
              type="date"
              id="due"
              v-model="dueDate"
              :min="today"
              placeholder="Select a date"
            />
          </div>
        </div>

        <div class="actions">
          <AppButton class="btn" type="submit">Add Task</AppButton>
          <AppButton class="btn btn-secondary" type="button" @click="back"
            >Back To Home</AppButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~/stores/main";
import AppButton from "@/components/UI/AppBaseButton.vue";

export default {
  components: { AppButton },
  data() {
    return {
      name: null,
      title: null,
      description: null,
      category: null,
      priority: "medium",
      dueDate: "",
      store: useMainStore(),
    };
  },
  computed: {
    categories() {
      if (!this.store) return [];
      const unique = new Set(
        this.store.pList.map((p) => p.cat).filter(Boolean)
      );
      return Array.from(unique);
    },
    today() {
      return new Date().toISOString().split("T")[0];
    },
  },
  methods: {
    add() {
      if (
        this.name &&
        this.title &&
        this.description &&
        this.category &&
        this.store
      ) {
        const newTaskId = Math.random();
        this.store.setProject({
          name: this.name,
          title: this.title,
          description: this.description,
          cat: this.category,
          id: newTaskId,
          date: new Date().toDateString(),
          completed: false,
          priority: this.priority,
          due: this.dueDate || null,
          tags: [],
          user: this.name,
          approved: false,
          comments: [],
        });

        // Select the newly added task
        this.store.setSelected(newTaskId);
      }
      this.$router.push("/");
    },
    back() {
      return this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.add-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.heading h3 {
  margin: 0;
  color: var(--clr-gray-900);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: var(--clr-primary);
  margin: 0 0 var(--spacing-xs);
}

.subhead {
  margin: var(--spacing-xs) 0 0;
  color: var(--clr-gray-500);
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
}

.pill {
  padding: 0.45rem 0.8rem;
  background: var(--clr-gray-100);
  border: 1px solid var(--clr-gray-200);
  border-radius: 999px;
  font-size: 0.8rem;
  color: var(--clr-gray-700);
}

.add-items {
  width: 100%;
}

.form-control {
  display: grid;
  gap: var(--spacing-lg);
}

.grid-2 {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.grid-3 {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.item {
  display: grid;
  gap: var(--spacing-sm);
}

input[type="text"],
select,
textarea {
  width: 100%;
  border: 1px solid var(--clr-gray-200);
  background: var(--clr-gray-50);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
  box-shadow: none;
  transition: var(--transition-base);
  font-size: 0.95rem;
  color: var(--clr-gray-800);
}

input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--clr-primary-light);
  border-color: transparent;
  background: var(--clr-white);
}

textarea {
  resize: vertical;
  min-height: 140px;
}

label {
  margin: 0;
  color: var(--clr-gray-700);
  font-weight: 600;
}

.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-sm);
}

@media (max-width: 640px) {
  .add-wrapper {
    gap: var(--spacing-md);
  }

  .heading {
    gap: var(--spacing-sm);
  }
}
</style>
