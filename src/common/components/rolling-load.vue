<template>
    <div class="rolling-load">
        <i-spin v-show="hasMore">
            <i-icon :size="18" type="ios-loading" class="demo-spin-icon-load" />
            <div>加载中···</div>
        </i-spin>
        <p v-show="!hasMore" class="load-more">没有更多数据</p>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        hasMore: Boolean,
    },
})

export default class ListToolBar extends Vue {
    mounted() {
        window.addEventListener('scroll', this.listScroll);
    }
    beforeDestroy() {
        window.removeEventListener('scroll', this.listScroll);
    }
    listScroll() {
        if (!this.hasMore) return;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const client = document.documentElement.clientHeight || document.body.clientHeight;
        const scrollBottom = scrollHeight - scrollTop - client;
        if (scrollBottom <= 60) {
            this.$emit('reach-bottom');
        }
    }
}
</script>

<style lang="scss">
.rolling-load{
    height: 60px;
    text-align: center;
    p{
        line-height: 60px;
    }
}
</style>
