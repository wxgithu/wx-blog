<template>
    <i-modal
        v-model="modal"
        :closable="false"
        :mask-closable="false"
        footer-hide
        class="service-modal"
    >
        <div class="content">
            <div v-if="title" class="header">
                <span>{{ title }}</span>
                <i-icon type="md-close" size="20" @click="$emit('update:modal', false)" />
            </div>
            <div v-else-if="closable" class="close-header">
                <i-icon type="md-close" size="20" @click="$emit('update:modal', false)" />
            </div>
            <div class="body">
                <slot />
            </div>
            <div v-if="showFooter" class="footer">
                <i-button v-if="showCancel" class="cancel" @click="$emit('update:modal', false)">取消</i-button>
                <i-button class="ok" @click="$emit('on-ok')">确定</i-button>
            </div>
        </div>
    </i-modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        title: {
            type: String,
            default: null,
        },
        modal: {
            type: Boolean,
            default: false,
        },
        showCancel: {
            type: Boolean,
            default: false,
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        closable: {
            type: Boolean,
            default: true,
        },
    },
})

export default class ServiceModal extends Vue {
}

</script>

<style scoped lang="scss">
.content {
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 13px 22px;

        span {
            display: block;
            font-size: 16px;
            color: #333;
            font-weight: normal;
            border-left: 4px solid #368bf2;
            height: 22px;
            line-height: 22px;
            padding-left: 12px;
        }

        .ivu-icon {
            color: #9f9f9f;

            &:hover {
                cursor: pointer;
                color: #828a92;
            }
        }
    }

    .close-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 13px 22px;

        .ivu-icon {
            color: #9f9f9f;

            &:hover {
                cursor: pointer;
                color: #828a92;
            }
        }
    }

    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
    }

    .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-bottom: 50px;

        button.cancel {
            margin-right: 40px;
        }

        button.ok {
            background-color: #368bf2;
            border: none;
            color: white;
            font-size: 14px;
        }
    }
}

</style>

<style lang="scss">
    .service-modal {
        .ivu-modal-body {
            padding: 0;

            .hard-resource {
                .ivu-select-selection {
                    width: 200px;
                    height: 30px;
                }
            }
        }
    }
</style>

