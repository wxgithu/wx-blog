<template>
  <div class="cover">
    <div class="header" id="demo">
      <div class="top_logo"></div>  
      <div class="nav">
        <router-link class="gv" to="/login/name1">登录</router-link>
        <router-link class="gv" to="/login/name2">注册</router-link>
        <router-link class="gv" to="/home">首页</router-link>
      </div>
      <div class="canvaszz"> </div>
      <canvas id="canvas"></canvas> 
    </div>
    <div class="videozz"></div>
	  <audio controls controlsList="nodownload" class="audio">
      <source src="../images/Music.mp3" type="audio/mp3"> 
    </audio>
  </div>
</template>
<script src='https://libs.baidu.com/jquery/1.10.2/jquery.min.js'></script>
<script src="./cover.js"></script>
<style lang="scss" scoped src='./cover.scss' />
