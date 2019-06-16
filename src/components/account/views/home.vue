<template>
    <div class="home" id="trainList">
    <BackTop></BackTop>
        <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
        <Content>
            <div class="carousel">
                <Carousel autoplay>
                    <CarouselItem v-for="item in imgList" :key="item.img_id">
                        <div class="demo-carousel">
                            <img :src="item.img_url">
                            <div class="title">
                                <h2>{{item.title}}</h2>
                                <p>{{item.intro}}</p>
                            </div>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div class="main">
            <p v-if="!hasData && !loading" class="no-data">暂无数据</p>
            <div v-else v-for="(item,index) in articleList" :key="index">
                <Card  style="width:700px" class="article" >
                    <div style="text-align:left">
                        <a src="#" @click="toDetail(item.article_id)" class="article-title">{{item.title}}</a>
                        <span class="time">
                            <img src="../images/time.png">
                            {{item.article_date}}
                        </span>
                        <p class="introduction">
                            {{item.summary}}
                        </p>
                        <p class="operate">
                            <span class="name">{{item.article_author}}</span>
                            <img src="../images/zan.png" @click="addLike(item.article_id)">
                            <span>{{item.article_like_count}}</span>
                            <img src="../images/remark.png">
                            <span>{{item.article_comment_count}}</span>
                        </p>
                    </div>
                </Card>
            </div>
                <div v-if="!hasMore && hasData" class="no-more-data">已经到底啦</div>
                <div v-if="loading" class="loading">
                    <Spin>
                        <Icon type="ios-loading" size="18"/>
                        <span>加载中</span>
                    </Spin>
                </div>
                <div class="author">
                    <div class="author-head">
                        推荐作者
                        <a>
                            <Icon type="md-sync" />
                            换一批
                        </a>
                    </div>
                    <div class="author-name" v-for="(item,index) in userList" :key="index">
                        <div class="name-show">
                            <img :src="item.user_profile_photo" />
                            <div class="text">
                                <a href="#">{{item.user_name}}</a>
                                <p class="like">写了{{item.user_write}}k字 · {{item.user_like}}k喜欢</p>
                            </div>
                        </div>
                        <a class="focus">+关注</a>
                    </div>
                </div>
            </div>
        </Content>
        </Layout>
    </div>
</template>
<script src="./home.js"></script>
<style scoped lang="scss" src="./home.scss"></style>
