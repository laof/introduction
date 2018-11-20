
import config from '@src/config';
(function () {
    const apiCache = 'api-config';
    var bootPunjap = {
        version: '0.0.1',
        opts: {
            baseUrl: config.origin,
            debug: false,
            defaultRouter: ''
        },
        pageData: {
            router: '',
            // useId: 'fddsafdasfasddfasd',
            // token: 'fddsafdasfasddfasd'
        }
    };

    bootPunjap.forEach = function (data) {

    }

    if (config.debug) {
        bootPunjap.opts.baseUrl = localStorage.getItem(apiCache);
    }

    bootPunjap.saveApi = function (api) {
        localStorage.setItem(apiCache, api);
        bootPunjap.opts.baseUrl = api;
    }
    bootPunjap.getApi = function () {
        return localStorage.getItem(apiCache);
    }

    function typeString(object) {
        return Object.prototype.toString.call(object).toLowerCase();
    }
    bootPunjap.view = function (config) {
        const target = config.target || 'view';

        document.getElementById(target).innerHTML = config.template || '';

    }
    bootPunjap.isObject = function (obj) {
        return typeString(obj) == 'string';
    }
    bootPunjap.isArray = function (obj) {
        return typeString(obj) == 'array';
    }
    bootPunjap.isFunction = function (obj) {
        return typeString(obj) == 'function';
    }
    bootPunjap.uuid = function () {
        return 'l-yxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    bootPunjap.url = function (api) {
        return bootPunjap.opts.baseUrl + (api || '');
    };
    function getRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest = {};
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        bootPunjap.pageData = $.extend({}, bootPunjap.pageData, theRequest);
        return bootPunjap.pageData;
    };
    getRequest();
    bootPunjap.bootstrap = function (opts) {
        bootPunjap.opts = $.extend({}, bootPunjap.opts, opts);
        var router = bootPunjap.pageData.router || this.opts.defaultRouter;
        bootPunjap.load(router);
    };
    bootPunjap.download = function (api, data, method) {
        var url = bootPunjap.url(api);
        var form = ['<form action="' + url + '" method="' + (method || 'get') + '">'];
        for (var key in data) {
            var value = data[key];
            form.push('<input type="text" name="' + key + '" value="' + value + '"/>');
        }
        form.push('</form>')
        $(form.join('')).appendTo('body').submit().remove();
    };

    bootPunjap.load = function (urlName) {
        var base = 'modular/' + urlName + '/';
        var url = base + 'index.html';
        require(['css!' + base + 'css.less'], function () {
            $('#view').load(url, null, function () {
                require([base + 'js.js'], function () {
                    // console.log(bootPunjap);
                });
            });
        })

    };
    function promise(options) {
        if (!options.data) {
            options.data = {};
        }
        options.data.token = bootPunjap.pageData.token;
        var defaultOptions = {
            beforeSend: function (xhr) { }, // 发送请求前运行的函数。
            complete: function (xhr, status) { }, // 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
            dataFilter: function (data, type) {
                return data || {}
            }, // 用于处理 XMLHttpRequest 原始响应数据的函数。
            dataType: 'json', // 预期的服务器响应的数据类型。
            timeout: 300000, // 设置本地的请求超时时间（以毫秒计）。
            traditional: true // 布尔值，规定是否使用参数序列化的传统样式。
        }
        // new $.Deferred()
        return new Promise(function (resolve, reject) {
            $.ajax($.extend({}, defaultOptions, options, {
                success: function (data) {
                    // if(data && $.isPlainObject(data) && data.code){
                    //     data.success == data.code == 200;
                    // }
                    resolve(data)
                },
                error: function (error) {
                    reject(error)
                }
            }))
        })
    };
    bootPunjap.get = function (url, data) {
        url = bootPunjap.url(url);
        return promise({ type: 'get', url: url, data: data });
    }
    bootPunjap.post = function (url, data) {
        url = bootPunjap.url(url);
        return promise({ type: 'post', url: url, data: data });
    }


    // ------- select -------
    function Select(ele, opts) {
        this.ele = $(ele);
        this._value = null;
        this.options = $.extend({}, {
            change: 'change.event',
            data: [],
            name: 'name',
            value: 'value',
            select: function () { }
        }, opts);
        this.update();
        this._bind();
    }
    Select.prototype.getValue = function () {
        // 默认选中。
        this._value = this.ele.val();
        return this._value;
    };

    Select.prototype.getData = function () {
        var value = this.ele.val();
        for (var i = 0; i < this.options.data.length; i++) {
            var data = this.options.data[i];
            if (value == data[this.options.value]) {
                return data;
            }
        }

        return null;

    };
    Select.prototype._bind = function () {
        var than = this;
        this.ele.on(this.options.change, function () {
            var value = $(this).val();
            than.options.select(than.getData());
        });
    };
    Select.prototype.update = function (array, value) {
        if (array) {
            this.options.data = array;
        }
        var dom = [];
        var options = this.options;
        var arr = this.options.data;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            dom.push('<option value="' + item[options.value] + '" >' + item[options.name] + '</option>');
        }
        this.ele.html(dom.join(''));
        this._value = null;
        this.ele.val(value || '');
    };

    // ------- table -------
    function Table(ele, opt) {
        if (typeof ele == 'string') {
            this.element = $(ele);
        } else {
            this.element = ele;
        }

        this.operateIndex = -1;

        var DEFAULTOPTIONS = {
            btn: '.options-btn',
            btnEvent: 'click.bootPunjap',
            head: [],
            defaultOperateKey: 'operate',
            data: []
        }
        this.options = $.extend({}, DEFAULTOPTIONS, opt);
        this._init();
    }

    Table.prototype._tbody = function () {
        var options = this.options;
        var tbody = [];
        var btn = options.btn.replace('.', '');
        $.each(options.data || [], function (index, item) {
            var td = [];
            $.each(options.head, function (i, v) {
                var key = options.head[i].key;
                if (key == options.defaultOperateKey) {
                    var operateArray = [];
                    $.each(v.buttons || [], function (butIndex, butItem) {
                        var name = butItem.name;
                        var classes = btn + ' ' + (butItem.class || '');
                        operateArray.push('<a href="javascript:;" code="' + butIndex + '" class="' + classes + '">' + name + '</a>');
                    })
                    td.push('<td>' + operateArray.join('') + '</td>');
                } else {
                    td.push('<td>' + item[key] + '</td >');
                }
            })
            tbody.push('<tr data-index="' + index + '" >' + td.join('') + '</tr>');
        })
        return tbody.join('');
    }

    Table.prototype._init = function () {
        var than = this;
        var table = [];
        var head = [];
        var options = this.options;
        $.each(options.head, function (i, v) {
            if (v.key == options.defaultOperateKey) {
                than.operateIndex = i;
            }
            head.push('<th>' + v.name + '</th>');
        });

        table.push('<thead><tr>' + head.join('') + '</tr></thead>');

        table.push('<tbody>');

        table.push(than._tbody());

        table.push('</tbody>');

        this.element.html(table.join(''));

        this._bind();
    }
    Table.prototype._unbind = function () {
        this.element.find(this.options.btn).off(this.options.btnEvent);
    }
    Table.prototype._bind = function () {
        var than = this;
        this.element.find(this.options.btn).on(this.options.btnEvent, function (event) {
            event.preventDefault();
            var buttons = 'buttons';
            var code = Number($(this).attr('code'));
            var i = $(this).parents('tr').attr('data-index');
            var data = than.options.data[i];
            than.options.head[than.operateIndex][buttons][code].click(data);
        });
    }

    Table.prototype.update = function (data) {
        this.options.data = data || [];
        this._unbind();
        var tbody = this._tbody();
        this.element.find('tbody').html(tbody);
        this._bind();
    }

    bootPunjap.Search = function (selector, options) {
        var than = this;
        this.ele = $(selector);
        this.input = this.ele.find('input');
        this.opts = $.extend({}, {
            click: 'click.search',
            btn: '.search-btn',
            search: function () { }
        }, options);

        this.getValue = function () {
            return $.trim(this.input.val());
        }

        this.ele.find(this.opts.btn).off(this.opts.click).on(this.opts.click, function () {
            than.opts.search(than.getValue());
        })
    }

    bootPunjap.Table = Table;
    bootPunjap.Select = Select;
    window.bootPunjap = bootPunjap;
})();