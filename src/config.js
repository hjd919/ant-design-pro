// 根据环境切换
let domain
if (process.env.NODE_ENV == 'development') {
    domain = 'http://localhost:7999'
} else {
    domain = 'http://39.106.189.180:7999'
}

export default domain