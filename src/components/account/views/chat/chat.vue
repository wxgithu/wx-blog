<template>
  <div class="chat">
       <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
        </Layout>
        <div class="chat-box">
            <div class="chat-top">
                <a href="/message" class="back-to-list active">
                    <Icon type="ios-return-left" /> 返回消息列表
                </a>
                <b> 与<a href="/u/82854a3500fc" target="_blank">{{receiveUser.user_name}}</a>
                的对话
                </b> 
            </div>
        </div>
        <div class="message-show">
            <ul class="message-list">
                <li class="message-r" v-for="(item,index) in sendInfo" :key="index">
                    <a href="/u/7431a737b6c0" class="avatar">
                    <img :src="user.user_profile_photo">
                    </a>
                    <div>
                        <span class="content">{{item.chat_content}}</span>
                    </div>
                    <span class="time">{{item.chat_time}}</span>
                </li>
                <li class="message-l">
                    <a href="/u/7431a737b6c0" class="avatar">
                    <img :src="receiveUser.user_profile_photo">
                    </a>
                    <div>
                        <span class="content-l">aaa</span>
                    </div>
                    <span class="time">{{this.nowTime}}</span>
                </li>
            </ul>
        </div>
        <div class="write-message">
            <form>
                <textarea type="text" v-model="msge" placeholder="输入内容" class="form-control"></textarea>
                <input type="button" class="btn btn-send" value="发送" @click="msgClick">
            </form>
            <div class="hint">Enter 直接发送</div>
        </div>
  </div>
</template>

<script>
import Head from "../header/header.vue"
export default {
  components:{
      Head,
  },
  data(){
      return {
          msge:"",
          user: {},
          nowTime: "",
          sendInfo:[],
          time:'',
          receiveUser:"",
      }
  },
  methods:{
      timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
            let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
            let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
            let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
            this.nowTime = year + "-" + month + "-" + date + " " + " " + hh + ":" + mm;
        },
        // 定时器函数
        nowTimes() {
            this.timeFormate(new Date());
            setInterval(this.nowTimes, 30 * 1000);
        },
       getInfo() {
            this.axios.get("http://127.0.0.1:3000/users/usersInfo", { params: { uid: localStorage.uid } }).then((res) => {
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
            })
        },
        getReceiveInfo() {
            this.axios.get("http://127.0.0.1:3000/users/usersInfo", { params: { uid: this.$route.query.to_id } }).then((res) => {
                if (this.receiveUser == undefined) return {};
                this.receiveUser = res.data.user[0];
            })
        },
        //刷新
    refresh(){
         setTimeout(()=>{
            this.axios.get("http://127.0.0.1:3000/send",{params:{from_id:localStorage.uid,to_id:this.$route.query.to_id}}).then((res)=>{
            this.sendInfo = res.data;
            // console.log(res);
        })
        },1000)
    },
      //input点击事件 发送消息
    msgClick(eve){
        this.refresh();
        var params = {
            content:this.msge,
            time:this.nowTime,
            from_id:localStorage.uid,
            to_id:this.$route.query.to_id,
        };
        this.axios.post("http://127.0.0.1:3000/chat",params).then(()=>{
        })
      var _this = this;
      var goEasy = new GoEasy({
        appkey: "BC-6de0560cd48a42faa1fb7a2de2df3ca3"
      });
      goEasy.publish({
        channel: "my_channel",
        message: this.msge,
        onSuccess:function(){
          console.log('消息发送成功');
        },
        onFailed: function (error) {
          alert("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
          alert('消息发送失败');
        }
      });
    }
  },
  beforeDestroy() {
        window.removeEventListener('beforeunload',this.refresh);
    },
  mounted () {
      window.addEventListener('beforeunload', this.refresh);
      this.getReceiveInfo();
      this.nowTimes();
      this. getInfo();
    var _this = this;
    //接受消息
    var goEasy = new GoEasy({
      appkey: "BC-6de0560cd48a42faa1fb7a2de2df3ca3"
    });
    goEasy.subscribe({
      channel: "my_channel",
      onMessage: function (message) {
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.header {
        position: fixed;
        width: 100%;
        z-index: 100;
    }
    .chat{
        .chat-box,.message-show,.write-message{
            width: 650px;
            margin: 60px auto;
            .chat-top{
                position: fixed;
                width:650px;
                z-index: 1;
                min-height: 70px;
                margin-bottom: 20px;
                padding-bottom: 10px;
                text-align: center;
                background-color: #fff;
                border-bottom: 1px solid #f0f0f0;
                .back-to-list {
                    position: absolute;
                    top: 28px;
                    left: 0;
                    font-size: 14px;
                    color: #969696;
                }
                 b{
                    display: inline-block;
                    padding: 26px 140px 0 160px;
                    font-size: 14px;
                    a{
                        color: #333;
                    }
                }
            }
        }
        .message-show{
            padding-top: 46px;
            .message-list {
                margin-top: 20px;
                padding: 10px 0 110px;
                list-style: none;
            }
            li {
                margin-bottom: 15px;
                overflow: hidden;
                line-height: 20px;
                div {
                    position: relative;
                    display: block;
                    margin: 4px 56px 0;
                    min-height: 39px;
                    .content-l{
                        float: left;
                    }
                    .content{
                         float: right;
                    }
                    .content,.content-l {
                        min-height: 39px;
                        background-color: #eee;
                        border-radius: 4px 0 4px 4px;
                        position: relative;
                        padding: 8px 12px;
                        font-size: 14px;
                        border: 1px solid #d9d9d9;
                        word-break: break-word!important;
                        line-height: 1.5;
                        display: table-cell;
                    }
                }
            }
            .message-l{
                 .avatar {
                    float: left;
                }
                .time {
                    float: left;
                    margin-right: 56px;
                    margin-top: 2px;
                    font-size: 12px;
                    color: #d9d9d9;
                }
            }
            .message-r{
                .avatar {
                    float: right;
                }
                .time {
                    float: right;
                    margin-right: 56px;
                    margin-top: 2px;
                    font-size: 12px;
                    color: #d9d9d9;
                }
            }
            .avatar{
                width: 40px;
                height: 40px;
                display: block;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ddd;
                    border-radius: 50%;
                }
            }
        }
        .write-message{
            form {
                max-width: 650px;
                margin: 0 0 20px;
                .form-control {
                    display: block;
                    font-size: 14px;
                    line-height: 1.42857;
                    color: #555;
                    background-color: hsla(0,0%,71%,.1);
                    width: 100%;
                    padding: 6px 12px;
                    background-image: none;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                }
                .btn-send {
                    float: right;
                    width: 78px;
                    margin: 10px 0;
                    padding: 8px 18px;
                    font-size: 16px;
                    border: none;
                    border-radius: 20px;
                    color: #fff;
                    background-color: #2d8cf0;
                    cursor: pointer;
                    outline: none;
                    display: block;
                }
                .hint {
                    padding-top: 3px;
                    font-size: 13px;
                    color: #969696;
                    float: left;
                }
            }
        }
</style>
