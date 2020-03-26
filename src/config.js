import {extend} from 'umi-request';


const config = {}
config.getRemoteUrl = () => 'http://127.0.0.1:8080/';
config.getRemoteUploadUrl = () => 'http://127.0.0.1:8080/common/upload';
config.getAuthorization = () => {
    return localStorage.getItem('jwt')
}
config.getRequest = () => {
    const request = extend({
        // 默认错误处理
        credentials: 'same-origin', // 默认请求是否带上cookie
        prefix: config.getRemoteUrl()
    })
    request.interceptors.request.use((url, options) => {
        const optionsNew = {...options};
        optionsNew.headers.Authorization = config.getAuthorization();
        return {url, option: optionsNew}
    })
    return request;
}


export default config