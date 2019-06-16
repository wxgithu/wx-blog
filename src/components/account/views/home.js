import Head from "./header/header.vue"
import utils from '@/utils/utils';
export default {
    components: {
        Head,
    },
    data() {
        return {
            imgList: [],
            isShow: false,
            articleList: [],
            // test: [],
            count: 0,
            hasMore: true,
            loading: false,
            hasData: true,
            page: {
                current: 1,
                total: 0,
                size: 3,
            },
            userList: [],
        }
    },
    // watch: {
    //     articleList: function(n, o) {
    //         this.test = n;
    //     },
    // },
    mounted() {
        this.getCarousel();
        this.getArticleList();
        this.getUserList();
        window.addEventListener('scroll', this.listScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.listScroll);
        this.articleList = [];
    },

    methods: {
        getCarousel: function() {
            this.axios.get("http://127.0.0.1:3000/carousel").then((res) => {
                this.imgList = res.data;
            })
        },
        getUserList: function() {
            this.axios.get("http://127.0.0.1:3000/users/users").then((res) => {
                this.userList = res.data;
            })
        },
        toDetail: function(id) {
            this.$router.push({ path: `/articleDetail/${id}` })
        },
        getArticleList: function() {
            this.loading = true;
            this.axios.get("http://127.0.0.1:3000/articleList", { params: { current: this.page.current, size: this.page.size } }).then((res) => {
                if (res.data.total > 0) {
                    this.page.total = res.data.total;
                    res.data.data.forEach(element => {
                        const list = element;
                        element.article_date = element.article_date.slice(0, 10);
                        element.summary = utils.interceptStr(element.summary);
                        this.count = element.article_like_count;
                        this.articleList.push(list);
                    });
                    this.hasData = true;
                } else {
                    this.articleList = [];
                    this.hasData = false;
                }
                this.hasMore = this.articleList.length < this.page.total;
            }).catch((err) => {
                this.hasData = false;
            }).finally(() => {
                this.loading = false;
            });
        },
        //无线滚动
        listScroll() {
            if (!this.hasMore || this.loading) return;
            const scrollTop = window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            const listEle = document.getElementById('trainList');
            const listHeight = parseFloat(window.getComputedStyle(listEle, null).height);
            if (listHeight == scrollTop + window.innerHeight) {
                this.page.current = this.page.current + 1;
                this.getArticleList();
            }
        },
        showMenu: function() {
            this.isShow = true;
        },
        addLike: function() {
            this.count++;
        }
    }
}