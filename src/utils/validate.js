export function validatePhone(rule, value, callback) {
    if (value === '') {
        callback();
    } else {
        const reg = new RegExp('^[1]{1}[0-9]{10}$');
        if (!reg.test(value)) {
            callback(new Error('您的手机号码有误，请重新输入'));
        } else {
            callback();
        }
    }
}
export function validateName(rule, value, callback) {
    if (value === '') {
        callback('请填写真实姓名');
    } else {
        const reg = new RegExp('^[\u4e00-\u9fa5a-zA-Z]{0,20}$');
        if (!reg.test(value)) {
            callback(new Error('请输入汉字、字母不能包含数字或特殊字符'));
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
