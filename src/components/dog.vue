<template>
  <div class="error-dog">
    <img src="../assets/error-dog.png" alt="">
    <div class="error-content">暂时没有数据，所以，可以放假了</div>
  </div>
</template>

<script>
  export default {
    name: "v-dog"
  }
</script>

<style lang="stylus" scoped>
  .error-dog {
    display flex
    align-items center
    justify-content center
    margin 200px
    img {
      display block
      width 100%
      height 100%
      margin 0 auto
    }
    .error-content {
      font-size 2em
    }
  }
</style>
