import myAxios from '../axios';
const qs = require('querystring')
const http = myAxios.getAxiosConfig();
const url = {
    homeDataApi: '/api/goods/home', // 商城首页所有数据
}
const productApi = {
    getHomeData(data){
        return http.post(url.homeDataApi, data);
    }
}