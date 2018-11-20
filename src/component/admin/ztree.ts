import http from "@src/serve/http";
import serve from '@load/defind-serve';
export class Ztree {
    private sign: number;
    private master: any;
    private setting: any;
    private ztree: any;
    private selectNodeId: any;
    constructor(master) {
        this.master = master;
        this.setting = {
            id: 'ztree',
            view: {
                showIcon: false,
                addHoverDom: false,
                removeHoverDom: false,
                selectedMulti: false
            },
            edit: {
                enable: true,
                editNameSelectAll: false,
                showRemoveBtn: false,
                showRenameBtn: false,
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: (event, treeId, treeNode) => {

                }
            }
        };
        this.onInit();
        this.dataInit();
    }
    dataInit() {
        bootPunjap.post(http.ztree, {
            sign: 1
        }).then((data) => {
            const zTreefn = $.fn['zTree'];
            this.ztree = zTreefn.init($('#' + this.setting.id), this.setting, data || []);
            const first = serve.selectOneFirst(this.ztree, true);
            const nodes = this.ztree.getNodes();
            if (nodes.length) {
                this.selectNodeId = nodes[0].id;
            }
            // 默认选中第一个
            if (first) {
                // this.list.update(first);
            }
        });
    }

    onInit() {
        this.ztree = $('#' + this.setting.id);
    }
}