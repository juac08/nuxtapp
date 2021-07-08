<template>
  <section>
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h3><nuxt-link to="/">Task Manager</nuxt-link></h3>
        </div>
        <div class="search">
          <label for="search">
            <div v-html="$feathericons['search'].toSvg()" class="icon"></div>
          </label>
          <input
            type="text"
            id="search"
            class="input"
            placeholder="Search..."
            v-model="search"
            @keyup="searchProject"
          />
        </div>
        <div class="form">
          <Header />
        </div>
        <div>
          <h2>...</h2>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
// import SelectForm from "~/components/TaskList/SelectForm.vue";
import Header from "~/components/Departments/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      search: null,
    };
  },

  methods: {
    searchProject() {
      return this.$store.dispatch("ss", this.search);
    },
  },
};
</script>

<style scoped>
.nav {
  display: grid;
  grid-template-columns: 250px 1fr 1fr 1fr;
  place-items: center;
  column-gap: 1rem;
  background: var(--clr-white);
  width: 100%;
  box-shadow: var(--light-shadow);
  height: 4rem;
  padding-bottom: 50px;
  margin-top: -0.4rem;
}
.nav h3 {
  /* margin: 10px; */
  color: grey;
  text-align: center;
  margin: 0 auto;
  font-size: 1.3rem;
}
.nav h2 {
  color: grey;
}
.logo {
  width: 450px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid lightgrey;
}
.input {
  border: none;
  transition: all 0.5s ease-in-out;
  width: 50%;
}
.input:focus {
  outline: none;
  width: 100%;
}
.input::placeholder {
  font-size: 1rem;
  color: rgb(171, 171, 171);
}

.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5;
}
.icon {
  color: rgb(193, 192, 192);
}
a.nuxt-link {
  text-decoration: none;
}
</style>
