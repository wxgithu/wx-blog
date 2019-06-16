import Head from "../header/header.vue"
import Base from "./base.vue"
import Personal from "./Personal.vue"

export default {
    components: {
        Head,
        Base,
        Personal,
    },
    data() {
        return {
            child1: 'Base',
            child2: 'Personal',
            currentView: 'Base',
            name: "1",

        }
    },

    methods: {
        tabChange(tabItem) {
            this.currentView = tabItem;
        },
        changeName(name) {
            this.name = name;
        },
    },
}