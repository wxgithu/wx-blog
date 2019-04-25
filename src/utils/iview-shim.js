import Vue from 'vue';
import iView from 'iview';

export default function () {
    const components = Object.keys(iView).filter(key => /^[A-Z]/.test(key));
    components.forEach((key) => {
        const component = Vue.component(key);
        if (component) {
            Vue.component(`I${key}`, component);
        }
    });
}
