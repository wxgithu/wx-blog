<template>
    <div class="person">
        <Layout>
        <Header class="header">
            <Head></Head>
        </Header>
        </Layout>
        <div class="content">
            <Row>
                <Col span="16" class="content-left">
                    <div class="main-top">
                        <a class="avatar" href="/u/7431a737b6c0">
                            <img v-if="user" :src="user.user_profile_photo" alt="头像">
                        </a>
                        <div class="title">
                            <a class="name" href="#" v-if="user">{{user.user_name}}</a>
                        </div>
                        <div class="info">
                            <ul>
                                <li>
                                    <div class="meta-block">
                                        <a href="/users/7431a737b6c0/following">
                                            <p>14</p>
                                            关注 <Icon type="ios-arrow-forward" />
                                        </a>        
                                    </div>
                                </li>
                                <li>
                                    <div class="meta-block">
                                        <a href="/users/7431a737b6c0/followers">
                                            <p>0</p>
                                            粉丝 <Icon type="ios-arrow-forward" />
                                        </a>        
                                    </div>
                                </li>
                                <li>
                                    <div class="meta-block">
                                        <a href="/u/7431a737b6c0">
                                            <p>0</p>
                                            文章 <Icon type="ios-arrow-forward" />
                                        </a>        
                                    </div>
                                </li>
                                <li>
                                    <div class="meta-block">
                                        <p v-if="user">{{user.user_write}}</p>
                                        <div>字数</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="meta-block">
                                        <p v-if="user">{{user.user_like}}</p>
                                        <div>收获喜欢</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Tabs :animated="false" >
                        <TabPane label="文章" icon="ios-paper">
                            <div class="article" v-for="(item,index) in article" :key="index">
                                <a class="time">{{item.article_date}}</a>
                                <p class="detail">{{item.summary}}</p>
                                <p class="operate">
                                    <Icon type="ios-thumbs-up" />
                                    <span>11</span>
                                    <Icon type="ios-chatbubbles" />
                                    <span>{{item.article_comment_count}}</span>
                                    <Icon type="md-heart" />
                                    <span>{{item.article_like_count}}</span>
                                    <Icon type="md-eye" />
                                    <span>{{item.article_views}}</span>
                                </p>
                            </div>
                        </TabPane>
                        <TabPane label="动态" icon="md-notifications-outline">
                            <div class="active">
                                <span>
                                    <img src="../../images/avatar.jpg" />
                                    <a class="name" href="#">飘摇x</a>
                                    <span>发表了文章 .05.16  20:12</span>
                                </span>
                                <a class="title" href="/p/75ce4caad3c4">用盗版软件的我，收到了法院传票</a>
                                <p class="abstract">
                                    本文首发于 ”百味科研芝士“ 微信公众号，转载请注明：百味科研芝士，Focus科研人的百味需求 Origin Pro作为一款广为人知的数据绘图与数据分析处理工具，陪伴小编度过...
                                </p>
                                <p class="operate">
                                    <Icon type="ios-thumbs-up" />
                                    <span>11</span>
                                    <Icon type="ios-chatbubbles" />
                                    <span>22</span>
                                    <Icon type="md-heart" />
                                    <span>32</span>
                                    <Icon type="md-eye" />
                                    <span>56</span>
                                </p>
                            </div>
                            <div class="active">
                                <span class="author">
                                    <img src="../../images/avatar.jpg" />
                                    <a class="name" href="#">飘摇x</a>
                                    <span>关注了作者 · </span>
                                    <span>2018.11.20 09:29</span>
                                </span>
                                <div class="follow-detail">
                                    <div class="info">
                                        <a class="avatar" href="#">
                                            <img src="//upload.jianshu.io/users/upload_avatars/14064769/c23893b0-ed9b-4f85-bffc-fd3d22affb00?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180" alt="180">
                                        </a>
                                        <a class="btn btn-default following"><Icon type="md-checkmark" />已关注</a>
                                        <a class="title" href="#">Amor丶情深</a>
                                        <p>写了 0 字，被 122 人关注，获得了 660 个喜欢</p>
                                    </div>
                                    <div class="signature">前端攻城狮一枚</div>
                                </div>
                            </div>
                            <div class="active">
                                <span>
                                    <img src="../../images/avatar.jpg" />
                                    <a class="name" href="#">飘摇x</a>
                                    <span>喜欢了文章 .05.16  20:12</span>
                                </span>
                                <a class="title" href="/p/75ce4caad3c4">用盗版软件的我，收到了法院传票</a>
                                <p class="abstract">
                                    本文首发于 ”百味科研芝士“ 微信公众号，转载请注明：百味科研芝士，Focus科研人的百味需求 Origin Pro作为一款广为人知的数据绘图与数据分析处理工具，陪伴小编度过...
                                </p>
                                <p class="operate">
                                    <a href="#">百味科研芝士</a>
                                    <Icon type="ios-thumbs-up" />
                                    <span>11</span>
                                    <Icon type="ios-chatbubbles" />
                                    <span>22</span>
                                    <Icon type="md-heart" />
                                    <span>32</span>
                                    <Icon type="md-eye" />
                                    <span>56</span>
                                </p>
                            </div>
                        </TabPane>
                        <TabPane label="最新评论" icon="md-chatboxes">标签三的内容</TabPane>
                        <TabPane label="热门" icon="md-flame">标签三的内容</TabPane>
                    </Tabs>
                </Col>
                <Col span="7" offset="1" class="content-right">
                    <div class="title">个人介绍</div>
                    <a class="function-btn"><Icon type="md-create" />编辑</a>
                    <form class="profile-edit js-intro-form" data-type="json" id="edit_user_14878535" action="/users/7431a737b6c0" accept-charset="UTF-8" data-remote="true" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="_method" value="patch">
                        <textarea name="user[intro]" id="user_intro"></textarea>
                        <input type="submit" name="commit" value="保存" class="btn btn-hollow" data-action="save-edit-intro" data-disable-with="保存">
                        <a data-action="cancel-edit-intro" href="javascript:void(null);">取消</a>
                    </form>
                    <div class="description">
                        <div class="js-intro"></div>
                    </div>
                    <a href="#">
                        <Icon type="ios-heart" size="30"/> <span>我喜欢的文章</span>
                    </a>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script src="./person.js">
</script>
<style lang="scss" scoped>
    .ivu-layout-content /deep/ {
        width: 60%;
    }
    .ivu-tabs-nav /deep/ .ivu-tabs-tab /deep/{
            margin-right: 37px;
        }
        .ivu-row /deep/{
            width:900px;
            margin:0 auto;
        }
</style>
<style lang="scss" scoped src="./person.scss"></style>