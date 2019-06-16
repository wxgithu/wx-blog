<template>
    <div class="setting">
        <Layout>
            <Header class="header">
                <Head></Head>
            </Header>
        </Layout>
        <Row>
            <!-- 侧滑菜单加载的页面，输入框，按钮丢都无法点击 -->
            <Col span="5" class="menu">
                <Menu :active-name="name" @on-select="changeName()">
                    <MenuItem name="1" @click.native="tabChange(child1)">
                        <Icon type="ios-cube" size="30"/>
                        <span >基础设置</span>
                    </MenuItem>
                    <MenuItem name="2" @click.native="tabChange(child2)">
                        <Icon type="md-person" size="30"/>
                        <span >个人资料</span>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-sad" size="30"/>
                       黑名单 &nbsp; &nbsp;
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon type="ios-thumbs-up" size="30"/>
                        赞赏设置
                    </MenuItem>
                    <MenuItem name="5">
                       <Icon type="md-settings" size="30"/>
                        账号管理
                    </MenuItem>
            </Menu>
        </Col>
        <Col span="16" offset="3">
            <component :is="currentView"></component>
        </Col>
    </Row>
    </div>
</template>
<script src="./setting.js"></script>
<style lang="scss" scoped>
        .ivu-row /deep/{
            width:900px;
            margin:100px auto;
        }
        .header {
                    position: fixed;
                    z-index: 1000;
                    width: 100%;
                }
</style>
