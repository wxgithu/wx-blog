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
            user_id: "",
        }
    },
    mounted() {
        this.user_id = window.location.href.split('/')[4];
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.axios.get("http://127.0.0.1:3000/users/usersInfo", { params: { uid: this.user_id } }).then((res) => {
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
            })
        }
    },
}