export default {
    data() {
        return {
            modalLoading: false,
            submitDisabled: false,
            formInline: {
                userName: '',
                password: '',
                phoneNum: '',
            },
            ruleInline: {
                userName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { validator: this.validateName, trigger: 'blur' },
                ],
                phoneNum: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: this.validateNum, trigger: 'blur' },
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
        validateNum(rule, value, callback) {
            if (value === '') {
                callback();
            } else {
                const reg = new RegExp('^[1]{1}[0-9]{10}$');
                if (!reg.test(value)) {
                    callback(new Error('请输入正确格式的手机号码'));
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
                phoneNum: this.formInline.phoneNum,
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
        }
    }
}