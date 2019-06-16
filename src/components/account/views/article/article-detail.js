import Head from "../header/header.vue"
import showdown from "showdown"
import utils from '@/utils/utils'
import Review from './review.vue'
import reviewList from './review-list'
export default {
    components: {
        Head,
        Review,
        reviewList,
    },
    props: {
        id: String,
    },
    data() {
        return {
            detail: {},
            article_id: "",
            isLogin: false,
            user: {},
        }
    },
    mounted() {
        if (JSON.parse(localStorage.getItem('islogin'))) {
            this.isLogin = true;
        }
        this.getDetail();
        this.article_id = this.id;
        this.getInfo();
    },
    methods: {
        getDetail: function() {
            this.axios.get("http://127.0.0.1:3000/articleDetail", { params: { id: this.id } }).then((res) => {
                if (this.detail == undefined) return {};
                this.detail = res.data[0];
                // console.log(res.data[0]);
                var converter = new showdown.Converter(); //初始化转换器
                if (res.data[0].detail !== undefined) {
                    res.data[0].detail = converter.makeHtml(res.data[0].detail);
                }
            })
        },
        getInfo() {
            this.axios.get("http://127.0.0.1:3000/users/usersInfo", { params: { uid: localStorage.uid } }).then((res) => {
                // console.log(res);
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
            })
        },
        getOtherInfo(id) {
            this.$router.push({ path: `/otherPerson/${id}` })
        }
    }
}