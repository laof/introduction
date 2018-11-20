const route: any = [
    {
        name: 'home', // 我的简历
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