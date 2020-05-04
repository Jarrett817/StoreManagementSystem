/**
 * 权限校验
 * 判断是否登录，防止直接跳转
 */
import router from '@/router'
import { getUserInfo} from '@/api/login'
router.beforeEach((to, from, next) => {
    //获取token，
    const token = localStorage.getItem('wjr-msm-token')
    if (!token) {
        if (to.path !== '/login') {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            const userInfo = localStorage.getItem('wjr-msm-user')

            if (userInfo) {
                next()
            } else {
                getUserInfo(token).then(response=>{
                    const resp=response.data
                    if(resp.flag){
                        localStorage.setItem('wjr-msm-user',JSON.stringify(resp.data))
                        next()
                    }else{
                        next({
                            path:'/login'
                        })
                    }
                });
            }
        }
    }
})