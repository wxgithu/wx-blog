<template>
    <div class="login">
        <div class="carousel" id="banner">
            <img class="pic" src="../images/1.jpg" />
            <img class="pic" src="../images/2.jpg" />
            <img class="pic" src="../images/3.jpg" />
            <div class="page-container">
            <Tabs :value="name" @on-click="onTabChanged">
                <TabPane label="登录" name="name1">
                    <Form
                    ref="formInline"
                    :model="formInline"
                    :rules="ruleInline"
                    :label-width="0"
                    class="login-form"
                >
                    <FormItem prop="userName">
                        <Input 
                            type="text"
                            class="username" 
                            placeholder="请输入用户名" 
                            v-model="formInline.userName"
                        />
                    </FormItem>
                    <FormItem prop="password">
                        <Input 
                            type="password"
                            name="password" 
                            class="password pass" 
                            placeholder="请输入密码" 
                            v-model="formInline.password"
                            />
                    </FormItem>
                    <button class="button" type="button" @click="handleSubmit('formInline')" :loading="modalLoading">登录</button>
                    <div class="other">
                        <router-link to="/cover" class="return">
                            返回上一级
                        </router-link>
                        <router-link to="/password-reset" class="forget">忘记密码？</router-link>
                    </div>
                </Form>
                </TabPane>
                <TabPane label="注册" name="name2">
                    <comRegister></comRegister>
                </TabPane>
            </Tabs>
            </div>
        </div>
    </div>
</template>
<script src="./login.js"></script>
<style lang="scss" scoped src="./login.scss" />
<style lang="scss" scoped src="@/common/styles/reset.scss" />
