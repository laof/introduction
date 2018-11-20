import '@load/bootstrap';
// import component from './serve/route';
import '@component/home/home.component';

declare global {
    var AMap: any;
    var require: any;
    var bootPunjap: any;
}

// if (config.debug) {
//     if (!bootPunjap.pageData.router) {
//         eval('window.location = "/?router=home"');
//     }
//     if (config.origin == bootPunjap.getApi()) {
//         require('@src/mock/mock');
//     }
//     component.debug();
// }

// component.home();

