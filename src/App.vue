<--模板-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<--script-->
<script>
export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true,
    }
  },
  provide(){
    return{
      reload:this.reload,
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
<--样式-->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
