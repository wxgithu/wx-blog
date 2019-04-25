<template>
    <div class="tool-bar">
        <div class="left">
            <span>{{ info.title }}</span>
            <i-select placeholder="所有类型" clearable @on-change="$emit('type-select', $event)">
                <i-option v-for="item in info.types" :value="item.value" :key="'type' + item.value">
                    {{ item.label }}
                </i-option>
            </i-select>
        </div>
        <div class="right">
            <i-checkbox
                v-if="sdkOnly"
                class="sdk-only"
                @on-change="handleFilterSdk"
            >只展示带有SDK的模型</i-checkbox>
            <i-button v-if="!info.isModel||showCreate" @click="$emit('new-btn-click')">{{ info.btnName }}</i-button>
            <i-select v-if="showSearchField" :placeholder="info.name" clearable @on-change="$emit('search-field', $event) ">
                <i-option v-for="item in info.field" :value="item.value" :key="'type' + item.value">
                    {{ item.name }}
                </i-option>
            </i-select>
            <i-input v-model="search" :placeholder="info.placeholder" search />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';

@Component({
    props: {
        info: Object,
        showSearchField: {
            type: Boolean,
            default: false,
        },
        sdkOnly: {
            type: Boolean,
            default: false,
        },
        showCreate: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        search() {
            this.debouncedSearch();
        },
    },
    computed: {
    },
})

export default class ListToolBar extends Vue {
    search = '';
    created() {
        this.debouncedSearch = debounce(this.onInputChange, 1000);
    }
    onInputChange() {
        this.$emit('input-change', this.search);
    }
    handleFilterSdk(val) {
        this.$emit('toggle-sdk-model', +val);
    }
}
</script>

<style scoped lang="scss">
.tool-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        >span {
            color: #333;
            font-size: 22px;
            font-weight: 700;
            margin-right: 20px;
        }

        >.ivu-select {
            width: 150px;
        }
    }

    .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .sdk-only {
            margin-right: 15px;
        }
        >button {
            background-color: #4584f4;
            font-size: 14px;
            color: white;
            cursor: pointer;
            transition: color .2s ease;
            margin-right: 20px;
            border: none;
        }
        >.ivu-select {
            width:90px;
            margin-right: 5px;
        }
        >div {
            width: 220px;
        }
    }
}
</style>

