

function ThreeLevelLinkage(options) {
    var defaultOptions = {
        data: [],
        url: ''
    };
    this._cacheData = {
        metadataArray: [], //原数据。
        room1: [],
        room2: [],
        person: {}
    }
    this.opts = $.extend({}, defaultOptions, options || {});
    this.update(this.opts.data);
}

ThreeLevelLinkage.prototype.getCacheData = function () {
    return this._cacheData;
}

ThreeLevelLinkage.prototype.getTwoByOneId = function (id) {
    var than = this;
    var room2 = [];
    $.each(than._cacheData.room2, function (i, v) {
        if (v.pId == id) {
            room2.push(v);
        }
    });
    return room2;
}

ThreeLevelLinkage.prototype.getDepartmentByPersonId = function (doctorId) {
    var obj = { oneId: null, twoId: null };
    var metadata = this._cacheData.metadataArray
    for (var i = 0; i < metadata.length; i++) {
        var tissueZtree = metadata[i];
        var doctorArray = tissueZtree.doctor || [];
        for (var j = 0; j < doctorArray.length; j++) {
            var doctor = doctorArray[j];
            if (doctor.id == doctorId) {
                var level = tissueZtree.level;
                if (level == 2) { // 2级科室
                    obj.oneId = tissueZtree.id
                } else if (level == 3) {// 2 3级科室
                    obj.oneId = tissueZtree.pId;
                    obj.twoId = tissueZtree.id;
                }
                return obj
            }
        }
    }
    return obj;
}

ThreeLevelLinkage.prototype.getPersonByLevelId = function (id) {
    return this._cacheData.person[id] || [];
}

ThreeLevelLinkage.prototype.update = function (data) {
    var room1 = [];
    var room2 = [];
    var person = {};
    $.each(data, function (i, v) {
        var level = v.level;
        if (level == 2) {
            room1.push(v);
        } else if (level == 3) {
            room2.push(v);
        }
        person[v.id] = v.doctor || [];
    })
    this._cacheData.room1 = room1;
    this._cacheData.room2 = room2;
    this._cacheData.person = person;
    this._cacheData.metadataArray = data;
}

// add hover
function HoverEvent(opts) {
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
            if (typeof options.showAddBtn == 'function' && !options.showAddBtn(treeId, treeNode)) {
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
            addDocument.on(click, function (event) {
                event.stopPropagation();
                event.preventDefault();
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
function selectOneFirst(treeObj, expandAll) {
    var nodes = treeObj.getNodes();
    var topNode = nodes[0];
    if (topNode && topNode.children && topNode.children[0]) {
        var first = topNode.children[0];
        if(!expandAll){
            treeObj.expandAll(topNode);
        }
        treeObj.selectNode(first);
        return first;
    } else {
        return false;
    }
}

export default {
    ThreeLevelLinkage: ThreeLevelLinkage,
    HoverEvent: HoverEvent,
    selectOneFirst: selectOneFirst
};
