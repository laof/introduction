
const route: any = [
    {
        name: 'debug',
        component: (resolve: any) => require(['@serve/debug/debug.ts'], resolve)
    },
    {
        name: 'home', // 地图信息
        component: (resolve: any) => require(['@component/home/home.component.ts'], resolve)
    }
]

function componentBootstrap() {
    const routes: any = {};
    route.forEach((v) => {
        routes[v.name] = (fn = () => { }) => {
            v.component(fn);
        }
    })
    return routes
}

export default componentBootstrap();