const config = {}
config.getRemoteUploadUrl = () => 'http://127.0.0.1:8080/common/upload';
config.getAuthorization = () => {
    return  localStorage.getItem('jwt')
}
config.dev =  process.env.NODE_ENV === 'development'

if(config.dev) {
    config.getAuthorization = ()=>{
        return 'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==.eyJpc3MiOm51bGwsInN1YiI6IjEiLCJhdWQiOm51bGwsImV4cCI6MTU4NzgyMzc3NTQzNSwiaWF0IjoxNTg1MjMxNzc1NDM1fQ==.lD3HcPx5F5ZB2AqLHCxX7mbQZ+n4YUrl0pWT2j7Irgg='
    }
}
config.devServer =  'http://127.0.0.1:8080/'


export default config
