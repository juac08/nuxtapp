<template>
  <div class="container">
    <ul>
      <li>
        <nuxt-link to="/">
          home
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/addnewtask">
          Add Task
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/marketing">
          Marketing
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.container {
  display: flex;
  /* justify-content: center;
  align-items: center; */
}

ul {
  margin: 5px;
  padding: 5px;
  display: flex;
  list-style-type: none;
}

ul li a {
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: red;
  text-transform: capitalize;
  text-decoration: none;
  position: relative;
  transition: all 0.5s;
  color: #262626;
  border-bottom: 2px solid rgb(80, 120, 254);
  border-top: 2px solid rgb(80, 120, 254);
}

a:hover {
  color: rgb(24, 23, 23);
}

ul li span {
  position: absolute;
  width: 100%;
  height: 25%;
  background-color: rgb(35, 77, 231);
  z-index: -1;
  left: 0;
  top: 0;
  transform: scaleX(0);
  transition: all 0.5s;
  transform-origin: left;
}

a:hover span {
  transform: scaleX(1);
}

span:nth-child(2) {
  top: 25%;
  transition-delay: 0.15s;
}

span:nth-child(3) {
  top: 50%;
  transition-delay: 0.3s;
}

span:nth-child(4) {
  top: 75%;
  transition-delay: 0.45s;
}
</style>