<template>
    <div class="article_list">
    <BackTop></BackTop>
        <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
        <div>
            <div class="main">
                <h3 class="result">为您找到相关{{this.count}}篇文章</h3>
            <p v-if="!hasData && !loading" class="no-data">暂无数据</p>
            <div v-else v-for="(item,index) in articleList" :key="index">
                <Card  style="width:900px" class="article" >
                    <div style="text-align:left">
                        <a src="#" @click="toDetail(item.article_id)" class="article-title">{{item.title}}</a>
                        <span class="time">
                            <img src="../../images/time.png">
                            {{item.article_date}}
                        </span>
                        <p class="introduction">
                            {{item.summary}}
                        </p>
                        <p class="operate">
                            <span class="name">{{item.article_author}}</span>
                            <img src="../../images/zan.png" @click="addLike(item.article_id)">
                            <span>{{item.article_like_count}}</span>
                            <img src="../../images/remark.png">
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
            </div>
        </div>
        </Layout>
    </div>
</template>
<script>
import Head from "../header/header.vue";
import {mapState} from "vuex";
export default {
    components:{
        Head,
    },
    data(){
        return{
            articleList:[],
            hasMore: true,
            loading: false,
            hasData: true,
            count:"",
        }
    },
    mounted(){
        this.articleList = this.$route.params.data;
        this.count = this.$route.params.count;
        // console.log(this.$route.params.data);
    },
}
</script>
<style scoped lang="scss" src="./article-list.scss"></style>
