  
import instance from './axios'//引入axios文件
export function getHomeData(data) {
  return instance.get('api/goods/home',data)
}