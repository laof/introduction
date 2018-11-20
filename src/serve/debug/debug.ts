import { InjectionView, OnInit } from '@serve/webengine';
import config from '@src/config';
import http from '../http';

@InjectionView({
    target: 'debug',
    template: require('./debug.html'),
    style: require('./debug.less')
})
export class DebugComments implements OnInit {
    private cacheApi: string = bootPunjap.getApi();
    constructor() {
        if (config.origin == this.cacheApi) {
            bootPunjap.get(http.testMock).then(data => {
                // console.log(data);
            }).catch(data => {
                console.error('Failure of analog data!');
            })
        }
    }
    onInit() {
        const router = bootPunjap.pageData.router;
        const checkedBool: any = true;
        $('#router a').each(function (i, item) {
            var href = $(this).attr('href');
            if (href.indexOf(router) > 0) {
                $(this).css({
                    color: '#2a8cff'
                });
            } else {
                $(this).css({
                    color: '#9e9e9e'
                })
            }
        });
        $('#api-config').find('input[name=api-config][value="' + this.cacheApi + '"]').attr('checked', checkedBool);
        $('#api-config input').change(function () {
            const api: any = $('input[name=api-config]:checked').val();
            bootPunjap.saveApi(api);
            window.location.reload();
        })
    }
}
