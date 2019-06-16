<template>
    <div class="review-list">
        <div class="top-title">
            <span class="count">{{this.count}}条评论</span>
            <div class="pull-right">
                <a>按时间倒序.</a>
                <a class="active">按时间正序</a>
            </div>
        </div>
        <div class="comments" v-for="(item,index) in review_list" :key="index">
            <div class="author">
                <a href="#" target="_blank" class="avatar"><img :src="item.user_profile_photo"></a>
                <div class="info">
                    <a href="#" target="_blank" class="name">{{item.user_name}}</a>
                    <div class="meta">
                        <span>{{item.review_id}}楼 · {{item.review_date}}</span>
                    </div>
                </div>
            </div>
            <div class="comment-wrap">
                <p v-html="item.review_content">
                    {{item.review_content}}
                </p>
                <div class="tool-group">
                    <a data-v-cdecbe24="" id="like-button-41782160" class="like-button">
                        <Icon type="ios-thumbs-up-outline" size="25" color="#969696"/><span data-v-cdecbe24="">赞</span>
                    </a>
                    <a class=""><Icon type="ios-chatboxes-outline" size="25" color="#969696"/><span>回复</span></a>
                    <a class="delete" v-if="item.user_id==uid" @click="deleteReview(item.review_id)">删除</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inject:["reload"],
    data(){
        return{
             article_id: "",
             review_list:"",
             count:"",
             uid:"",
        }
    },
    mounted(){
        this.article_id=window.location.href.split('/')[4];
        this.getReviewList();
        this.uid=localStorage.uid;
    },
    methods:{
        getReviewList(){
            this.axios.get("http://127.0.0.1:3000/reviewList",{params:{id:this.article_id}}).then((res)=>{
                this.review_list = res.data.data;
                this.count = res.data.count[0].count;
                res.data.data.forEach(element => {
                        element.review_date = element.review_date.slice(0, 10);
                    });
            })
        },
        deleteReview(id){
            this.axios.get("http://127.0.0.1:3000/deleteReview",{params:{id:id}}).then((res)=>{
                if(res.data="ok"){
                    this.$Message.success("删除成功");
                    this.reload();
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .review-list{
        width: 660px;
        margin:40px auto;
        .top-title{
            padding-bottom: 45px;
            font-size: 17px;
            font-weight: 700;
            border-bottom: 1px solid #f0f0f0;
            .count{
                float: left;
                font-size: 17px;
                font-weight: 700;
                font-family: Georgia,Times New Roman,Times,Songti SC,serif;
            }
            .pull-right{
                float:right;
                a{
                    margin-left: 10px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #969696;
                    display: inline-block;
                }
                .active{
                    color:#2f2f2f;
                }
            }
        }
        .comments{
            padding: 20px 0 30px;
            border-bottom: 1px solid #f0f0f0;
            .author {
                margin-bottom: 15px;
                text-align: left;
                .avatar {
                    margin-right: 5px;
                    width: 38px;
                    height: 38px;
                    vertical-align: middle;
                    display: inline-block;
                    img {
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
                .info {
                    display: inline-block;
                    vertical-align: middle;
                    .name {
                        font-size: 15px;
                        color: #333;
                    }
                    .meta {
                        font-size: 12px;
                        color: #969696;
                        span {
                            margin-right: 6px;
                            font-family: Georgia,Times New Roman,Times,Songti SC,serif;
                        }
                    }
                }
            }
            .comment-wrap{
                p {
                    font-size: 16px;
                    margin: 10px 0;
                    line-height: 1.5;
                    text-align: left;
                }
                .tool-group{
                    text-align: left;
                    a{
                        margin-left: 10px;
                    }
                    span {
                        vertical-align: middle;
                        font-size: 14px;
                        color: #969696;
                    }
                    .delete{
                        float:right;
                        color: #969696;
                    }
                }
            }
        }
    }
</style>
