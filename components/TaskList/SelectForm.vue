<template>
  <div class="select">
    <form class="mainselection">
      <select class="mainselection" v-model="name" @select="s">
        <option value="all">All Task</option>
        <option value="marketing">Marketing</option>
        <option value="design">Design</option>
        <option value="development">Development</option>
        <option value="management">Management</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "all",
    };
  },
  methods: {
    s() {
      this.$store.dispatch("setSelectFilter", this.name);
      console.log(this.name);
    },
  },
};
</script>

<style  scoped>
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
</style>