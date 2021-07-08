<template>
  <div>
    <div class="skill-container">
      <div
        class="skill-value skill-value-80"
        :style="{ width: `${(completed / projects) * 100}%` }"
      ></div>
      <p class="skill-text skill-text-80">{{ completed }}/{{ projects }}</p>
    </div>
    <div class="tasks">
      <div class="task">
        <div class="heading">
          <h3>{{ completed }}</h3>
        </div>
        <div class="des">
          <h4>Completed</h4>
          <p>tasks</p>
        </div>
      </div>
      <div class="task">
        <div class="heading">
          <h3>{{ ongoing }}</h3>
        </div>
        <div class="des">
          <h4>To do</h4>
          <p>tasks</p>
        </div>
      </div>
      <div class="task">
        <div class="heading">
          <h3>{{ projects }}</h3>
        </div>
        <div class="des">
          <h4>Total</h4>
          <p>tasks</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: null,
    };
  },
  computed: {
    projects() {
      let a = this.$store.getters.pList;
      return a.length;
    },
    completed() {
      let complete = this.$store.getters.pList.filter((project) => {
        return project.completed === false;
      });
      return this.projects - complete.length;
    },
    ongoing() {
      let complete = this.$store.getters.pList.filter((project) => {
        return project.completed === true;
      });
      return this.projects - complete.length;
    },
  },
};
</script>

<style scoped>
.skill-container {
  background: rgb(227, 227, 227);
  height: 0.5rem;
  width: 100%;
  border-radius: var(--radius);
  position: relative;
  margin-top: 3.5rem;
  box-shadow: var(--light-shadow);
}
.skill-value {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(80, 120, 254);
  height: 100%;
  width: 50%;
  border-radius: var(--radius);
}
.skill-value-80 {
  width: 40%;
}
.skill-text {
  position: absolute;
  top: -1.2rem;
  left: 90%;
  transform: translateX(-50%);
}
.tasks {
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 5px 10px;
  text-align: center;
  margin-top: 1rem;
}
h3 {
  font-size: 1.3rem;
}
.tasks h4 {
  color: rgb(47, 39, 39);
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0;
  margin-bottom: 0;
}
</style>