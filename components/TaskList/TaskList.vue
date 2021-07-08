<template>
  <div>
    <div class="select task-select">
      <form class="mainselection">
        <select class="mainselection" v-model="name">
          <option value="all">All Task</option>
          <option value="marketing">Marketing</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="management">Management</option>
        </select>
      </form>
    </div>
    <div class="listItems message">
      <div v-for="(project, i) in projects" :key="i">
        <SingleTask :project="project" />
      </div>
      <div class="add-btn">
        <AppButton class="btn" @click="addtask">Add Task</AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import SingleTask from "~/components/TaskList/SingleTask.vue";
import AppButton from "~/components/UI/AppBaseButton.vue";
export default {
  components: {
    SingleTask,
    AppButton,
  },
  data() {
    return {
      name: "all",
    };
  },
  computed: {
    projects() {
      if (this.name !== "all") {
        return this.$store.getters.pList.filter((p) => {
          return p.cat == this.name;
        });
      } else {
        return this.$store.getters.pList.filter((p) => {
          return p.title.match(this.$store.getters.sSearch);
        });
      }
    },
  },
  methods: {
    addtask() {
      return this.$router.push("/addnewtask");
    },
  },
};
</script>

<style  scoped>
.listItems {
  outline-style: solid;
  outline-width: 1px;
  outline-color: lightgrey;
  min-width: 30rem;
  min-height: 46.5rem;
}

.add-btn {
  text-align: center;
  margin-top: 8px;
  padding: 17px;
}

.message {
  max-height: 745px;
  overflow: auto;
}
.message::-webkit-scrollbar {
  width: 5px;
}
.message::-webkit-scrollbar-track {
  background: rgb(241, 242, 247);
}
.message::-webkit-scrollbar-thumb {
  background: rgb(209, 207, 207);
}

.task-list {
  margin: 10px;
}

select {
  border: none;
}
select:focus {
  outline: none;
}

.custom {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
}
select {
  color: #6d6a6a;
  background: transparent;
  font-size: 20px;
  font-weight: bold;
  padding: 6px 10px;
  width: 378px;
  *width: 350px;
  overflow: hidden;
}

.mainselection {
  overflow: hidden;
  width: 350px;
  -moz-border-radius: 9px 9px 9px 9px;
  -webkit-border-radius: 9px 9px 9px 9px;
  border-radius: 9px 9px 9px 9px;

  background: url(@/assets/images/chevron-down.svg) no-repeat scroll 319px 5px;
}
.task-select {
  border-left: 4px solid rgb(183, 111, 249);
  height: 67px;
  outline-style: solid;
  outline-width: 1px;
  outline-color: lightgrey;
  margin-top: -1.2rem;
  padding: 15px;
}
</style>