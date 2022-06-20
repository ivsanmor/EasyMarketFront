<template>
  <div class="container"> 
    <img :src="require('../assets/home.png')" :alt="home" class="product-image"  />
  </div>
</template>

<script>


export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
mounted() {
   
 },
};
</script>

<style scoped>
.container {
  position: absolute; left: -7px; top: 57px;
}
.product-image {float: left; width: 170%;}
</style>