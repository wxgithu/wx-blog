<template>
    <div class="article">
        <Layout>
            <Sider class="left-side" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <router-link class="return" to="/home">回首页</router-link>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon type="ios-time-outline" size="20"/><span>{{this.nowTime}}</span>
                    <Button type="primary" icon="ios-redo-outline" class="publish" @click="publish">发布文章</Button>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                <div class="addNews-title">
                    <span class="addNews-text">标题</span>
                    <Input v-model="createTitle" :maxlength="20" :placeholder="`标题输入限制20字符`" />
                </div>
                <div class="addNews-summary">
                    <span class="addNews-text">简介</span>
                    <Input v-model="createSummary" :maxlength="100" type="textarea" placeholder="简介输入限制100字符" />
                </div>
                <div class="addNews-content">
                    <span class="addNews-text">详情</span>
                    <markdown :value.sync="createDetail" :placeholder="'开始写文章...'" />
                </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script src="./article.js"></script>
<style scoped lang="scss">
    .article{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .publish{
            font-size:15px;
            float:right;
            margin:15px 50px 0 0;
        }
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .left-side a{
        display:block;
        width:150px;
        height:40px;
        border-radius:30px;
        background:#2d8cf0;
        color:#fff;
        line-height:40px;
        margin:10px auto;
    }
    .addNews-text{
        display:block;
        width:100px;
        height:30px;
        line-height:30px;
        background:#2d8cf0;
        border-radius:10px;
        margin-bottom:20px;
        color:#fff;
    }
    .addNews-title,.addNews-summary{
        margin-top: 10px;
        .ivu-input-wrapper{
            width: 500px;
        }
    }
    .addNews-content{
        margin-top: 10px;
    }
</style>
