import '@load/bootstrap';
import { echarts } from '@load/echart';
import config from '@src/config';
import http from '@src/serve/http';
import { OnInit, InjectionView, Bind } from '@src/serve/webengine';

@InjectionView({ template: require('./index.html'), style: require('./css.less') })
export class Echart implements OnInit, Bind {

    constructor() {
    }

    bind(): void {


    }


    onInit(): void {

    }
}




