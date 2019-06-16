<template>
    <div class="article-detail">
      <BackTop></BackTop>
      <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
      </Layout>
      <div class="content">
        <h3 class="title" v-if="detail">{{detail.title}}</h3>
        <div class="author">
          <a class="avatar" href="#">
            <img  v-if="detail" :src="detail.user_profile_photo" alt="96">
          </a>         
        <div class="info">
            <span class="name"><a src="#" @click="getOtherInfo(detail.user_id)"  v-if="detail">{{detail.user_name}}</a></span>
            <!-- 关注用户按钮 -->
            <a class="btn btn-success follow"><Icon type="ios-add" size="13"/><span>关注</span></a>
            <!-- 文章数据信息 -->
            <div class="meta">
                <span class="publish-time" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="最后编辑于 2019.05.19 21:11">2019.05.19 21:09*</span>
              <span class="wordage">字数 960</span>
            <span class="views-count">阅读 43</span><span class="comments-count">评论 0</span><span class="likes-count">喜欢 3</span></div>
            </div>
          <!-- 如果是当前作者，加入编辑按钮 -->
        </div>
        <div class="article-content" v-if="detail" v-html="detail.detail"></div>
        </div>
        <div class="emoji content">
          <span>
            <img src="../../images/touyun.gif">
            <p>头晕</p>
          </span>
          <span>
            <img src="../../images/nanguo.gif">
            <p>难过</p>
          </span>
          <span>
            <img src="../../images/chedan.gif">
            <p>扯淡</p>
          </span>
          <span>
            <img src="../../images/bujie.gif">
            <p>不解</p>
          </span>
          <span>
            <img src="../../images/gaoxiao.gif">
            <p>搞笑</p>
          </span>
          <span>
            <img src="../../images/zhichi.gif">
            <p>支持</p>
          </span>
          <span>
            <img src="../../images/chaozan.gif">
            <p>超赞</p>
          </span>
          <span>
            <img src="../../images/qianbian.gif">
            <p>欠扁</p>
          </span>
        </div>
        <div class="like">
          <div class="btn-like">
            <Icon type="ios-heart-outline" size="30" color="#EA6F5A"/><a class="line">喜欢</a>
            <span class="modal-wrap">
              <a>127</a>
            </span>
          </div>
        </div>
        <form class="new-comment content">
           <a class="avatar" v-if="isLogin">
              <img v-if="user" :src="user.user_profile_photo">
          </a>
          <Review :message="article_id"></Review>
        </form>
         <reviewList></reviewList>
    </div>
</template>
<script src="./article-detail.js"></script>
<style lang="scss" scoped src="./article-detail.scss"></style>