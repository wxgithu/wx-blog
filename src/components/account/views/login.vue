<template>
    <div>
        <div class="carousel" id="banner">
            <img src="../images/1.jpg" />
            <img src="../images/2.jpg" />
            <img src="../images/3.jpg" />
            <div class="page-container">
            <Tabs :value="name">
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
                            class="password" 
                            placeholder="请输入密码" 
                            v-model="formInline.password"
                            />
                    </FormItem>
                    <button type="button" @click="handleSubmit('formInline')">登录</button>
                    <h4 class="other">
                        <a>忘记密码？</a>
                    </h4>
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
<style lang="scss" src="@/common/styles/reset.scss" />
<style lang="scss" src="./login.scss" />
