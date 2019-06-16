import { validateNum, validateName, validatePassword } from '@/utils/validate';
export default {
    inject: ["reload"],
    data() {
        return {
            modalLoading: false,
            disabled: true,
            code: '',
            vertifyCode: "",
            register: false,
            formInline: {
                userName: '',
                password: '',
                phoneNum: '',
            },
            ruleInline: {
                userName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' },
                ],
                phoneNum: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: validateNum, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' },
                ],
            },
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.name == 'login') {
                this.$router.push({
                    name: 'login',
                    params: { id: name1 }
                })
            }
        }
    },
    methods: {

        //短信验证码
        getCode() {
            this.axios.get("http://127.0.0.1:3000/users/code", { params: { phone: this.formInline.phoneNum, } }).then((res) => {
                this.vertifyCode = res.data;
                // console.log(this.vertifyCode);
            }).catch(function(err) {
                console.log(err);
            })
        },

        handleSubmit(name) {
            this.modalLoading = true;
            const params = {
                name: this.formInline.userName,
                phone: this.formInline.phoneNum,
                password: this.formInline.password,
                code: this.code,
                vertifyCode: this.vertifyCode,
            };
            // console.log(params.vertifyCode);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modalLoading = false;
                    this.axios.post("http://127.0.0.1:3000/users/register", params).then((res) => {
                        // console.log(res);
                        if (res.data == "please input code") {
                            this.$Message.error('请输入验证码');
                        }
                        if (res.data == "nickname occupied") {
                            this.$Message.warning('昵称已被占用');
                        }
                        if (res.data == "code error") {
                            this.$Message.error('验证码不正确');
                        }
                        if (res.data == "ok") {
                            this.$Message.success('注册成功,请登录!');
                            //注册成功跳转到登陆页
                            this.$router.push({
                                path: "/login/name1",
                            });
                            this.reload();
                        }
                    })
                } else {
                    this.modalLoading = false;
                }
            });
        }
    }
}