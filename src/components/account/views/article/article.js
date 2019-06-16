import Markdown from '@/common/components/markdown.vue';
import upData from '../home.js'
export default {
    components: {
        Markdown,
    },
    data() {
        return {
            isCollapsed: false,
            createTitle: "",
            createSummary: "",
            createTime: "",
            createDetail: "",
            nowTime: "",
        }
    },
    computed: {
        rotateIcon() {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses() {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    mounted() {
        this.nowTimes();
    },
    methods: {
        //文章发布时间
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
            let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
            let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
            let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
            return this.nowTime = year + "-" + month + "-" + date + " " + " " + hh + ":" + mm;
        },
        // 定时器函数
        nowTimes() {
            this.timeFormate(new Date());
            setInterval(this.nowTimes, 30 * 1000);
        },
        publish() {
            // console.log(localStorage.uid);
            const params = {
                detail: this.createDetail,
                title: this.createTitle,
                summary: this.createSummary,
                time: this.nowTime,
                uid: localStorage.uid,
            };
            this.axios.post("http://127.0.0.1:3000/article", params).then((res) => {
                if (res.data === "success") {
                    this.$Message.success("发布成功");
                    this.$router.push({
                        path: "/home",
                        // function() {
                        //     upData.methods.getArticleList();
                        // }
                    })

                } else if (res.data === "fail") {
                    this.$Message.error("文章标题、简介、详情不能为空");
                }
            })
        }
    }
}