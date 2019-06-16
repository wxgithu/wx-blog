import Head from "../header/header.vue"
import utils from '@/utils/utils'
export default {
    components: {
        Head,
    },
    data() {
        return {
            user: {},
            article: {},
        }
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.axios.get("http://127.0.0.1:3000/users/usersInfo", { params: { uid: localStorage.uid } }).then((res) => {
                // console.log(res);
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
                if (this.article == undefined) return {};
                this.article = res.data.article;
                res.data.article.forEach(element => {
                    element.article_date = element.article_date.slice(0, 10);
                    element.summary = utils.interceptStr(element.summary);
                });
            })
        }
    },
}