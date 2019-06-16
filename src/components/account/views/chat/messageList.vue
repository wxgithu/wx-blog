<template>
    <div class="message">
        <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
        </Layout>
        <div class="list">
            <div class="menu">
                全部消息
            </div>
            <ul class="jianxin-list">
                <li>
                    <div class="pull-right">
                        <span class="time">05.06 11:31</span>
                        <div>
                            <a data-toggle="dropdown" href="javascript:void(0);">
                                <i class="iconfont ic-show"></i>
                            </a>
                        </div>
                    </div>
                    <a href="/u/82854a3500fc" target="_blank" class="avatar">
                        <img src="//upload.jianshu.io/users/upload_avatars/2587459/0c7e061f-e78e-4b09-b511-340846c4ea0f.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp">
                    </a>
                    <a href="/u/82854a3500fc" target="_blank" class="name">穿着prada挤地铁</a>
                    <a href="/chat" class="wrap">
                        <p>
                            欢迎加入丰富多彩的原创内容社区—简书。新手有关简书的任何疑问请点击链接查看 http://www.jianshu.com/p/27de765cdb28 ，同时关注微信公众号简宝玉（jianshu4321)，后台回复“指南”可获取新手玩转简书社区指南详细资料礼包；简宝玉同志会专程为你答疑解惑关于简书的一切。
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Head from "../header/header.vue"
export default {
    components: {
        Head,
    },
}
</script>
<style lang="scss" scoped>
   .header {
        position: fixed;
        width: 100%;
        z-index: 100;
    }
    .message{
        .list{
            width: 650px;
            margin: 100px auto;
            .menu {
                margin-bottom: 20px;
                font-size: 14px;
                font-weight: 700;
                text-align: left;
            }
           .jianxin-list {
            list-style: none;
           li {
                position: relative;
                border-top: 1px solid #f0f0f0;
                line-height: 20px;
            }
            .pull-right{
                margin: 20px 20px 0 0;
                font-size: 13px;
                float: right;
                font-family: Georgia,Times New Roman,Times,Songti SC,serif;
                 .time {
                    color: #9b9b9b;
                }
            }
            .avatar {
                    float: left;
                    margin: 20px 10px 20px 20px;
                    width: 48px;
                    height: 48px;
                    img{
                            width: 100%;
                            height: 100%;
                            border: 1px solid #ddd;
                            border-radius: 50%;
                        }
                }
                 .wrap {
                    display: block;
                    padding: 20px 20px 20px 0;
                    min-height: 88px;
                   
                }
               .name {
                    position: absolute;
                    top: 25px;
                    font-size: 15px;
                    color: #333;
                    left:80px;
                }
                 p {
                        margin: 28px 0 0;
                        font-size: 12px;
                        color: #999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
           }
        }
    }
</style>
