export function validateNum(rule, value, callback) {
    if (value === '') {
        this.disabled = true;
        callback();
    } else {
        const reg = new RegExp('^[1]{1}[0-9]{10}$');
        if (!reg.test(value)) {
            this.disabled = true;
            callback(new Error('请输入正确格式的手机号码'));
        } else {
            this.disabled = false;
            callback();
        }
    }
}
export function //用户名:5-16位由字母、数字、_或汉字组成
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
}
export function //密码:长度为8-15位包含数字、字母、特殊字符的密码
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
}

export function validateNickname(rule, value, callback) {
    if (value === '') {
        callback();
    } else {
        const reg = new RegExp('^[\u4e00-\u9fa5a-zA-Z0-9~!@#$%^&*.·]{0,100}$');
        if (!reg.test(value)) {
            callback(new Error('请输入汉字、字母、数字不能包含特殊字符'));
        } else {
            callback();
        }
    }
}
export function validateLabel(rule, value, callback) {
    if (value === undefined) {
        callback();
    } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{0,50}$/.test(value)) {
        callback('只能输入文字，字母，数字');
    } else {
        callback();
    }
}