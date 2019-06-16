<template>
    <div class="review">
        <div v-if="isLogin">
        <textarea id="reviewText" placeholder="写下你的评论..." v-model="ArticleCommentText" @focus="show = true"></textarea>
          <div class="write-function-block" v-show="show">
            <div data-v-b36e9416="" class="emoji-modal-wrap">
              <a data-v-b36e9416="" class="emoji">
               <Icon type="md-happy" color="#969696" size="30"  @click="OpenEmotions()"/>
              </a>
            </div>
            <div class="hint">Ctrl+Enter 发表</div>
            <a class="btn btn-send" @click="handleSubmit">发送</a> 
            <a class="cancel" @click="show=false">取消</a>
          </div>
          <Emoji ref="EmotionB" @AppendInputValue="AppendMessageText"></Emoji>
          </div>
          <div v-if="noLogin">
                <a class="avatar">
                    <img src="../../images/head.png">
                </a>
                <div class="noLogin">
                    <router-link to="/login/name1" class="btn">登录</router-link>
                    <span>后发表评论</span>
                </div>
          </div>
    </div>
</template>
<script>
import Emoji from '../emoji/emoji.vue'
import utils from '@/utils/utils';
export default {
    inject:["reload"],
    components: {
        Emoji,
    },
    props:["message"],
    data() {
        return {
            ArticleCommentText: "",
            show: false,
            nowTime: "",
            isLogin: false,
            noLogin: true,
            sendContent:"",
        }
    },
    mounted() {
         if(JSON.parse(localStorage.getItem('islogin'))){
            this.isLogin = true;
            this.noLogin = false;
        }
        this.nowTimes();
    },
    methods: {
        //提交评论
        handleSubmit() {
            if (this.ArticleCommentText == "") {
                this.$Message.warning('评论内容不能为空');
                return;
            } else {
                var params = {
                    time: this.nowTime,
                    uid: localStorage.uid,
                    article_id: this.message,
                    sendContent: this.sendContent,
                }
                // console.log(params);
                this.axios.post("http://127.0.0.1:3000/review", params).then((res) => {
                    if(res.data=="ok"){
                        this.$Message.success('评论成功');
                        this.reload();
                    }
                })
            }
        },
        //评论发布时间
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
            let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
            let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
            let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
            return this.nowTime = year + "-" + month + "-" + date + " " + " " + hh + ":" + mm;
        },
        // 定时器函数
        nowTimes() {
            this.timeFormate(new Date());
            setInterval(this.nowTimes, 30 * 1000);
        },
        // 打开表情包弹框
        OpenEmotions: function() {
            this.$refs.EmotionB.OpenEmotion(true);
        },
        //表情选中后追加在input
        AppendMessageText: function(EmotionChinese) {
            this.ArticleCommentText += EmotionChinese;
            this.sendContent = utils.MatchEmotion(this.ArticleCommentText);
            // console.log(this.sendContent);
        }
    }
}
</script>
<style lang="scss" scoped>
    .review{
        .avatar {
            margin-right: 5px;
            width: 38px;
            height: 38px;
            vertical-align: middle;
            display: inline-block;
            float: left;
            img {
                width: 100%;
                height: 100%;
                border: 1px solid #ddd;
                border-radius: 50%;
            }
        }
        textarea,.noLogin {
            padding: 10px 15px;
            width: 90%;
            height: 80px;
            font-size: 13px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            background-color: hsla(0, 0%, 71%, .1);
            resize: none;
            display: inline-block;
            vertical-align: top;
            outline-style: none;
        }
        .noLogin{
            text-align: center;
            span{
                display: block;
                margin-left: 90px;
                font-size: 14px;
                margin-top: -27px;
            }
            .btn{
                width: 78px;
                height: 36px;
                line-height: 36px;
                font-size: 16px;
                border: none;
                border-radius: 20px;
                color: #fff!important;
                background-color: #2d8cf0;
                cursor: pointer;
                outline: none;
                display: block;
                margin-left: 200px;
                margin-top: 10px;
            }
        }
            .write-function-block {
            height: 50px;
            width: 800px;
            margin-top: 10px;
            .emoji-modal-wrap {
                .emoji {
                    float: left;
                    margin-top: 14px;
                    margin-left: 48px;
                }
            }
            .hint {
                float: left;
                margin: 20px 0 0 20px;
                font-size: 13px;
                color: #969696;
            }
            
            .cancel {
                float: right;
                margin: 18px 0 0 0;
                font-size: 16px;
                color: #969696;
            }
        }
        .btn-send{
                float: right;
                width: 78px;
                margin: 10px 151px 10px 30px;
                padding: 8px 16px;
                font-size: 16px;
                border: none;
                border-radius: 20px;
                color: #fff!important;
                background-color: #2d8cf0;
                cursor: pointer;
                outline: none;
                display: block;
                vertical-align: middle;
            }
    }
</style>
