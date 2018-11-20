/**
    notEmpty：非空验证；
    stringLength：字符串长度验证；
    regexp：正则表达式验证；
    emailAddress：邮箱地址验证（都不用我们去写邮箱的正则了~~） 除此之外，在文档里面我们看到它总共有46个验证类型，我们抽几个常见的出来看看：
    base64：64位编码验证；
    between：验证输入值必须在某一个范围值以内，比如大于10小于100；
    creditCard：身份证验证；
    date：日期验证；
    ip：IP地址验证；
    numeric：数值验证；
    phone：电话号码验证； /^1\d{10}/
    uri：url验证；
*/

;(function () {

    function getCheckboxValuesByName(fieldsName) {
        var value;
        var checkboxArray = [];
        $.each(this.find('input[name=' + fieldsName + ']:checkbox'), function () {
            if (this.checked) {
                checkboxArray.push($(this).val());
            }
        });
        value = checkboxArray.join();
        return value;
    }

    var inputElement = {
        get: function (fieldsName, input) {
            var type = (input.attr('type') || '').toLocaleLowerCase();
            var value;
            switch (type) {
                case 'text':
                case 'password':
                case 'number':
                case 'email':
                    value = input.val();
                    break;
                case 'radio':
                    value = this.find('input[name=' + fieldsName + ']:checked').val();
                    break;
                case 'checkbox':
                    // var checkboxArray = [];
                    // $.each(this.find('input[name=' + fieldsName + ']:checkbox'), function () {
                    //     if (this.checked) {
                    //         checkboxArray.push($(this).val());
                    //     }
                    // });
                    // if (checkboxArray.length) {
                    //     value = checkboxArray.join();
                    // }
                    value = getCheckboxValuesByName.call(this, fieldsName);
                    break;
                case 'file':
                    value = input.val();
                    break;
                default:
                    value = input.val();
            }
            return value;
        },
        set: function (fieldsName, input, value) {
            var type = (input.attr('type') || '').toLocaleLowerCase();
            switch (type) {
                case 'radio':
                    this.find('input[name=' + fieldsName + '][value=' + value + ']').attr('checked', true);
                    break;
                case 'checkbox':
                    var selectArray = String(value).split(',');
                    if (selectArray.length) {
                        for (var ic = 0; ic < selectArray.length; ic++) {
                            this.find('input[name=' + fieldsName + '][value=' + selectArray[ic] + ']').attr('checked', true);
                        }
                    }
                    break;
                case 'file':
                    input.val();
                    break;
                case 'text':
                case 'password':
                case 'number':
                case 'email':
                default:
                    input.val(value);
            }
        }
    }

    var widget = {
        get(obj) {
            var than = this;
            var temp = {};
            var forEach = function (key) {
                var value;
                var dom = than.find('[name=' + key + ']');
                if (dom.length) {
                    switch (dom[0].tagName.toLocaleLowerCase()) {
                        case 'input':
                            value = inputElement.get.call(than, key, dom);
                            break;
                        case 'select':
                        // var optionsSelected = dom.find('option:selected');
                        // value = optionsSelected.val();
                        case 'textarea':
                            value = dom.val();
                            break;
                    }
                }
                temp[key] = value;
            }
            for (var key in obj.fields) {
                forEach(key);
            }
            for (var i = 0; i < obj.otherFields.length; i++) {
                forEach(obj.otherFields[i]);
            }
            return temp;
        },
        set(obj) {
            var than = this;
            for (var key in obj) {
                var dom = than.find('[name=' + key + ']');
                if (dom.length) {
                    var value = obj[key];
                    switch (dom[0].tagName.toLocaleLowerCase()) {
                        case 'select':
                        case 'textarea':
                            dom.val(value);
                            break;
                        case 'input':
                        default:
                            inputElement.set.call(than, key, dom, value);
                            break;
                    }
                }
            }
        }
    }

    function LoForm(element, opts) {
        if (typeof element == 'string') {
            this.element = $(element);
        } else {
            this.element = element;
        }
        this.bootstrapValidator = null;
        this.options = null;
        var DEFAULTOPTIONS = {
            loCacheData: 'LoCacheData',
            click: 'click.bootPunjap',
            required: [],
            isModal: false,
            cancelReset: true, // 退出弹出时，重置表单。
            modalCancelEvent: 'hide.bs.modal.bootPunjap',
            fields: {},
            otherFields: [], // 补充值字段
            submitHandler: function (valueObject) { },
            hideEvent: function (valueObject) { },
            saveBtn: '.submit-btn',
            resetBtn: '.cancel-btn'
        }
        this.options = $.extend({}, DEFAULTOPTIONS, opts);
        this._init(this.options);
    }

    LoForm.prototype.getCheckboxValuesByName = getCheckboxValuesByName;

    // 获取bootstrapValidator
    LoForm.prototype.getValidatorData = function () {
        return this.element.data('bootstrapValidator');
    }

    LoForm.prototype.disabled = function (arr, disabled) {
        var ele = this.element;
        $.each(arr || [], function (index, key) {
            var dom = ele.find('[name=' + key + ']');
            if (dom.length) {
                dom.attr('disabled', disabled);
            }
        })

    }

    LoForm.prototype.getValuesBySelect = function (arr, disabled) {
        var ele = this.element;
        $.each(arr || [], function (index, key) {
            var dom = ele.find('[name=' + key + ']');
            if (dom.length) {
                dom.attr('disabled', disabled);
            }
        })

    }

    // 设置值
    LoForm.prototype.setValue = function (options) {
        if (options) {
            this.element.data(this.options.loCacheData, $.extend({}, {}, options));
            widget.set.call(this.element, options || {});
        } else {
            this.element.removeData(this.options.loCacheData);
        }
    }
    LoForm.prototype.resetForm = function () {
        var validateForm = this.getValidatorData();
        validateForm.resetForm(true);
    }
    LoForm.prototype.getOldData = function () {
        return this.element.data(this.options.loCacheData);
    }

    LoForm.prototype.submit = function () {
        var options = this.options;
        var ele = this.element;
        var validateForm = this.getValidatorData();
        this.element.bootstrapValidator('validate');
        if (validateForm.isValid()) {
            var values = widget.get.call(ele, options);
            var oldData = ele.data(options.loCacheData);
            var data = $.extend({}, oldData, values);
            options.submitHandler(data);
            // validateForm.resetForm(true);
            // than.setValue();
            return values;
        } else {
            return false;
        }
    }
    LoForm.prototype.cancel = function () {
        const obj = {}
        const list = this.options.otherFields || [];
        $.each(list || [], (i, v) => {
            obj[v] = '';
        })
        if(list.length){
            widget.set.call(this.element, obj);
        }
        this.resetForm();
    }

    // 初始化
    LoForm.prototype._init = function () {
        var than = this;
        var ele = this.element;
        var options = this.options;

        // 必填 快捷配置
        $.each(options.required, function (i, v) {
            if (!options.fields[v]) {
                options.fields[v] = {
                    validators: {
                        notEmpty: {
                            message: '值不能为空，请输入内容'
                        }
                    }
                }
            }
        })

        ele.bootstrapValidator(options);

        var bts;
        if (options.isModal) {
            var modalClasses = 'modal';
            var modal = ele.parents('.' + modalClasses);
            bts = modal.find('.modal-footer');
            modal.off(than.options.modalCancelEvent).on(than.options.modalCancelEvent, function (event) {
                if (options.cancelReset && $(event.target).hasClass(modalClasses)) {
                    than.cancel();
                }
                than.options.hideEvent(than);
            })
        } else {
            bts = ele;
        }

        // 取消事件
        bts.find(options.resetBtn).off(options.click).on(options.click, function () {
            than.cancel();
        })

        // 提交事件
        bts.find(options.saveBtn).off(options.click).on(options.click, function () {
            than.submit();
        })
    }
    bootPunjap.Form = LoForm;

})();