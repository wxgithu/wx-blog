import comRegister from "./register.vue"
export default {
    components: {
        comRegister,
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
            modalLoading: false,
            submitDisabled: false,
            formInline: {
                userName: '',
                password: '',
            },
            ruleInline: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: this.validateName, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: this.validatePassword, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        //用户名:5-16位由字母、数字、_或汉字组成
        validateName(rule, value, callback) {
            if (value === '') {
                callback();
            } else {
                const reg = new RegExp('^[A-Za-z0-9_\u4e00-\u9fa5]{5,16}$');
                if (!reg.test(value)) {
                    callback(new Error('请输入5-16位由字母、数字、_或汉字组成的用户名'));
                } else {
                    callback();
                }
            }
        },
        //密码:长度为8-15位包含数字、字母、特殊字符的密码
        validatePassword(rule, value, callback) {
            if (value === '') {
                callback();
            } else {
                const reg = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*0-9]{8,15}$');
                if (!reg.test(value)) {
                    callback(new Error('请输入8-15位包含数字、字母、特殊字符的密码'));
                } else {
                    callback();
                }
            }
        },
        handleSubmit(name) {
            this.modalLoading = true;
            const params = {
                userName: this.formInline.userName,
                password: this.formInline.password,
            };
            console.log(params);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modalLoading = false;
                    this.$Message.success('登录成功');
                } else {
                    this.modalLoading = false;
                }
            });
        },
    }
}