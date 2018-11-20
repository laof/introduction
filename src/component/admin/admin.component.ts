import '@load/bootstrap';
import '@load/bootstrap-table';
import '@load/bootPunjap-form';
import '@load/ztree';
import { OnInit, InjectionView, Data, Bind } from '@src/serve/webengine';
import { VoluneerTable } from './voluneer-table';
import { PowerTable } from './power-table';
import { Ztree } from './ztree';

@InjectionView({ template: require('./index.html'), style: require('./css.less') })
export class MapInfo implements OnInit, Data, Bind {
    private mapLoading: any = $('.loading');
    private mapTitle: any = $('.map-title');
    private aeAdminMode: any = $('#ae-admin-modal');
    private aePowerMode: any = $('#ae-power-modal');
    private addPowerMode: any = $('#add-power-modal');
    private adminForm: any;
    private map: any;
    private sign: any;
    private ztree: Ztree;
    private voluneerTable: VoluneerTable;
    private powerTable: PowerTable;
    constructor() {
        new bootPunjap.Search('#keyword', {
            search: (value) => {
                this.search(value);
            }
        })
        this.ztree = new Ztree(this);
        this.voluneerTable = new VoluneerTable(this);
        this.powerTable = new PowerTable(this);
        this.adminForm = new bootPunjap.Form('#ae-admin-form', {
            required: ['usename', 'password', 'name', 'papersOffics', 'fsda'],
            otherFields: ['protocolDesc'],
            isModal: true,
            submitHandler: (data) => {
            }
        })
    }
    data() {
    }
    bind() {
        $('.add-btn').on('click', () => {
            this.showAeAdminMode(true);
        })
        $('.add-power').on('click', () => {
            this.showAddPowerMode();
        })
    }
    showAePowerMode() {
        this.aePowerMode.modal('toggle');
    }
    showAddPowerMode() {
        this.addPowerMode.modal('toggle');
    }
    showAeAdminMode(add = true) {
        let title = '编辑';
        if (add) {
            title = '新增';
        }
        $('#ae-admin-title').html(title + '管理员');
        this.aeAdminMode.modal('toggle');
    }


    search(keyword) {
        this.voluneerTable.update(keyword);
    }

    onInit(): void {

    }
}




