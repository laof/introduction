import http from "@src/serve/http";
import { tableOpts } from "@src/serve/table-opts";

export class PowerTable {
    private sign: number;
    private master: any;
    private settting: any;
    private id: string = 'power-list';
    private listInst: any;
    private params: any = {
        keyword: ''
    };
    constructor(master) {
        this.master = master;
        const obj = {
            url: bootPunjap.url(http.table),    //请求后台的URL（*）
            queryParams: (params) => this.queryParams(params),      //传递参数（*）
            columns: [
                {
                    field: 'name',
                    title: '权限地区'
                },
                {
                    field: 'obligation',
                    title: '备注'
                },
                {
                    align: 'center',
                    title: '操作',
                    events: {
                        'click .dele': (e, value, row, index) => this.delete(row)
                    },
                    formatter: (value, row, index, field) => {
                        return [
                            '<a class="oper-btn dele danger">删除</a>'
                        ].join('');
                    }
                }]
        }
        this.settting = $.extend({}, tableOpts, obj);
        this.onInit();
    }
    delete(data) {
        this.master
    }
    edit(data) {
        this.master.showAeAdminMode(false);
    }
    setting(data) {
        this.master.showAePowerMode();
    }
    queryParams(params) {
        const temp: any = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            pageNo: (params.offset / params.limit) + 1,  //页码
            sign: this.sign
        };
        return temp;
    }

    update(keyword = this.params.keyword) {
        this.params.keyword = keyword;
        this.listInst.bootstrapTable('refresh');
    }

    onInit() {
        this.listInst = $('#' + this.id);
        this.listInst.bootstrapTable(this.settting);
    }
}