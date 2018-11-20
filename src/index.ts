import '@load/bootstrap';
import component from './serve/route';
import '../static/style/index.css';
import config from './config/index'
declare global {
    var require: any;
    var lo: any;
}
if (config.debug) {
    component.debug();
}
component[lo.pageData.router]();