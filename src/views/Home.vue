<template>
  <div>
    <h1 style="color: red">hello,vue</h1>
    <div class="container"></div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      imgSrc: require('@/assets/img/wlop2.jpg')
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(111)
      }, 300)
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  border: 1px dotted orange;
  width: 100px;
  height: 100px;
  background-image: url('../assets/img/wlop2.jpg');
}
</style>