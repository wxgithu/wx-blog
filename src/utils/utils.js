export default {
    // 根据不同的错误信息类型确认返回的错误信息
    getErrorMsg(data) {
        let errorMessage = '服务异常，请稍后重试';
        if (!data) {
            return errorMessage;
        }
        if (!data.code) {
            errorMessage = data.message || '服务异常，请稍后重试';
            if (errorMessage === 'Network Error') {
                errorMessage = '网络异常，请稍后重试';
            }
        } else if (data.code.toString().indexOf('1009') < 0) {
            errorMessage = data.msg || '服务异常，请稍后重试';
        }
        return errorMessage;
    },
    // 把对象转化成参数
    objToParams(data) {
        let str = '';
        const params = [];
        Object.entries(data).forEach((key) => {
            params.push(`${key[0]}=${key[1]}`);
        });
        str = params.join('&');
        return str;
    },
    // 去掉前后的空格
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    /**
     * 获得字符串实际长度，中文2，英文1 要获得长度的字符串
     */
    getLength(str) {
        let realLength = 0;
        const len = str.length;
        let charCode = -1;
        for (let i = 0; i < len; i += 1) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else { realLength += 2; }
        }
        return realLength;
    },
    // 截取8个字符
    interceptStr(param) {
        if (this.getLength(param) > 10) {
            return param.slice(0, 8).concat('...');
        }
        return param;
    },
    // 把所有换行符替换成br
    replaceNewline(str) {
        return str.replace(/\r\n|\n/g, '<br>').replace(/\s/g, '&nbsp;');
    },
    // 限制输入字符数
    inputSlice(target, key, maxLength, e) {
        const { value } = e.target;
        if (value === undefined) return;
        setTimeout(() => {
            let realLength = 0;
            let index;
            const len = value.length;
            let charCode = -1;
            for (let i = 0; i < len; i += 1) {
                charCode = value.charAt(i);
                if (/[\u4e00-\u9fa5]/.test(charCode)) {
                    realLength += 2;
                } else { realLength += 1; }
                if (realLength > maxLength) {
                    index = i;
                    break;
                }
            }
            Object.assign(target, { [key]: value.slice(0, index) });
        }, 0);
    },
    objToString(obj) {
        let str = '';
        Object.entries(obj).forEach((item) => {
            str += `${item[0]},${item[1]};`;
        });
        return str;
    },
    // 判断是否是空对象
    objIsEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    // 倒计时方法
    timeCountDown(timeLegth, pauseTime) {
        let dayInterval = null;
        const nowTimeStamp = Date.parse(new Date());
        const tenMin = (timeLegth) * 60 * 1000;
        dayInterval = tenMin - (nowTimeStamp - pauseTime);
        return dayInterval;
    },
};

