import '@load/bootstrap';
import { echarts } from '@load/echart';
import config from '@src/config';
import { opts } from './echart.options';
import http from '@src/serve/http';
import { OnInit, InjectionView, Bind } from '@src/serve/webengine';

@InjectionView({ template: require('./index.html'), style: require('./css.less') })
export class Echart implements OnInit, Bind {
    private echart: any = echarts.init(document.getElementById('chart'));
    private setting: any = opts;
    private timer: any;
    constructor() {
        this.echart.setOption(this.setting);
    }

    bind(): void {

        $(window).on('resize.echart', () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.echart.resize();
            }, 500)
        })
    }


    onInit(): void {

    }
}




