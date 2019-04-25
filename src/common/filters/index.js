import Vue from 'vue';
import dtf from './dtf';
import intercept from './intercept';

const filters = {
    dtf,
    intercept,
};

Object.keys(filters).forEach((key) => {
    const filter = filters[key];
    if (typeof filter === 'function') {
        Vue.filter(key, filter);
    }
});

export default filters;
