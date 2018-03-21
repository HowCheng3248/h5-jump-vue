import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
let instance = axios.create({
  withCredentials: true,
  // baseURL: HOST,
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

const VUE = new Vue();
Vue.use(VueAxios, instance);
export default Vue