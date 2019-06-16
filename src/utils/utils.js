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
    // 截取60个字符
    interceptStr(param) {
        if (this.getLength(param) > 75) {
            return param.slice(0, 70).concat('...');
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
            Object.assign(target, {
                [key]: value.slice(0, index)
            });
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
    /**
     * 正则表达匹配数据中是否有表情文字，将表情文字转成图片
     * @param data 需要匹配的数据
     * @returns { data:匹配后的数据}
     * @constructor
     */
    MatchEmotion(data) {
        var EmotionList = ['眯眼', '微笑', '撇嘴', '色', '发呆', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶',
            '难过', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗',
            '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '敲打', '再见', '擦汗', '抠鼻', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠',
            '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '拥抱', '月亮', '太阳', '炸弹', '骷髅', '菜刀', '猪头', '西瓜',
            '咖啡', '饭', '爱心', '强', '弱', '握手', '胜利', '抱拳', '勾引', 'OK', 'NO', '玫瑰', '凋谢', '示爱', '爱情', '飞吻'
        ];

        //获取由所有双中括号的汉语组成的数组
        var EmoticonChineseArray = data.match(/\[\[.*?\]\]/g); //如果匹配到返回数据，匹配不到返回null,如[ '[[微笑]]','[[撇嘴]]' ]。因为es6不支持断言，只能处理成这样
        // 将数组中的各项，替换为<img src='1.gif'>
        if (EmoticonChineseArray) {
            EmoticonChineseArray.forEach(function(Item) {
                Item = Item.replace(/\[|\]/g, ''); // 将字符串中的项如 '[[微笑]]'，替换为'微笑'
                data = data.replace(/\[\[.*?\]\]/, '<img style="vertical-align:bottom" src="http://127.0.0.1:3000/images/emoji/' + EmotionList.indexOf(Item) + '.gif">'); //将'微笑'替换为<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif">
            });
        }
        return data;
    },
};