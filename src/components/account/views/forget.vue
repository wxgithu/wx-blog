<template>
    <div class="reset">
        <div class="sign">
            <div class="main">
                <h4 class="reset-title">用手机号重置密码</h4>
                <!-- 用手机号重置密码 -->
                <Form 
                    ref="formInline"
                    :model="formInline"
                    :rules="ruleInline"
                    :label-width="0"
                >
                <FormItem class="input-prepend restyle" prop="phoneNum">
                    <div class="overseas">
                    <Input type="text" name="phoneNum" id="other" placeholder="手机号" v-model="formInline.phoneNum" />
                    <a class="overseas-number js-overseas-number">
                        <Icon type="md-phone-portrait" /> <span>+86<Icon type="ios-arrow-down" class="arrow"/></span>
                    </a>
                    </div>
                </FormItem>
                <FormItem class="input-prepend restyle no-radius security-up-code js-security-number">
                    <input type="text" placeholder="短信验证码" v-model.lazy="code">
                    <Icon type="ios-text-outline" />
                    <a class="btn-in-resend js-send-code-button disable" @click="getYzm()">发送验证码</a>
                </FormItem>
                <FormItem class="input-prepend restyle no-radius" prop="password">
                    <Icon type="ios-unlock" />
                    <Input type="password" v-model="formInline.password" placeholder="请输入新密码" />
                </FormItem>
                <FormItem class="input-prepend" prop="second">
                    <Icon type="ios-unlock" />  
                    <Input type="password" v-model="formInline.second" placeholder="请再输入一遍新密码" />
                </FormItem>
                <button type="button" @click="resetPassword('formInline')" class="sign-in-button reset-password-btn">重置密码</button>
                </Form>
                <Icon type="ios-return-left" />
                <router-link class="return" to="/login/name1">返回登录注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { validateNum, validatePassword} from '@/utils/validate';
export default {
    data() {
        return {
            formInline: {
                phoneNum: '',
                password: '',
                second: '',
            },
            vertifyCode:"",
            code:"",
             ruleInline: {
                phoneNum: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: validateNum, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' },
                ],
                second: [
                    { required: true, message: '请再输入一遍密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        //短信验证码
        getYzm() {
            this.axios.get("http://127.0.0.1:3000/users/code", { params: { phone: this.formInline.phoneNum, } }).then((res) => {
                // console.log(this.formInline.phoneNum);
                this.vertifyCode = res.data;
            })
        },
        resetPassword(name) {
            this.modalLoading = true;
            const params = {
                second: this.formInline.second,
                phone: this.formInline.phoneNum,
                password: this.formInline.password,
                code:this.code,
                vertifyCode:this.vertifyCode,
            };
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modalLoading = false;
                    this.axios.post("http://127.0.0.1:3000/users/reset", params).then((res) => {
                        // console.log(res);
                        if(res.data.ok==0){
                            this.$Message.error("两次输入密码不一致");
                        } else if (res.data =="ok"){
                            this.$Message.success("重置成功");
                            this.$router.push({
                                    path: "/login/name1",
                                })
                        } else if (res.data == "fail"){
                            this.$Message.warning("此手机号码未注册");
                        }else if(res.data=="please input code"){
                            this.$Message.warning("请输入验证码");
                        } else if(res.data=="code error"){
                            this.$Message.error("验证码不正确");
                        }
                    })
                } else {
                    this.modalLoading = false;
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped src="./forget.scss"></style>
<style lang="scss" scoped>
#other /deep/{
    input.ivu-input{
        width:200px;
        margin-left:98px;
    }
}
    .ivu-form-item /deep/{
        input.ivu-input{
            width:271px;
            background:#f8f8f9;
            margin-left:26px;
            height:48px;
            outline:none;
            border:none;
        }
        .ivu-input-wrapper{
            height:50px;
            background:rgba(181, 181, 181, 0.1);
            border: 1px solid #c8c8c8;
            border-radius: 5px;
            margin-bottom:20px;
        }
        .ivu-form-item-error-tip{
            padding:0;
            top:79%;
        }
    }
</style>