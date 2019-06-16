import comRegister from "./register.vue"
import { validateName, validatePassword } from '@/utils/validate';
export default {
    components: {
        comRegister,
    },
    created() {
        var lett = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
                lett.handleSubmit('formInline');
            }
        }
    },
    mounted() {
        this.name = this.$route.params.name;

        function opChange() {
            var e_first = $("#banner img:first");
            var e_last = $("#banner img:last");
            e_first.animate({ "filter": "Alpha(opacity=0)", "opacity": "0" }, function() {
                //第一个图片透明度变为0的时候，将它移动到最后
                e_first.insertAfter(e_last);
                //将最后一个图片的透明度恢复
                e_last.animate({ "filter": "Alpha(opacity=100)", "opacity": "1" });
            });
        }
        $(document).ready(function() {
            //每隔3秒执行一次图片切换函数
            window.setInterval(opChange, 5000);
        })
    },
    data() {
        return {
            name: '',
            uid: '',
            modalLoading: false,
            formInline: {
                userName: '',
                password: '',
            },
            ruleInline: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        onTabChanged(name) {
            if (name === "name1") {
                const state = "http://localhost:8080/login/name2";
                const url = "http://localhost:8080/login/name1";
                history.pushState(state, null, url)
            } else if (name === "name2") {
                const state = "http://localhost:8080/login/name1";
                const url = "http://localhost:8080/login/name2";
                history.pushState(state, null, url)
            }
        },
        handleSubmit(name) {
            this.modalLoading = true;
            const params = {
                name: this.formInline.userName,
                password: this.formInline.password,
            };
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modalLoading = false;
                    this.axios.post("http://127.0.0.1:3000/users/signin", params).then((res) => {
                        this.uid = res.data.uid;
                        if (res.data.ok == 0) {
                            this.$Message.error('用户名或密码不正确');
                        } else if (res.data.ok == 1) {
                            const loginName = JSON.parse(localStorage.getItem("islogin"));
                            if (loginName == null) {
                                this.$Message.success('登录成功');
                                //登录成功跳转到首页
                                this.$router.push({
                                    path: "/home",
                                })
                                localStorage.setItem("islogin", JSON.stringify(this.formInline));
                                localStorage.setItem("uid", this.uid);
                            } else if (loginName.userName == this.formInline.userName) {
                                this.$Message.warning("该用户已登录");
                            }
                        }
                    })
                } else {
                    this.modalLoading = false;
                }
            });
        },
    }
}