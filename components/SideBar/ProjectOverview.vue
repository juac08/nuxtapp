<template>
  <section class="container">
    <div class="heading">
      <h4>Projects</h4>
    </div>
    <div class="project">
      <div class="departments">
        <div class="department">
          <div
            v-html="$feathericons['circle'].toSvg()"
            class="icon icon1"
          ></div>
          <h5><nuxt-link to="/marketing">Marketing</nuxt-link></h5>
        </div>
        <div class="department">
          <div
            v-html="$feathericons['circle'].toSvg()"
            class="icon icon2"
          ></div>
          <h5>Design</h5>
        </div>
        <div class="department">
          <div
            v-html="$feathericons['circle'].toSvg()"
            class="icon icon3"
          ></div>
          <h5>Development</h5>
        </div>
        <div class="department">
          <div
            v-html="$feathericons['circle'].toSvg()"
            class="icon icon4"
          ></div>
          <h5>Management</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.department {
  display: flex;
  justify-content: baseline;
  align-items: center;
  padding: 10px;
  gap: 2rem;
  margin-left: -8rem;
}
.heading h4 {
  text-transform: uppercase;
  margin-left: -8rem;
}
.icon {
  transition: var(--transition);
}
.icon:hover {
  transform: rotate(360deg);
}

.icon1 {
  color: blueviolet;
}
.icon2 {
  color: rgb(4, 112, 235);
}
.icon3 {
  color: rgb(221, 176, 13);
}
.icon4 {
  color: rgb(223, 6, 158);
}
</style>