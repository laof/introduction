
define(function () {


    function ThreeLevelLinkage (options) {
        var defaultOptions = {
            data: [],
            url:''
        };
        this._cacheData = {
            room1 : [],
            room2 : []
        }
        this.opts = $.extend({}, defaultOptions, options || {});
        this.update(this.opts.data);
    }

    ThreeLevelLinkage.prototype.getCacheData = function (){
        return this._cacheData;
    }

    ThreeLevelLinkage.prototype.getTwoByOneId = function (id){
        var than = this;
        var room2 = [];
        $.each(than._cacheData.room2, function(i,v){
            if(v.pId == id){
                room2.push(v);
            }
        });
        return room2;
    }

    ThreeLevelLinkage.prototype.update = function(data){
        var room1 = [];
        var room2 = [];
        $.each(data, function (i, v) {
            var level = v.level;
            if (level == 2) {
                room1.push(v);
            } else if (level == 3) {
                room2.push(v);
            }
        })
        this._cacheData.room1 = room1;
        this._cacheData.room2 = room2;
    }

    // add hover
    function ZtreeEvent(opts) {
        var options = $.extend({}, {
            showAddBtn: function (treeId, treeNode) {
                return true;
            },
            addClick: function (treeId, treeNode) { },
            editClick: function (treeId, treeNode) { }
        }, opts);
        var event = {
            names: {
                add: 'addBtn_'
            },
            addHoverDom: function (treeId, treeNode) {
                if (typeof options.showAddBtn == 'function' && !options.showAddBtn(treeId, treeNode)){
                    return;
                }
                var sObj = $('#' + treeNode.tId + '_span');
                var click = 'click.ztree';
                var id = {
                    add: event.names.add + treeNode.tId
                };
                if (treeNode.editNameFlag || $('#' + id.add).length > 0) {
                    return;
                }
                var addStr = '<span class="button add" id="' + id.add + '" title="新增" onfocus="this.blur();"></span>';
                sObj.after(addStr);
                var addDocument = $('#' + id.add);
                // 新增
                addDocument.on(click, function () {
                    options.addClick(treeId, treeNode);
                });
            },
            removeHoverDom: function (treeId, treeNode) {
                $('#' + event.names.add + treeNode.tId).unbind().remove();
            }
        }
        this.addHoverDom = event.addHoverDom;
        this.removeHoverDom = event.removeHoverDom;
    };

    // 默认选中节点的第一个子节点
    function selectOneFirst(treeObj){
        var nodes = treeObj.getNodes();
        var topNode = nodes[0];
        if (topNode && topNode.children && topNode.children[0]){
            var first = topNode.children[0];
            treeObj.expandAll(topNode);
            treeObj.selectNode(first);
            return first;
        }else{
            return false;
        }
    }

    return {
        ThreeLevelLinkage:ThreeLevelLinkage,
        HoverEvent:ZtreeEvent,
        selectOneFirst:selectOneFirst
    };
});

