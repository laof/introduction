import { mock, Random } from 'mockjs';
import http from '../serve/http';
import config from '../config/index';

/** 
 * 示例代码
 * http://mockjs.com/examples.html
 * 
 * 文档
 * https://github.com/nuysoft/Mock/wiki
 * 
 */

function set(str, ...opts) {
    return mock(config.origin + str, ...opts);
}

set(http.testMock, request => {
    return mock({
        code: 200,
        message: '@csentence(6,20)',
        'data|5-10': [
            {
                uuid: m => bootPunjap.uuid(),
                id: '@id',
                meony: '@float(60, 100)',
                date: '@datetime',
                name: '@cname',
                text: '@csentence',
                remack: '@cparagraph',
                county: '@county(true)',
            }
        ]
    });
})

set(http.areateList, request => {
    return mock({
        code: 200,
        message: '@csentence(6,20)',
        'data|50': [
            {
                id: '@id',
                color: '@boolean',
                name: '@cname(5,30)',
                phone: '@string("number", 11)',
                remack: '@cparagraph'
            }
        ]
    });
})

set(http.area, request => {
    return mock({
        'data|50': [
            {
                value: '@id',
                name: '@city'
            }
        ]
    }).data;
})
set(http.ztree, request => {
    return [{ "id": "1", "pId": "", "name": "广东省", "hierarchy": "1" }, { "id": "10414", "pId": "9092", "name": "雷州市", "hierarchy": "3" }, { "id": "10933", "pId": "9092", "name": "吴川市", "hierarchy": "3" }, { "id": "11145", "pId": "1", "name": "茂名市", "hierarchy": "2" }, { "id": "11147", "pId": "11145", "name": "茂南区", "hierarchy": "3" }, { "id": "11380", "pId": "11145", "name": "电白区", "hierarchy": "3" }, { "id": "11839", "pId": "11145", "name": "高州市", "hierarchy": "3" }, { "id": "12362", "pId": "11145", "name": "化州市", "hierarchy": "3" }, { "id": "12767", "pId": "11145", "name": "信宜市", "hierarchy": "3" }, { "id": "13189", "pId": "1", "name": "肇庆市", "hierarchy": "2" }, { "id": "13191", "pId": "13189", "name": "端州区", "hierarchy": "3" }, { "id": "13256", "pId": "13189", "name": "鼎湖区", "hierarchy": "3" }, { "id": "13345", "pId": "13189", "name": "高要区", "hierarchy": "3" }, { "id": "13715", "pId": "13189", "name": "广宁县", "hierarchy": "3" }, { "id": "1378", "pId": "2", "name": "黄埔区", "hierarchy": "3" }, { "id": "13909", "pId": "13189", "name": "怀集县", "hierarchy": "3" }, { "id": "14254", "pId": "13189", "name": "封开县", "hierarchy": "3" }, { "id": "14470", "pId": "13189", "name": "德庆县", "hierarchy": "3" }, { "id": "14677", "pId": "13189", "name": "四会市", "hierarchy": "3" }, { "id": "14855", "pId": "1", "name": "惠州市", "hierarchy": "2" }, { "id": "14857", "pId": "14855", "name": "惠城区", "hierarchy": "3" }, { "id": "15148", "pId": "14855", "name": "惠阳区", "hierarchy": "3" }, { "id": "1521", "pId": "2", "name": "番禺区", "hierarchy": "3" }, { "id": "15329", "pId": "14855", "name": "博罗县", "hierarchy": "3" }, { "id": "15729", "pId": "14855", "name": "惠东县", "hierarchy": "3" }, { "id": "16043", "pId": "14855", "name": "龙门县", "hierarchy": "3" }, { "id": "16240", "pId": "1", "name": "梅州市", "hierarchy": "2" }, { "id": "16242", "pId": "16240", "name": "梅江区", "hierarchy": "3" }, { "id": "16376", "pId": "16240", "name": "梅县区", "hierarchy": "3" }, { "id": "16787", "pId": "16240", "name": "大埔县", "hierarchy": "3" }, { "id": "17063", "pId": "16240", "name": "丰顺县", "hierarchy": "3" }, { "id": "17362", "pId": "16240", "name": "五华县", "hierarchy": "3" }, { "id": "17825", "pId": "16240", "name": "平远县", "hierarchy": "3" }, { "id": "17981", "pId": "16240", "name": "蕉岭县", "hierarchy": "3" }, { "id": "1810", "pId": "2", "name": "花都区", "hierarchy": "3" }, { "id": "18102", "pId": "16240", "name": "兴宁市", "hierarchy": "3" }, { "id": "18618", "pId": "1", "name": "汕尾市", "hierarchy": "2" }, { "id": "18620", "pId": "18618", "name": "城区", "hierarchy": "3" }, { "id": "18753", "pId": "18618", "name": "海丰县", "hierarchy": "3" }, { "id": "19054", "pId": "18618", "name": "陆河县", "hierarchy": "3" }, { "id": "19190", "pId": "18618", "name": "陆丰市", "hierarchy": "3" }, { "id": "19579", "pId": "1", "name": "河源市", "hierarchy": "2" }, { "id": "19581", "pId": "19579", "name": "源城区", "hierarchy": "3" }, { "id": "19658", "pId": "19579", "name": "紫金县", "hierarchy": "3" }, { "id": "19977", "pId": "19579", "name": "龙川县", "hierarchy": "3" }, { "id": "2", "pId": "1", "name": "广州市", "hierarchy": "2" }, { "id": "20359", "pId": "19579", "name": "连平县", "hierarchy": "3" }, { "id": "20548", "pId": "19579", "name": "和平县", "hierarchy": "3" }, { "id": "2063", "pId": "2", "name": "南沙区", "hierarchy": "3" }, { "id": "20811", "pId": "19579", "name": "东源县", "hierarchy": "3" }, { "id": "21117", "pId": "1", "name": "阳江市", "hierarchy": "2" }, { "id": "21119", "pId": "21117", "name": "江城区", "hierarchy": "3" }, { "id": "213", "pId": "2", "name": "越秀区", "hierarchy": "3" }, { "id": "21300", "pId": "21117", "name": "阳东区", "hierarchy": "3" }, { "id": "21500", "pId": "21117", "name": "阳西县", "hierarchy": "3" }, { "id": "21662", "pId": "21117", "name": "阳春市", "hierarchy": "3" }, { "id": "22049", "pId": "1", "name": "清远市", "hierarchy": "2" }, { "id": "22051", "pId": "22049", "name": "清城区", "hierarchy": "3" }, { "id": "22217", "pId": "22049", "name": "清新区", "hierarchy": "3" }, { "id": "2240", "pId": "2", "name": "从化区", "hierarchy": "3" }, { "id": "22436", "pId": "22049", "name": "佛冈县", "hierarchy": "3" }, { "id": "22533", "pId": "22049", "name": "阳山县", "hierarchy": "3" }, { "id": "22714", "pId": "22049", "name": "连山壮族瑶族自治县", "hierarchy": "3" }, { "id": "22778", "pId": "22049", "name": "连南瑶族自治县", "hierarchy": "3" }, { "id": "22857", "pId": "22049", "name": "英德市", "hierarchy": "3" }, { "id": "23181", "pId": "22049", "name": "连州市", "hierarchy": "3" }, { "id": "23367", "pId": "1", "name": "东莞市", "hierarchy": "2" }, { "id": "24006", "pId": "1", "name": "中山市", "hierarchy": "2" }, { "id": "24308", "pId": "1", "name": "潮州市", "hierarchy": "2" }, { "id": "24310", "pId": "24308", "name": "湘桥区", "hierarchy": "3" }, { "id": "24499", "pId": "24308", "name": "潮安区", "hierarchy": "3" }, { "id": "24974", "pId": "24308", "name": "饶平县", "hierarchy": "3" }, { "id": "2527", "pId": "2", "name": "增城区", "hierarchy": "3" }, { "id": "25399", "pId": "1", "name": "揭阳市", "hierarchy": "2" }, { "id": "25401", "pId": "25399", "name": "榕城区", "hierarchy": "3" }, { "id": "25614", "pId": "25399", "name": "揭东区", "hierarchy": "3" }, { "id": "25852", "pId": "25399", "name": "揭西县", "hierarchy": "3" }, { "id": "26200", "pId": "25399", "name": "惠来县", "hierarchy": "3" }, { "id": "26547", "pId": "25399", "name": "普宁市", "hierarchy": "3" }, { "id": "27159", "pId": "1", "name": "云浮市", "hierarchy": "2" }, { "id": "27161", "pId": "27159", "name": "云城区", "hierarchy": "3" }, { "id": "27287", "pId": "27159", "name": "云安区", "hierarchy": "3" }, { "id": "27411", "pId": "27159", "name": "新兴县", "hierarchy": "3" }, { "id": "27629", "pId": "27159", "name": "郁南县", "hierarchy": "3" }, { "id": "27853", "pId": "27159", "name": "罗定市", "hierarchy": "3" }, { "id": "2880", "pId": "1", "name": "韶关市", "hierarchy": "2" }, { "id": "2882", "pId": "2880", "name": "武江区", "hierarchy": "3" }, { "id": "29000", "pId": "24006", "name": "中山市", "hierarchy": "3" }, { "id": "29100", "pId": "23367", "name": "东莞市", "hierarchy": "3" }, { "id": "2974", "pId": "2880", "name": "浈江区", "hierarchy": "3" }, { "id": "3096", "pId": "2880", "name": "曲江区", "hierarchy": "3" }, { "id": "3220", "pId": "2880", "name": "始兴县", "hierarchy": "3" }, { "id": "3360", "pId": "2880", "name": "仁化县", "hierarchy": "3" }, { "id": "3497", "pId": "2880", "name": "翁源县", "hierarchy": "3" }, { "id": "3680", "pId": "2880", "name": "乳源瑶族自治县", "hierarchy": "3" }, { "id": "3809", "pId": "2880", "name": "新丰县", "hierarchy": "3" }, { "id": "3974", "pId": "2880", "name": "乐昌市", "hierarchy": "3" }, { "id": "4", "pId": "2", "name": "荔湾区", "hierarchy": "3" }, { "id": "4219", "pId": "2880", "name": "南雄市", "hierarchy": "3" }, { "id": "4472", "pId": "1", "name": "深圳市", "hierarchy": "2" }, { "id": "4474", "pId": "4472", "name": "罗湖区", "hierarchy": "3" }, { "id": "454", "pId": "2", "name": "海珠区", "hierarchy": "3" }, { "id": "4600", "pId": "4472", "name": "福田区", "hierarchy": "3" }, { "id": "4728", "pId": "4472", "name": "南山区", "hierarchy": "3" }, { "id": "4841", "pId": "4472", "name": "宝安区", "hierarchy": "3" }, { "id": "5126", "pId": "4472", "name": "龙岗区", "hierarchy": "3" }, { "id": "5309", "pId": "4472", "name": "盐田区", "hierarchy": "3" }, { "id": "5340", "pId": "1", "name": "珠海市", "hierarchy": "2" }, { "id": "5342", "pId": "5340", "name": "香洲区", "hierarchy": "3" }, { "id": "5519", "pId": "5340", "name": "斗门区", "hierarchy": "3" }, { "id": "5656", "pId": "5340", "name": "金湾区", "hierarchy": "3" }, { "id": "5705", "pId": "1", "name": "汕头市", "hierarchy": "2" }, { "id": "5707", "pId": "5705", "name": "龙湖区", "hierarchy": "3" }, { "id": "5833", "pId": "5705", "name": "金平区", "hierarchy": "3" }, { "id": "6021", "pId": "5705", "name": "濠江区", "hierarchy": "3" }, { "id": "6089", "pId": "5705", "name": "潮阳区", "hierarchy": "3" }, { "id": "6375", "pId": "5705", "name": "潮南区", "hierarchy": "3" }, { "id": "6619", "pId": "5705", "name": "澄海区", "hierarchy": "3" }, { "id": "6815", "pId": "5705", "name": "南澳县", "hierarchy": "3" }, { "id": "6857", "pId": "1", "name": "佛山市", "hierarchy": "2" }, { "id": "6859", "pId": "6857", "name": "禅城区", "hierarchy": "3" }, { "id": "7008", "pId": "6857", "name": "南海区", "hierarchy": "3" }, { "id": "7282", "pId": "6857", "name": "顺德区", "hierarchy": "3" }, { "id": "730", "pId": "2", "name": "天河区", "hierarchy": "3" }, { "id": "7497", "pId": "6857", "name": "三水区", "hierarchy": "3" }, { "id": "7585", "pId": "6857", "name": "高明区", "hierarchy": "3" }, { "id": "7670", "pId": "1", "name": "江门市", "hierarchy": "2" }, { "id": "7672", "pId": "7670", "name": "蓬江区", "hierarchy": "3" }, { "id": "7821", "pId": "7670", "name": "江海区", "hierarchy": "3" }, { "id": "7887", "pId": "7670", "name": "新会区", "hierarchy": "3" }, { "id": "8131", "pId": "7670", "name": "台山市", "hierarchy": "3" }, { "id": "8462", "pId": "7670", "name": "开平市", "hierarchy": "3" }, { "id": "8751", "pId": "7670", "name": "鹤山市", "hierarchy": "3" }, { "id": "8904", "pId": "7670", "name": "恩平市", "hierarchy": "3" }, { "id": "9092", "pId": "1", "name": "湛江市", "hierarchy": "2" }, { "id": "9094", "pId": "9092", "name": "赤坎区", "hierarchy": "3" }, { "id": "9144", "pId": "9092", "name": "霞山区", "hierarchy": "3" }, { "id": "9235", "pId": "9092", "name": "坡头区", "hierarchy": "3" }, { "id": "9314", "pId": "9092", "name": "麻章区", "hierarchy": "3" }, { "id": "9467", "pId": "9092", "name": "遂溪县", "hierarchy": "3" }, { "id": "969", "pId": "2", "name": "白云区", "hierarchy": "3" }, { "id": "9766", "pId": "9092", "name": "徐闻县", "hierarchy": "3" }, { "id": "9992", "pId": "9092", "name": "廉江市", "hierarchy": "3" }]
})

set(http.table, request => {
    return mock({
        code: 200,
        message: '@csentence(6,20)',
        total: 50,
        'data|10': [
            {
                uuid: m => bootPunjap.uuid(),
                id: '@id',
                meony: '@float(60, 100)',
                date: '@datetime',
                name: '@cname',
                obligation: '@csentence',
                phone: '@string("number", 11)',
                username: '@string(7, 10)'
            }
        ]
    });
})