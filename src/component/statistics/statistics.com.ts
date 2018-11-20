
import '@load/bootstrap';
import * as echartsServe from '@static/js/echarts.common.min';


bootPunjap.view({ template: require('./index.html'), style: require('./css.less') })
var echarts: any = echartsServe;

var sign = 1;
// bootstrapDialog.show({
//     size: bootstrapDialog.SIZE_SMALL,
//     type: bootstrapDialog.TYPE_PRIMARY,
//     title: '提示',
//     message: 'The description is shown to screen readers.',
//     closeable: true
// });
var colors = ['#3ba1ff', '#4fcb74', '#fbd438', '#f04864', '#9860e5', '#37cbcb', '#65c3e5', '#89dee1', '#b0e5bc', '#f1a384', '#9c99ef'];
var totalOpts = {
    color: [colors[0]],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    toolbox: {
        show: false
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                rotate: 45
            },
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '签约人群',
            type: 'bar',
            barWidth: '60%',
            // data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
};


var barOption: any = $.extend({}, totalOpts);
barOption.series[0].name = '随访人次';
barOption.color = colors[1];

var barGroupoption = {
    color: colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: []
    },
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: []
};

var totalEchart = echarts.init(document.getElementById('totalEchartDom'));
var barEchart = echarts.init(document.getElementById('barEchartDom'));
var barGroupEchart = echarts.init(document.getElementById('barGroupDom'));
totalEchart.setOption(totalOpts);
barEchart.setOption(barOption);
barGroupEchart.setOption(barGroupoption);
var statusMange = {
    hide: function () {
        $('.tabs').hide();
        statusMange.editBar(false);
    },
    editBar: function (show) {
        if (show) {
            $('.edit-bar').show();
        } else {
            $('.edit-bar').hide();
        }
    },
    doctor: function (add) {
        statusMange.hide();
        $('.add-doctor-item-modal').show();
    },
    showTableList() {
        statusMange.hide();
        $('.list-table-modal').show();
        statusMange.editBar(true);
    },
    addSubobject: function () {
        statusMange.hide();
        $('.add-subject-modal').show();
    },
    addItem: function () {
        var m: any = $('.doctor-mange-add-item-modal'); m.modal('toggle');
    }
}
$('.add-doctor-btn').click(function () {
    statusMange.doctor(true);
})

$('.cancel-btn').click(function () {
    statusMange.showTableList();
})
$('.table-edit-btn').click(function () {
    var status = Number($(this).attr('code'));
    // "1编辑" "2删除" 添加成员" 
    switch (status) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            statusMange.addItem();
            break;
    }
})




function updateAreaEchart() {
    bootPunjap.post('a/medicinedb/region/list', {}, function (data) {
        var xAxisData = [];
        var seriesData = [];
        if (data.code == 200) {
            $.each(data.data || [], function (i, v) {
                xAxisData.push(v.areaName);
                seriesData.push(v.countId);
            })
            barGroupoption.xAxis[0].data = xAxisData;
            barGroupoption.series[0].data = seriesData;
        }
    })
}

function traData(data) {
    var xAxisData = [];
    var seriesData = [];
    $.each(data || [], function (i, v) {
        xAxisData.push(v.name);
        seriesData.push(v.count);
    })
    return {
        xAxis: xAxisData,
        series: seriesData
    }
}

function updateSingBarEchart(index) {
    var url;
    var one = index == 1;
    if (one) {
        url = 'a/medicinedb/contractUser/getUserReport'
    } else {
        url = 'a/medicinedb/healthService/getFollowReport'
    }
    bootPunjap.post(url, { sign: sign }).then(function (resData) {
        if (resData.code == 200) {
            var opts;
            var echartInst;
            if (one) {
                opts = totalOpts;
                echartInst = totalEchart;
            } else {
                opts = barOption;
                echartInst = barEchart;
            }
            var echart1 = $('.echart-' + index);
            var data = traData(resData.data.list);
            opts.xAxis[0].data = data.xAxis;
            opts.series[0].data = data.series;
            echartInst.setOption(opts);
            echart1.find('.total-number').html(resData.data.total);
            echart1.find('.height-total-number').html(resData.data.heightTotal);
        }
    })
}

updateSingBarEchart(1);
updateSingBarEchart(2);


var labelOption = {
    normal: {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: '"left"',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

// --- 
bootPunjap.post('a/medicinedb/community/getAreaHealthReport', { sign: sign }).then(function (resData) {
    var legendData = [];
    var xAxisData = [];
    if (resData.data && resData.data.length) {



        // <div class="statistics-table" id="all-area">
        // <div><span class="ec-label">总随访数：</span><span class="ec-number">人</span></div>

        var allHtml: any = [];

        $.each(resData.count, function (i, v) {
            allHtml.push('<div><span class="ec-label">' + v.areaName + '：</span><span class="ec-number">' + v.totalCount + '人</span></div>')
        })




        $('#all-area').html(allHtml)


        $.each(resData.data, function (i, v) {
            if (i == 0) {
                $.each(v.areaCount || [], function (ii, vv) {
                    xAxisData.push({
                        name: vv.name,
                        type: 'bar',
                        label: labelOption,
                        data: []
                    })
                })
            }
            $.each(v.areaCount || [], function (ii, vv) {
                if (vv.count == undefined) {
                    // debugger;
                }
                xAxisData[ii].data.push(vv.count || vv.hcount);
            })
            legendData.push(v.areaName);
        })

        barGroupoption.legend.data = legendData;
        barGroupoption.xAxis[0].data = legendData;
        barGroupoption.series = xAxisData;
        barGroupEchart.setOption(barGroupoption);
    }
})




var timer;

$(window).on('resize.echart', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        totalEchart.resize();
        barEchart.resize();
        barGroupEchart.resize();
    }, 500)
})



