<template>
  <div class="container">
    <div class="heading">
      <h3>Add New Task</h3>
    </div>
    <div class="add-items">
      <form class="form-control" @submit.prevent>
        <div class="item">
          <label for="name">Your Name:</label>
          <input
            type="text"
            required
            placeholder="Enter Your Name"
            v-model="name"
          />
        </div>

        <div class="item">
          <label for="name">Title:</label>
          <input
            type="text"
            required
            placeholder="Enter The Project Title"
            v-model="title"
          />
        </div>
        <div class="item">
          <label for="description">Description:</label>
          <textarea
            v-model="description"
            name="description"
            id="description"
            cols="30"
            rows="10"
            required
            placeholder="Enter the Description"
          ></textarea>
        </div>
        <div class="item">
          <label for="cat">Category:</label>
          <input
            type="text"
            id="cat"
            required
            placeholder="Enter The Department"
            v-model="category"
          />
        </div>
        <AppButton class="btn" @click="add">Add</AppButton>
        <AppButton class="btn" @click="back">Back To Home</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/UI/AppBaseButton.vue";
export default {
  components: { AppButton },
  data() {
    return {
      name: null,
      title: null,
      description: null,
      category: null,
    };
  },
  methods: {
    add() {
      if (this.name && this.title && this.description && this.category) {
        this.$store.dispatch("setProject", {
          name: this.name,
          title: this.title,
          description: this.description,
          cat: this.category,
          id: Math.random(),
          date: new Date().toDateString(),
          completed: false,
        });
      }
      this.$router.push("/");
    },
    back() {
      return this.$router.push("/");
    },
  },
};
</script>

<style  scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px;
  margin-top: 20px;
}
.add-items {
  width: 50rem;
  height: 44.3rem;
  gap: 3rem;
  background: white;
  margin: 10px;
  padding: 20px 35px;
  box-shadow: var(--dark-shadow);
  border-radius: var(--radius);
}
.form-control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}
input[type="text"],
textarea {
  border: none;
  background: rgb(241, 242, 247);
  border-radius: 20px;
  padding: 5px 10px;
  width: 90%;
  box-shadow: var(--light-shadow);
  transition: var(--transition);
}
input {
  height: 2.5rem;
}
input:focus,
textarea:focus {
  outline: none;
  width: 100%;
}
label {
  margin-bottom: 1rem;
  color: black;
}
h3 {
  text-transform: uppercase;
  color: gray;
}
</style>
