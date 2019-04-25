<template>
    <div class="markdown">
        <mavon-editor
            ref="md"
            :value="value"
            :autofocus="false"
            :box-shadow="false"
            :subfield="false"
            :editable="canEdit"
            :default-open="openType"
            :toolbars-flag="showToolbar"
            :image-click="imgClick"
            :placeholder="placeholder"
            :toolbars="toolbarsInfo"
            @change="change"
            @imgAdd="imgAdd"
        />
        <i-spin v-if="inUpload" class="upload-spin" size="large" fix />
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mavonEditor } from '@tai-fe/mavon-editor';
import '@tai-fe/mavon-editor/dist/css/index.css';
import utils from '@/utils/utils';
import xss from 'xss';
import api from '../api/common';

@Component({
    props: {
        value: {
            type: String,
            default: '',
        },
        editable: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: '开始编辑...',
        },
        imageWidth: {
            type: Number,
            default: 200,
        },
        toolbarsInfo: {
            type: Object,
            default() {
                return {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                };
            },
        },
    },
    components: {
        mavonEditor,
    },
    watch: {
        description(val) {
            this.$emit('update:value', val);
        },
    },
})

export default class Markdown extends Vue {
    // 是否在上传过程中
    inUpload = false
    imgInput = null

    mounted() {
        this.imgInput = document.querySelector('.v-note-op .op-image input');
        document.querySelector('.markdown .fa-mavon-align-left').setAttribute('title', '居左ctrl+shift+l');
    }

    get canEdit() {
        return this.editable ? !this.inUpload : false;
    }

    // 展示区域
    get openType() {
        return this.editable ? 'edit' : 'preview';
    }

    // 展示工具栏
    get showToolbar() {
        return this.editable;
    }

    change(val) {
        const value = xss(val);
        this.$emit('update:value', value);
    }

    imgAdd(pos, file) {
        const fileName = file.name.replace(/[[\]()+{}&|\\*^%$#@-]/g, '');
        this.imgInput.value = '';
        this.$emit('update:value', this.value.replace(`![${fileName}](${pos})`, ''));
        const size = file.size / (1024 ** 2);
        if (size > 50) {
            return this.$Message.warning('图片大小不能超过50MB');
        }
        const formdata = new FormData();
        const reg = /[!@#$%^&*()（）-]|\s/g;
        if (reg.test(file.name)) {
            return this.$Message.warning('图片名称不能包含特殊字符');
        }
        formdata.append('upload', file);
        this.inUpload = true;
        api.fileUpload(formdata).then((res) => {
            this.inUpload = false;
            const imgStr = `<img src="${res.data.url}" alt="${file.name}" width="${this.imageWidth}">`;
            this.$nextTick(() => {
                this.$emit('update:value', this.value.concat(imgStr));
            });
        }).catch((err) => {
            this.inUpload = false;
            this.$Message.error(utils.getErrorMsg(err));
        });
        return false;
    }

    imgClick() {
        return false;
    }
}
</script>

<style lang="scss">
$placeholder-color: #ccc;
.op-icon.dropdown-wrapper.dropdown .dropdown-images {
    display: none;
}
.markdown {
    position: relative;
    [type=button] {
        -webkit-appearance: none;
    }
    textarea::-webkit-input-placeholder {
        color:$placeholder-color;
    }
    textarea::-moz-placeholder {
        color:$placeholder-color;
    }
    textarea:-ms-input-placeholder {
        color:$placeholder-color;
    }

    .v-note-wrapper {
        z-index: 1000;
    }

    .ivu-spin-fix {
        left: 1px;
        top: 1px;
        height: calc(100% - 2px);
        width: calc(100% - 2px);
        z-index: 1600;
    }
    .v-note-panel {
        min-height: 300px;
    }
}
</style>

