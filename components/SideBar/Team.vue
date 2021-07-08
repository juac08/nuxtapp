<template>
  <div class="team-container">
    <div class="heading">
      <h4>Team</h4>
    </div>
    <div class="teams">
      <div class="team">
        <img src="@/assets/images/user-1.jpg" alt="" class="image" />
      </div>
      <div class="team">
        <img src="@/assets/images/user-2.jpg" alt="" class="image" />
      </div>
      <div class="team">
        <img src="@/assets/images/user-3.jpg" alt="" class="image" />
      </div>
      <div class="team">
        <img src="@/assets/images/user-4.jpg" alt="" class="image" />
      </div>
      <div class="team">
        <img src="@/assets/images/user-5.jpg" alt="" class="image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style  scoped>
.heading h4 {
  margin: 10px;
  text-transform: uppercase;
}
.teams {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 8px;
}

img {
  width: 40px;
  height: 40px;
  border: 2px solid rgb(4, 236, 236);
  border-radius: 50%;
  box-shadow: var(--light-shadow);
}
.team-container {
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>