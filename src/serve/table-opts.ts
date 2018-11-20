export  const tableOpts = {
    dataField: 'data',
    search: false,
    totalField: 'total',
    strictSearch: false,
    method: 'post',                     //请求方式（*）
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    sortable: false,                    //是否启用排序
    sidePagination: 'server',           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                      //初始化加载第一页，默认第一页
    pageSize: 10,                       //每页的记录行数（*）
    pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
    clickToSelect: true,                //是否启用点击选中行
    uniqueId: 'id',                     //每一行的唯一标识，一般为主键列
    cardView: false,                    //是否显示详细视图
    detailView: false,                   //是否显示父子表
}