<template>
    <div class="head" id="bodyBg">
        <div class="nav-menu">
            <p>畅写</p>
            <ul class="nav-head">
                <li>
                    <router-link to="/home">首页</router-link>
                </li>
                <li>
                    <a src="#">Aa</a>
                </li>
                <li>
                    <Icon type="ios-create-outline" size="30"/>
                    <router-link to="/home/article">写文章</router-link>
                </li>
            </ul>
            <div class="search">
                <input type="text" placeholder="      搜索" v-model="keyword">
                <img src="../../images/search.png" @click="searchArticle()">
            </div>
            <ul class="nav-right">
                <div class="not-login" v-if="noLogin">
                    <li>
                        <Icon type="ios-log-in" size="30" color="#999"/>
                        <router-link to="/login/name1">登录</router-link>
                    </li>
                    <li>
                        <router-link to="/login/name2">注册</router-link>
                    </li>
                </div>
                <div class="is-login"  v-if="isLogin">
                    <li class="personal" @mouseleave.stop="isShow = !isShow">
                        <a class="avatar" @mouseenter="showMenu">
                            <img v-if="user" :src="user.user_profile_photo">
                        </a>
                        <ul class="dropdown-menu" v-if="isShow" id="dropdown">
                            <li>
                                <router-link to="/home/person">
                                    <Icon type="md-person"  color="#ea6f5a"/><span>我的主页</span>
                                </router-link>          
                            </li>
                            <li>
                                <a href="/bookmarks">
                                    <Icon type="md-bookmark" color="#ea6f5a"/><span>收藏的文章</span>
                                </a>          
                            </li>
                            <li>
                                <a href="/users/7431a737b6c0/liked_notes">
                                    <Icon type="ios-heart" color="#ea6f5a"/><span>喜欢的文章</span>
                                </a>          
                            </li>
                            <li>
                                <a href="/faqs">
                                    <Icon type="md-help-circle" color="#ea6f5a"/><span>我的钱包</span>
                                </a>          
                            </li>
                            <li>
                                <router-link to="/home/setting">
                                    <Icon type="md-settings" color="#ea6f5a"/><span>设置</span>
                                </router-link>         
                            </li>
                            <li>
                                <a @click="signOut" href="/login">
                                    <Icon type="ios-log-out" color="#ea6f5a"/><span>退出</span>
                                </a>          
                            </li>
                        </ul>
                    </li>
                    <li class="personal">
                        <a>关注</a>
                    </li>
                    <li class="personal">
                        <a>发现</a>
                    </li>
                    <li class="personal">
                        <Badge :count="3" overflow-count="99">
                            <router-link to="/message">消息</router-link>
                        </Badge>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import store from '@/vuex/store.js'
export default {
    data() {
        return {
            isShow: false,
            isLogin: false,
            noLogin: true,
            user:{},
            keyword:"",
        }
    },
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    //   console.log(to);
    //   console.log(from);
    }
  },
    mounted() {
        if(JSON.parse(localStorage.getItem('islogin'))){
            this.isLogin = true;
            this.noLogin = false;
        }
        this.getInfo();
    },
    methods: {
        showMenu: function() {
            this.isShow = true;
        },
        signOut: function() {
            localStorage.clear();
        },
        getInfo(){
            this.axios.get("http://127.0.0.1:3000/users/usersInfo",{params:{uid:localStorage.uid}}).then((res)=>{
                if(this.user == undefined) return {};
                this.user =res.data.user[0];
            })
        },
        searchArticle() {
            this.axios.get("http://127.0.0.1:3000/search", { params: { key: this.keyword } }).then((res) => {
                this.$router.push({
                name:"articleList",
                params:{data:res.data.list,count:res.data.count[0].count},
            });
            
            })
        },
    },
}
</script>
<style lang="scss" scoped src="./header.scss"></style>
<style lang="scss" scoped>
.ivu-badge /deep/{
    .ivu-badge-count {
        height: 15px;
        line-height: 12px;
        top:5px;
        right: -4px;
    }
    
}
</style>
