<template>
  <div class="container-task">
    <ul>
      <transition name="fade" appear>
        <li class="list" :class="[isDone && 'completed ']" @click="select">
          <div
            v-html="$feathericons['check'].toSvg()"
            class="icon"
            :class="[project.completed && 'changeColor']"
            @click="done"
          ></div>
          <div class="content">
            <h5>{{ project.title }}</h5>
            <p>{{ project.date }}</p>
          </div>
          <div>
            <img :src="project.url" :alt="project.cat" class="image" />
          </div>
        </li>
      </transition>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["project"],
  data() {
    return {
      isDone: false,
      selected: false,
    };
  },
  methods: {
    done() {
      return this.$store.dispatch("setSelectFilter", this.project.id);
    },
    select() {
      this.isDone = !this.isDone;
      this.$store.dispatch("setSelected", this.project.id);
    },
  },
};
</script>

<style scoped>
.image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid rgb(4, 236, 236);
  object-fit: cover;
}
.icon {
  background: #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  vertical-align: middle;
  text-align: center;
  border: 1px solid rgb(122, 121, 121);
  color: rgb(164, 165, 166);
  box-shadow: var(--light-shadow);
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-self: auto;
  margin-top: 2rem;
}
.list {
  display: flex;
  justify-content: baseline;
  align-items: center;
  align-self: center;
  gap: 1.3rem;
  width: 100%;
  height: 6.9rem;
  padding: 18px 40px;
  background: rgb(241, 242, 247);
  border-bottom: 1px solid rgb(215, 215, 215);
  box-shadow: var(--light-shadow);
}
.completed {
  background-color: #ffffff;
}
.changeColor {
  color: white;
  background: rgb(80, 120, 254);
}
</style>