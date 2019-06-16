<template>
    <div class="register">
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
                    placeholder="你的昵称" 
                    v-model="formInline.userName"
                />
            </FormItem>
            <FormItem prop="phoneNum">
                <Input 
                    type="text"
                    name="phoneNum" 
                    class="password" 
                    placeholder="输入手机号" 
                    v-model="formInline.phoneNum"
                    />
            </FormItem>
            <FormItem prop="password">
                <Input 
                    type="password"
                    name="password" 
                    class="password" 
                    placeholder="设置密码" 
                    v-model="formInline.password"
                    />
            </FormItem>
            <input 
                    type="text"
                    class="code" 
                    placeholder="输入验证码" 
                    v-model.lazy="code"
                    id="code"
                >
                </input>
            <button class="vertify" type="button" @click="getCode()" :disabled="!disabled">获取验证码</button>
            <button class="register" type="button" @click="handleSubmit('formInline')" :loading="modalLoading">注册</button>
        </Form>
    </div>
</template>
<style lang="scss" src="./login.scss"></style>
<script src="./register.js"></script>
<style lang="scss" scoped>
    .ivu-form-item{
        margin-bottom:7px;
    }
    .page-container .login-form .register
        {
            background: #42c02e;
        }
        .register{
            .login-form{
                .code{
                width:150px;
                float:left;
                margin-left:20px;
                }
            }
            .vertify{
            width:100px;
            float:right;
            margin-right:18px;
            height:40px;
            background:#42c02e;
        }
        }
</style>