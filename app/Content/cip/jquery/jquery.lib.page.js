(function ($) {

    this.gridLoadText = 'Cargando datos...';
    this.gridRecordText = '{0} - {1} de {2} elementos';
    this.gridEmptyRecords = 'No hay resultados';
    this.gridPageText = 'P\xe1gina: {0} de {1}';
    this.gridRowNum = 10;
    this.gridRowList = [10, 30, 50, 100];

    $.fn.loadPage = function (options) {
        var defaults = {
            datePicker: [],
            numeric: [],
            functions: null,
            dataSource: [],
            mandatory: [],
            buttons: [],
            details: false,
            focus: null
        };
        var options = $.extend(defaults, options);
        var mandatory = [];
        var type = '';
        this.each(function () {
            jQuery.initAjax();

            for (i = 0; i < options.datePicker.length; i++) {
                $('#' + options.datePicker[i]).DatePicker();
            };

            for (i = 0; i < options.numeric.length; i++) {
                type = options.numeric[i].type;
                if (type == 'int') {
                    $('#' + options.numeric[i].name).numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });
                } else if (type == 'dec') {
                    $('#' + options.numeric[i].name).numeric();
                }
            };

            if (typeof HabilitarControles == 'function') { HabilitarControles('G'); }

            for (i = 0; i < options.dataSource.length; i++) {
                if (options.dataSource[i].entity == '') {
                    $('#' + options.dataSource[i].control).DataSource({ Source: '' });
                } else {
                    var control = (options.dataSource[i].control == null) ? '' : options.dataSource[i].control;
                    var entity = (options.dataSource[i].entity == null) ? '' : options.dataSource[i].entity;
                    var valueName = (options.dataSource[i].valueName == null) ? '' : options.dataSource[i].valueName;
                    var displayName = (options.dataSource[i].displayName == null) ? '' : options.dataSource[i].displayName;
                    $(this).listEntity({ control: control, method: entity, valueName: valueName, displayName: displayName });
                }
            };

            $('#btnNuevo').click(function () {
                newRow();
                return false;
            });

            $('#btnBuscar').click(function () {
                searchData();
                return false;
            });

            $('#btnLimpiar').click(function () {
                clearControls('G');
                return false;
            });

            for (i = 0; i < options.mandatory.length; i++) {
                mandatory.push($('#' + options.mandatory[i]));
            };

            if (options.mandatory.length > 0) {
                $(this).Mandatory({ Controls: mandatory });
            };

            if (options.focus != null) {
                $('#' + options.focus).focus();
            }
        });
    };

    $.fn.loadPartial = function (options) {
        var defaults = {
            datePicker: [],
            numeric: [],
            functions: null,
            dataSource: [],
            mandatory: [],
            buttons: [],
            details: false,
            focus: null
        };
        var options = $.extend(defaults, options);
        var mandatory = [];
        var type = '';
        this.each(function () {
            jQuery.initAjax();

            for (i = 0; i < options.datePicker.length; i++) {
                $('#' + options.datePicker[i]).DatePicker();
            };

            for (i = 0; i < options.numeric.length; i++) {
                type = options.numeric[i].type;
                if (type == 'int') {
                    $('#' + options.numeric[i].name).numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });
                } else if (type == 'dec') {
                    $('#' + options.numeric[i].name).numeric();
                }
            };

            if (typeof HabilitarControles == 'function') { HabilitarControles('G'); }

            for (i = 0; i < options.dataSource.length; i++) {
                if (options.dataSource[i].entity == '') {
                    $('#' + options.dataSource[i].control).DataSource({ Source: '' });
                } else {
                    var control = (options.dataSource[i].control == null) ? '' : options.dataSource[i].control;
                    var entity = (options.dataSource[i].entity == null) ? '' : options.dataSource[i].entity;
                    var valueName = (options.dataSource[i].valueName == null) ? '' : options.dataSource[i].valueName;
                    var displayName = (options.dataSource[i].displayName == null) ? '' : options.dataSource[i].displayName;
                    $(this).listEntity({ control: control, method: entity, valueName: valueName, displayName: displayName });
                }
            };

            for (i = 0; i < options.mandatory.length; i++) {
                mandatory.push($('#' + options.mandatory[i]));
            };
            if (options.mandatory.length > 0) {
                $(this).Mandatory({ Controls: mandatory });
            };

            if (options.focus != null) {
                $('#' + options.focus).focus();
            }
        });
    };

    $.fn.initGrid = function (options) {
        var defaults = {
            id: '',
            name: '',
            action: 'G',
            colNames: [],
            colSearch: [],
            colModel: [],
            pager: '#pager',
            height: 270,
            width: 360,
            rowNum: 0,
            page: 0,
            sortName: '',
            sortOrder: 'asc',
            message: null,
            method: '',
            onSelectRow: null,
            footerrow: false,
            userDataOnFooter: false,
            gridComplete: null,
            loadComplete: null,
            content: '.content' 
            
        };
        var options = $.extend(defaults, options);
        var values = '';
        var strID = '';
        //var colNames = [];
        this.each(function () {
            strID = (options.name == '') ? $(this).attr("id") : options.name;
            strID = '#' + strID;
            $(strID).jqGrid(
            {
                datatype: function () {
                    var item = {};
                    for (i = 0; i < options.colSearch.length; i++) {
                        if (options.colSearch[i].type == 'int') {
                            if (options.colSearch[i].value == null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt();
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt({ value: options.colSearch[i].value });
                            };
                        } else if (options.colSearch[i].type == 'string') {
                            item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                        } else if (options.colSearch[i].type == 'bool') {
                            if (options.colSearch[i].control != null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                            };
                        } else if (options.colSearch[i].type == 'val') {
                            item[options.colSearch[i].col] = options.colSearch[i].value;
                        } else if (options.colSearch[i].type == 'boolean') {
                            item[options.colSearch[i].col] = parseInt($('#' + options.colSearch[i].name).valInt());
                        }
                    };

                    // Columns
                    //for (i = 0; i < options.colModel.length; i++) {
                    //    colNames.push(options.colModel[i].name);
                    //}
                    // Paging
                    options.rowNum = !$.isNullOrEmpty($(strID).getGridParam("rowNum")) ? $(strID).getGridParam("rowNum") : options.rowNum;
                    options.page = !$.isNullOrEmpty($(strID).getGridParam("page")) ? $(strID).getGridParam("page") : options.page;
                    options.sortName = !$.isNullOrEmpty($(strID).getGridParam("sortname")) ? $(strID).getGridParam("sortname") : options.sortName;
                    options.sortOrder = !$.isNullOrEmpty($(strID).getGridParam("sortorder")) ? $(strID).getGridParam("sortorder") : options.sortOrder;
                    options.sortOrder = $.isNullOrEmpty(options.sortOrder) ? 'asc' : options.sortOrder;

                    item['iPageSize'] = options.rowNum;
                    item['iCurrentPage'] = options.page;
                    item['vSortColumn'] = options.sortName;
                    item['vSortOrder'] = options.sortOrder;
                    console.log(item);
                    $.ajax(
                    {
                        url: options.method,
                        data: JSON.stringify(item),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        complete: function (jsondata, stat) {
                            if (stat == "success") {
                                jQuery(strID)[0].addJSONData(JSON.parse(jsondata.responseText));
                                $('.ui-pg-input').val(options.page);
                                if ($.isFunction(options.colorRow)) {
                                    options.colorRow();
                                }

                            }
                            else
                                $(this).jqGrid('clearGridData');
                        }
                    });
                },
                jsonReader: {
                    root: "Items",
                    page: "CurrentPage",
                    total: "PageCount",
                    records: "RecordCount",
                    repeatitems: true,
                    cell: "Row",
                    id: options.id,
                    userdata: "userData"
                    //url: "editUrl"
                },
                colNames: options.colNames,
                colModel: options.colModel,
                pager: options.pager,
                loadtext: this.gridLoadText,
                recordtext: this.gridRecordText,
                emptyrecords: this.gridEmptyRecords,
                pgtext: this.gridPageText,
                rownumbers: true,
                rownumWidth: 30,
                rowNum: (options.rowNum == 0) ? this.gridRowNum : options.rowNum,
                rowList: this.gridRowList,// options.message.gridRowList,
                viewrecords: true,
                multiselect: false,
                sortname: options.sortName,
                sortorder: options.sortOrder,
                excel: true,
                width: options.width,//((options.width == 0) ? $(".content").width() : options.width) - 4,
                height: options.height,
                shrinkToFit: false,
                pgbuttons: true,
                onSelectRow: options.onSelectRow,
                footerrow: options.footerrow,
                userDataOnFooter: options.userDataOnFooter,
                gridComplete: options.gridComplete,
                loadComplete: options.loadComplete        
                //cellEdit: true
                //url: editUrl
            });

            jQuery(strID).jqGrid('setFrozenColumns');

            //jQuery(strID).jqGrid('navGrid', options.pager, { add: false, edit: true, del: false, search: false, refresh: true });
            //jQuery(strID).jqGrid('navButtonAdd', options.pager, { caption: " Exportar a Excel ", buttonicon: "ui-icon-bookmark", onClickButton: jQuery.Excel, position: "last" });

            $(options.pager).find(".ui-pg-input").addClass("input-micro");
            $(options.pager).find(".ui-pg-selbox").addClass("select-mini");

            $(window).bind('resize', function () {
                $(strID).setGridWidth($(options.content).width() - 2);
            }).trigger('resize');

        });

    };

    $.fn.initGridEditable = function (options) {
        var defaults = {
            id: '',
            name: '',
            action: 'G',
            colNames: [],
            colSearch: [],
            colModel: [],
            pager: '#pager',
            height: 270,
            width: 360,
            rowNum: 0,
            page: 0,
            sortName: '',
            sortOrder: 'asc',
            message: null,
            method: '',
            onSelectRow: null,
            footerrow: false,
            userDataOnFooter: false,
            gridComplete: null,
            loadComplete: null,
            content: '.content',
            cellEdit:false

        };
        var options = $.extend(defaults, options);
        var values = '';
        var strID = '';
        //var colNames = [];
        this.each(function () {
            strID = (options.name == '') ? $(this).attr("id") : options.name;
            strID = '#' + strID;
            $(strID).jqGrid(
            {
                datatype: function () {
                    var item = {};
                    for (i = 0; i < options.colSearch.length; i++) {
                        if (options.colSearch[i].type == 'int') {
                            if (options.colSearch[i].value == null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt();
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt({ value: options.colSearch[i].value });
                            };
                        } else if (options.colSearch[i].type == 'string') {
                            item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                        } else if (options.colSearch[i].type == 'bool') {
                            if (options.colSearch[i].control != null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                            };
                        } else if (options.colSearch[i].type == 'val') {
                            item[options.colSearch[i].col] = options.colSearch[i].value;
                        } else if (options.colSearch[i].type == 'boolean') {
                            item[options.colSearch[i].col] = parseInt($('#' + options.colSearch[i].name).valInt());
                        }
                    };

                    // Columns
                    //for (i = 0; i < options.colModel.length; i++) {
                    //    colNames.push(options.colModel[i].name);
                    //}
                    // Paging
                    options.rowNum = !$.isNullOrEmpty($(strID).getGridParam("rowNum")) ? $(strID).getGridParam("rowNum") : options.rowNum;
                    options.page = !$.isNullOrEmpty($(strID).getGridParam("page")) ? $(strID).getGridParam("page") : options.page;
                    options.sortName = !$.isNullOrEmpty($(strID).getGridParam("sortname")) ? $(strID).getGridParam("sortname") : options.sortName;
                    options.sortOrder = !$.isNullOrEmpty($(strID).getGridParam("sortorder")) ? $(strID).getGridParam("sortorder") : options.sortOrder;
                    options.sortOrder = $.isNullOrEmpty(options.sortOrder) ? 'asc' : options.sortOrder;

                    item['iPageSize'] = options.rowNum;
                    item['iCurrentPage'] = options.page;
                    item['vSortColumn'] = options.sortName;
                    item['vSortOrder'] = options.sortOrder;
                    console.log(item);
                    $.ajax(
                    {
                        url: options.method,
                        data: JSON.stringify(item),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        complete: function (jsondata, stat) {
                            if (stat == "success") {
                                jQuery(strID)[0].addJSONData(JSON.parse(jsondata.responseText));
                                $('.ui-pg-input').val(options.page);
                                if ($.isFunction(options.colorRow)) {
                                    options.colorRow();
                                }

                            }
                            else
                                $(this).jqGrid('clearGridData');
                        }
                    });
                },
                jsonReader: {
                    root: "Items",
                    page: "CurrentPage",
                    total: "PageCount",
                    records: "RecordCount",
                    repeatitems: true,
                    cell: "Row",
                    id: options.id,
                    userdata: "userData"
                    //url: "editUrl"
                },
                colNames: options.colNames,
                colModel: options.colModel,
                pager: options.pager,
                loadtext: this.gridLoadText,
                recordtext: this.gridRecordText,
                emptyrecords: this.gridEmptyRecords,
                pgtext: this.gridPageText,
                rownumbers: true,
                rownumWidth: 30,
                rowNum: (options.rowNum == 0) ? this.gridRowNum : options.rowNum,
                rowList: this.gridRowList,// options.message.gridRowList,
                viewrecords: true,
                multiselect: false,
                sortname: options.sortName,
                sortorder: options.sortOrder,
                excel: true,
                width: options.width,//((options.width == 0) ? $(".content").width() : options.width) - 4,
                height: options.height,
                shrinkToFit: false,
                cellEdit: options.cellEdit,
                cellsubmit: options.cellsubmit,
                editurl: options.editurl,
                url: options.url,
                pgbuttons: true,
                onSelectRow: options.onSelectRow,
                footerrow: options.footerrow,
                userDataOnFooter: options.userDataOnFooter,
                gridComplete: options.gridComplete,
                loadComplete: options.loadComplete                
                //cellEdit: true
                //url: editUrl
            });

            jQuery(strID).jqGrid('setFrozenColumns');

            jQuery(strID).jqGrid('navGrid', options.pager, { add: false, edit: true, del: false, search: false, refresh: true });
            //jQuery(strID).jqGrid('navButtonAdd', options.pager, { caption: " Exportar a Excel ", buttonicon: "ui-icon-bookmark", onClickButton: jQuery.Excel, position: "last" });

            $(options.pager).find(".ui-pg-input").addClass("input-micro");
            $(options.pager).find(".ui-pg-selbox").addClass("select-mini");

            $(window).bind('resize', function () {
                $(strID).setGridWidth($(options.content).width() - 2);
            }).trigger('resize');

        });

    };

    $.fn.initGridAddRow = function (options) {
        var defaults = {
            id: '',
            name: '',
            action: 'G',
            colNames: [],
            colSearch: [],
            colModel: [],
            pager: '#pager',
            height: 270,
            width: 360,
            rowNum: 10,
            page: 0,
            sortName: '',
            sortOrder: 'asc',
            message: null,
            method: '',
            onSelectRow: null,
            footerrow: false,
            userDataOnFooter: false,
            gridComplete: null,
            loadComplete: null,
            content: '.content',
            subGrid: false,
            subGridRowExpanded: null
        };
        var options = $.extend(defaults, options);
        var values = '';
        var strID = '';
        //var colNames = [];
        this.each(function () {
            strID = (options.name == '') ? $(this).attr("id") : options.name;
            strID = '#' + strID;
            $(strID).jqGrid(
            {
                datatype: function () {
                    var item = {};
                    for (i = 0; i < options.colSearch.length; i++) {
                        if (options.colSearch[i].type == 'int') {
                            if (options.colSearch[i].value == null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt();
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valInt({ value: options.colSearch[i].value });
                            };
                        } else if (options.colSearch[i].type == 'string') {
                            item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                        } else if (options.colSearch[i].type == 'bool') {
                            if (options.colSearch[i].control != null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                            };
                        } else if (options.colSearch[i].type == 'value') {
                            item[options.colSearch[i].col] = options.colSearch[i].value;
                        } else if (options.colSearch[i].type == 'boolean') {
                            item[options.colSearch[i].col] = parseInt($('#' + options.colSearch[i].name).valInt());
                        }
                    };
                    
                    // Columns
                    //for (i = 0; i < options.colModel.length; i++) {
                    //    colNames.push(options.colModel[i].name);
                    //}
                    // Paging
                    options.rowNum = !$.isNullOrEmpty($(strID).getGridParam("rowNum")) ? $(strID).getGridParam("rowNum") : options.rowNum;
                    options.page = !$.isNullOrEmpty($(strID).getGridParam("page")) ? $(strID).getGridParam("page") : options.page;
                    options.sortName = !$.isNullOrEmpty($(strID).getGridParam("sortname")) ? $(strID).getGridParam("sortname") : options.sortName;
                    options.sortOrder = !$.isNullOrEmpty($(strID).getGridParam("sortorder")) ? $(strID).getGridParam("sortorder") : options.sortOrder;
                    options.sortOrder = $.isNullOrEmpty(options.sortOrder) ? 'asc' : options.sortOrder;

                    item['iPageSize'] = options.rowNum;
                    item['iCurrentPage'] = options.page;
                    item['vSortColumn'] = options.sortName;
                    item['vSortOrder'] = options.sortOrder;
                    console.log(item);
                    $.ajax(
                    {
                        url: options.method,
                        data: JSON.stringify(item),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        complete: function (jsondata, stat) {
                            if (stat == "success") {
                                jQuery(strID)[0].addJSONData(JSON.parse(jsondata.responseText));
                                $('.ui-pg-input').val(options.page);
                                if ($.isFunction(options.colorRow)) {
                                    options.colorRow();
                                }

                            }
                            else
                                $(this).jqGrid('clearGridData');
                        }
                    });
                },
                jsonReader: {
                    root: "Items",
                    page: "CurrentPage",
                    total: "PageCount",
                    records: "RecordCount",
                    repeatitems: true,
                    cell: "Row",
                    id: options.id,
                    userdata: "userData"
                },
                url: options.url,
                editurl: options.editurl,
                colNames: options.colNames,
                colModel: options.colModel,
                pager: options.pager,
                loadtext: this.gridLoadText,
                recordtext: this.gridRecordText,
                emptyrecords: this.gridEmptyRecords,
                pgtext: this.gridPageText,
                rownumbers: true,
                rownumWidth: 30,
                rowNum: (options.rowNum == 0) ? this.gridRowNum : options.rowNum,
                rowList: this.gridRowList,// options.message.gridRowList,
                viewrecords: true,
                multiselect: false,
                sortname: options.sortName,
                sortorder: options.sortOrder,
                excel: true,
                width: 500,//((options.width == 0) ? $(".content").width() : options.width) - 4,
                height: options.height,
                shrinkToFit: false,
                pgbuttons: true,
                subGrid: options.subGrid,
                subGridRowExpanded: options.subGridRowExpanded,
                onSelectRow: options.onSelectRow,
                footerrow: options.footerrow,
                userDataOnFooter: options.userDataOnFooter,
                gridComplete: options.gridComplete,
                loadComplete: options.loadComplete
            });

            jQuery(strID).jqGrid('setFrozenColumns');
            
            //jQuery(strID).jqGrid('navGrid', options.pager, { add: false, edit: true, del: false, search: false, refresh: true });
            //jQuery(strID).jqGrid('navButtonAdd', options.pager, { caption: " Exportar a Excel ", buttonicon: "ui-icon-bookmark", onClickButton: jQuery.Excel, position: "last" });

            $(options.pager).find(".ui-pg-input").addClass("input-micro");
            $(options.pager).find(".ui-pg-selbox").addClass("select-mini");

            $(window).bind('resize', function () {
                $(strID).setGridWidth($(options.content).width() - 2);
            }).trigger('resize');

        });

    };

    $.fn.reloadGrid = function (options) {
        var defaults = {
            action: 'G',
            colSearch: []
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        this.each(function () {
            $(this).trigger('reloadGrid');
        });
    };

    $.fn.initTable = function (options) {
        var defaults = {
            id: '',
            control: '',
            method: '',
            paging: false,
            sortName: '',
            colSearch: [],
            colNames: [],
            colModel: [],
            colActions: [],
            height: 100,
            width: 1024,
            success: null
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        this.each(function () {
            for (i = 0; i < options.colSearch.length; i++) {
                if (options.colSearch[i].type == 'int') {
                    columns.push($('#' + options.colSearch[i].name).valInt());
                }
                if (options.colSearch[i].type == 'string') {
                    columns.push($('#' + options.colSearch[i].name).valStr());
                }
                if (options.colSearch[i].type == 'bool') {
                    if (options.colSearch[i].control != null) {
                        columns.push($('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '');
                    } else {
                        columns.push($('#' + options.colSearch[i].name).valStr());
                    };
                }
            };
            values = $(this).Cadena({ Values: columns });
            $.ajax({
                url: $(this).Service({ Method: options.method }),
                data: $(this).Parameters({ values: values, paging: options.paging, sortName: options.sortName }),
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (resultado) {
                    if (resultado.d != '') {
                        if (options.control == '') {
                            $(this).Table({
                                id: options.id,
                                data: resultado.d,
                                colNames: options.colNames,
                                colModel: options.colModel,
                                colActions: options.colActions,
                                height: options.height,
                                width: options.width,
                                zebra: true,
                                footer: false
                            });
                        } else {
                            $("#" + options.control).Table({
                                id: options.id,
                                control: options.control,
                                data: resultado.d,
                                colNames: options.colNames,
                                colModel: options.colModel,
                                colActions: options.colActions,
                                height: options.height,
                                width: options.width,
                                zebra: true,
                                footer: false
                            });
                        }
                    } else {
                        $("#" + options.control).Table({
                            id: options.id,
                            control: options.control,
                            data: resultado.d,
                            colNames: options.colNames,
                            colModel: options.colModel,
                            colActions: options.colActions,
                            height: options.height,
                            width: options.width,
                            zebra: true,
                            footer: false
                        });
                    }
                    options.success(resultado)
                },
                error: function (xhr, status, error) {
                    $("#Message").Message({ Message: error, Icon: 'Error' });
                }
            });
        });
    };

    $.fn.saveData = function (options) {
        var defaults = {
            action: '',
            type: 'Guardar',
            colModel: [],
            message: null,
            userId: window.parent.Usuario(),
            page: '',
            method: ''
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        var message = '';
        var intCodigo = 0;
        var control = null;
        this.each(function () {
            for (i = 0; i < options.colModel.length; i++) {
                if (options.colModel[i].type == 'int') {
                    columns.push($('#' + options.colModel[i].name).valInt());
                } else if (options.colModel[i].type == 'string') {
                    columns.push($('#' + options.colModel[i].name).valEncode());
                } else if (options.colModel[i].type == 'bool') {
                    columns.push($('#' + options.colModel[i].name).is(':checked') ? 1 : 0);
                } else if (options.colModel[i].type == 'val') {
                    columns.push(options.colModel[i].value);
                }
                if (options.colModel[i].id == true) {
                    intCodigo = $('#' + options.colModel[i].name).valInt();
                    control = $('#' + options.colModel[i].name);
                };
            };
            columns.push(window.parent.Usuario());
            values = $(this).Cadena({ Values: columns });

            message = (intCodigo == 0) ? options.message.saveData : options.message.updateData;
            options.action = (options.action == '') ? ((intCodigo == 0) ? 'C' : 'U') : options.action;


            $("#Message").Confirm({
                title: options.message.confirmData,
                message: message,
                icon: 'Question',
                action: options.type,
                result: function (r) {
                    if (!r) return false;
                    $.ajax({
                        url: $(this).Service({ Method: options.method }),
                        data: $(this).Parameters({ values: values }),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (resultado) {
                            if (resultado.d != '') {
                                control.val('');
                                if (options.type == 'Guardar') {
                                    HabilitarControles('G');
                                    BuscarDatos();
                                } else {
                                    HabilitarControlesDet('R');
                                    VerListadoRegistroGes();
                                };
                                if (intCodigo == 0) {
                                    message = options.message.saveResponse;
                                } else {
                                    message = options.message.updateResponse;
                                };
                                $("#Message").Message({ Message: message, Icon: 'Info' });
                            } else {
                                strMensaje = options.message.saveError;
                                $("#Message").Message({ Message: message, Icon: 'Error' });
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#Message").Message({ Message: error, Icon: 'Error' });
                        }
                    });
                }
            });
        });
    };

    $.fn.saveRecord = function (options) {
        var defaults = {
            action: '',
            colModel: [],
            message: null,
            page: '',
            method: '',
            success: null
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        var message = '';
        var intCodigo = 0;
        var control = null;
        var estado = false;
        this.each(function () {
            for (i = 0; i < options.colModel.length; i++) {
                if (options.colModel[i].type == 'int') {
                    columns.push($('#' + options.colModel[i].name).valInt());
                } else if (options.colModel[i].type == 'string') {
                    columns.push($('#' + options.colModel[i].name).valEncode());
                } else if (options.colModel[i].type == 'bool') {
                    columns.push($('#' + options.colModel[i].name).is(':checked') ? 1 : 0);
                } else if (options.colModel[i].type == 'val') {
                    columns.push(options.colModel[i].value);
                }
                if (options.colModel[i].id == true) {
                    intCodigo = $('#' + options.colModel[i].name).valInt();
                    control = $('#' + options.colModel[i].name);
                };
            };
            columns.push(window.parent.Usuario());
            values = $(this).Cadena({ Values: columns });

            message = (intCodigo == 0) ? options.message.saveData : options.message.updateData;
            options.action = (options.action == '') ? ((intCodigo == 0) ? 'C' : 'U') : options.action;

            $("#Message").Confirm({
                title: options.message.confirmData,
                message: message,
                icon: 'Question',
                result: function (r) {
                    if (!r) return false;
                    $.ajax({
                        url: $(this).Service({ Method: options.method }),
                        data: $(this).Parameters({ values: values }),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (resultado) {
                            if (resultado.d != '') {
                                options.success(resultado);
                                if (intCodigo == 0) {
                                    message = options.message.saveResponse;
                                } else {
                                    message = options.message.updateResponse;
                                };
                                $("#Message").Message({ Message: message, Icon: 'Info' });
                            } else {
                                strMensaje = options.message.saveError;
                                $("#Message").Message({ Message: message, Icon: 'Error' });
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#Message").Message({ Message: error, Icon: 'Error' });
                        }
                    });
                }
            });
        });
    };

    $.fn.saveAction = function (options) {
        var defaults = {
            action: '',
            colModel: [],
            ColData: [],
            title: 'Guardar Datos',
            message: '',
            error: 'Ocurrio un error en la aplicaci�n',
            page: '',
            method: '',
            success: null
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        var intCodigo = 0;
        var control = null;
        var estado = false;
        var item = {};
        this.each(function () {
            for (i = 0; i < options.colModel.length; i++) {
                if (options.colModel[i].type == 'int') {
                    item[options.colModel[i].col] = $('#' + options.colModel[i].name).valInt();
                } else if (options.colModel[i].type == 'string') {
                    item[options.colModel[i].col] = $('#' + options.colModel[i].name).valStr();
                } else if (options.colModel[i].type == 'bool') {
                    item[options.colModel[i].col] = $('#' + options.colModel[i].name).is(':checked') ? 1 : $('#' + options.colModel[i].control).is(':checked') ? 0 : '';
                } else if (options.colModel[i].type == 'val') {
                    item[options.colModel[i].col] = options.colModel[i].value;
                } else if (options.colModel[i].type == 'float') {
                    item[options.colModel[i].col] = parseFloat($('#' + options.colModel[i].name).val());
                } if (options.colModel[i].type == 'boolean') {
                    item[options.colModel[i].col] = parseInt($('#' + options.colModel[i].name).valInt());
                }
            };
            if ($.isEmptyObject(item)) {
                item = options.ColData;
            }
            $("#Message").Confirm({
                title: options.title,
                message: options.message,
                icon: 'Question',
                result: function (r) {
                    if (!r) return false;
                    $.ajax({
                        url: options.method,
                        data: JSON.stringify(item),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (resultado) {
                            if (resultado.iEstado >= 1) {
                                options.success(resultado);
                            } else {
                                strMensaje = options.message.saveError;
                                $("#Message").Message({ Message: options.error, Icon: 'Error' });
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#Message").Message({ Message: error, Icon: 'Error' });
                        }
                    });
                }
            });
        });
    };

    $.fn.saveRecordXML = function (options) {
        var defaults = {
            action: '',
            type: 'GuardarDet',
            colModel: [],
            message: null,
            userId: window.parent.Usuario(),
            state: false,
            page: '',
            method: '',
            functions: []
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        var message = '';
        var intCodigo = 0;
        var control = null;
        this.each(function () {
            for (i = 0; i < options.colModel.length; i++) {
                if (options.colModel[i].type == 'int') {
                    columns.push($('#' + options.colModel[i].name).valInt());
                } else if (options.colModel[i].type == 'string') {
                    columns.push($('#' + options.colModel[i].name).valEncode());
                } else if (options.colModel[i].type == 'bool') {
                    columns.push($('#' + options.colModel[i].name).is(':checked') ? 1 : 0);
                } else if (options.colModel[i].type == 'val') {
                    columns.push(options.colModel[i].value);
                }
                if (options.colModel[i].id == true) {
                    intCodigo = $('#' + options.colModel[i].name).valInt();
                    control = $('#' + options.colModel[i].name);
                };
            };
            columns.push(window.parent.Usuario());
            columns.push(window.parent.Id());
            values = $(this).Cadena({ Values: columns });

            message = (intCodigo == 0) ? options.message.saveData : options.message.updateData;
            options.action = (options.action == '') ? ((intCodigo == 0) ? 'C' : 'U') : options.action;

            if (!options.state) {
                alert($("#Message").Confirm({ Title: options.message.confirmData, Message: message, Icon: 'Question', Action: options.type })); //confirm(strMensaje)    	
            };
            if (options.state) {
                alert(values);
                $.ajax({
                    url: $(this).Service({ Method: options.method }),
                    data: $(this).Parameters({ values: values }),
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (resultado) {
                        if (resultado.d != '') {
                            if (intCodigo == 0) {
                                message = options.message.saveResponse;
                            } else {
                                message = options.message.updateResponse;
                            };
                            $("#Message").Message({ Message: message, Icon: 'Info' });
                        } else {
                            strMensaje = options.message.saveError;
                            $("#Message").Message({ Message: message, Icon: 'Error' });
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#Message").Message({ Message: error, Icon: 'Error' });
                    }
                });
            } else {
                return false;
            }
        });
    };

    $.fn.viewRecord = function (options) {
        var defaults = {
            id: 0,
            action: '',
            colModel: [],
            method: '',
            paging: true,
            dataGrid: true,
            success: null,
            controls: true
        };
        var options = $.extend(defaults, options);
        var values = '';
        var columns = [];
        var message = '';
        var tagName = '';
        var type = '';
        var control = null;
        var column = "";
        this.each(function () {
            if (options.controls == true) HabilitarControles(options.action);
            columns.push(options.id);
            values = $(this).Cadena({ Values: columns });
            $.ajax({
                url: $(this).Service({ Method: options.method }),
                data: $(this).Parameters({ values: values, paging: options.paging, dataGrid: options.dataGrid }),
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (resultado) {
                    if (resultado.d != '') {
                        for (i = 0; i < options.colModel.length; i++) {
                            if ($('#' + options.colModel[i].name).exists()) {
                                control = $('#' + options.colModel[i].name);
                                tagName = control.get(0).tagName.toLowerCase();
                                column = options.colModel[i].col;
                                if (tagName == 'input') {
                                    type = control.attr('type');
                                    if (type == 'text') { control.val(resultado.d[0][column]); };
                                    if (type == 'hidden') { control.val(resultado.d[0][column]); };
                                    if (type == 'checkbox') { control.attr('checked', ((resultado.d[0][column] == 1 || resultado.d[0][column] == 'True') ? true : false)); };
                                };
                                if (tagName == 'select') { control.val(resultado.d[0][column]); };
                                if (tagName == 'textarea') { control.val(resultado.d[0][column]); };
                                if (tagName == 'span') { control.html(resultado.d[0][column]); };
                            };
                        };
                        if (options.success != null) {
                            options.success(resultado);
                        };
                    };
                },
                error: function (xhr, status, error) {
                    $("#Message").Message({ Message: error, Icon: 'Error' });
                }
            });
        });
    };

    $.fn.deleteRecord = function (options) {
        var defaults = {
            id: 0,
            num: '',
            action: '',
            message: null,
            method: '',
            success: null,
            result: '',
            error: '',
            colModel: []
        };
        var options = $.extend(defaults, options);
        var message = '';
        var item = {};
        this.each(function () {
            message = options.message.deleteData + options.num + '?';
            if (options.id == 0) {
                for (i = 0; i < options.colModel.length; i++) {
                    if (options.colModel[i].type == 'int') {
                        item[options.colModel[i].col] = $('#' + options.colModel[i].name).valInt();
                    } else if (options.colModel[i].type == 'string') {
                        item[options.colModel[i].col] = $('#' + options.colModel[i].name).valStr();
                    } else if (options.colModel[i].type == 'bool') {
                        item[options.colModel[i].col] = $('#' + options.colModel[i].name).is(':checked') ? 1 : $('#' + options.colModel[i].control).is(':checked') ? 0 : '';
                    } else if (options.colModel[i].type == 'val') {
                        item[options.colModel[i].col] = options.colModel[i].value;
                    } else if (options.colModel[i].type == 'float') {
                        item[options.colModel[i].col] = parseFloat($('#' + options.colModel[i].name).val());
                    } if (options.colModel[i].type == 'boolean') {
                        item[options.colModel[i].col] = parseInt($('#' + options.colModel[i].name).valInt());
                    }
                };
            } else {
                item["id"] = options.id;
            }
            $("#Message").Confirm({
                title: options.title,
                message: options.message,
                icon: 'Question',
                result: function (r) {
                    if (!r) return false;
                    $.ajax({
                        url: options.method,
                        data: JSON.stringify(item),
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.iEstado == 1) {
                                if (options.success !=null) options.success(data);
                                $("#Message").Message({ Message: options.result, Icon: 'Info' });
                            } else {
                                strMensaje = options.message.saveError;
                                $("#Message").Message({ Message: options.error, Icon: 'Error' });
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#Message").Message({ Message: error, Icon: 'Error' });
                        }
                    });
                }
            });
        });
    };

    $.fn.setDataSource = function (options) {
        var defaults = {
            name: '',
            valueName: '',
            displayName: '',
            method: '',
            value: ''
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            $.ajax({
                url: $(this).Service({ Method: options.method }),
                data: "",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (resultado) {
                    $("#" + options.name).DataSource({ Source: resultado.d, ValueName: options.valueName, DisplayName: options.displayName });
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
            return false;
        });
    };

    $.fn.searchData = function (options) {
        var defaults = {
            colSearch: [],
            paging: false,
            async: true,
            cache: false,
            page: '',
            method: '',
            sortName: '',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: null
        };
        var options = $.extend(defaults, options);
        var columns = [];
        var item = {};
        this.each(function () {
            for (i = 0; i < options.colSearch.length; i++) {
                if (options.colSearch[i].type == 'int') {
                    item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).val();
                }
                if (options.colSearch[i].type == 'string') {
                    item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                }
                if (options.colSearch[i].type == 'bool') {
                    if (options.colSearch[i].control != null) {
                        item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                    } else {
                        item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                    };
                }
                if (options.colSearch[i].type == 'value') {
                    item[options.colSearch[i].col] = options.colSearch[i].value;
                }
            };
            if (options.dataType == 'html') {
                options.dataType = '';
            }

            $.ajax({
                url: options.method,
                data: JSON.stringify(item),
                dataType: options.dataType,
                type: "POST",
                contentType: options.contentType,
                success: function (resultado) {
                    options.success(resultado)
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
            return false;
        });
    };

    $.fn.generateReport = function (options) {
        var defaults = {
            colSearch: [],
            reportType: 'xls',
            paging: false,
            async: true,
            cache: false,
            page: '',
            method: '',
            sortName: '',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: null
        };
        var options = $.extend(defaults, options);
        var columns = [];
        var item = {};
        this.each(function () {
            for (i = 0; i < options.colSearch.length; i++) {
                if (options.colSearch[i].type == 'int') {
                    var value = $('#' + options.colSearch[i].name).val();
                    value = (value == '' || value == null) ? '0' : value;
                    item[options.colSearch[i].col] = value;
                }
                if (options.colSearch[i].type == 'string') {
                    item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                }
                if (options.colSearch[i].type == 'bool') {
                    if (options.colSearch[i].control != null) {
                        item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                    } else {
                        item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                    };
                }
                if (options.colSearch[i].type == 'value') {
                    item[options.colSearch[i].col] = options.colSearch[i].value;
                }
            };
            window.open(options.method + "/?model=" + JSON.stringify(item) + "&report=" + options.reportType);
            return false;
        });
    };

    $.fn.habilitarMenu = function (options) {
        var defaults = {
            regConcepto: null,
            regDocumento: null,
            modDocumento: null,
            impRendicion: null
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            var controls = [];
            if (options.regConcepto == true || options.regConcepto == false) controls.push({ name: 'btnConcepto', state: options.regConcepto });
            if (options.regDocumento == true || options.regDocumento == false) controls.push({ name: 'btnRegistrar', state: options.regDocumento });
            if (options.modDocumento == true || options.modDocumento == false) controls.push({ name: 'btnModificar', state: options.modDocumento });
            if (options.impRendicion == true || options.impRendicion == false) controls.push({ name: 'btnReporte', state: options.impRendicion });
            window.parent.EnabledControl(controls);
        });
    };

    $.fn.dialogDetails = function (options) {
        var defaults = {
            title: '',
            autoOpen: false,
            height: 400,
            width: 800,
            modal: true,
            buttons: {}
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            //$('#' + $(this).attr("id")).css({ 'height': options.height, 'width': options.width });
            $(this).dialog({
                title: options.title,
                autoOpen: options.autoOpen,
                height: options.height,
                width: options.width,
                modal: options.modal,
                buttons: {
                    "Cerrar": function () {
                        $(this).dialog("close");                        
                    }
                },
                open: function () {
                    $('.ui-dialog-buttonpane').find('button:contains("Cerrar")').focus();                    
                }
            }).parent().attr("id", "ui-dialog-" + $(this).attr("id"));
        });
    };

    $.fn.showDialogDetails = function (options) {
        var defaults = {
            id: 0,
            div: '',
            title: '',
            url: '',
            type: 'Post',
            success: null
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            $.ajax({
                url: options.url + "/" + options.id,
                type: options.type,
                success: function (data) {
                    $("#" + options.div).dialog("open");
                    $("#" + options.div).dialog("option", "title", options.title);
                    $("#" + options.div).empty().append(data);

                    if (options.success != null) options.success(data);
                },
                error: function (xhr, status, error) {
                    $("#Message").Message({ Message: error, Icon: 'Error' });
                }
            });
        });
    };

    $.fn.dialogManagement = function (options) {
        var defaults = {
            id: 0,
            title: '',
            autoOpen: false,
            height: 400,
            width: 800,
            modal: true,
            buttons: {}
        };
        options = $.extend(defaults, options);
        this.each(function () {
            $(this).dialog({
                title: options.title,
                autoOpen: options.autoOpen,
                height: options.height,
                width: options.width,
                modal: options.modal,
                buttons: {
                    "Guardar": function () {
                        if ($.isFunction(saveRow)) {
                            saveRow();
                        }
                    },
                    "Cerrar": function () {
                        $(this).dialog("close");
                    }
                },
                open: function () {
                    $('.ui-dialog-buttonpane').find('button:contains("Cerrar")').focus();
                }
            }).parent().attr("id", "ui-dialog-" + $(this).attr("id"));

            /*$(window).bind('resize', function () {
                if ($(window).width() < 480) {
                    $()
                }
            }).trigger('resize');*/
        });
    };

    $.fn.showDialogManagement = function (options) {
        var defaults = {
            id: 0,
            div: '',
            title: '',
            url: '',
            type: 'Post',
            success: null
        };
        var item = {};
        var options = $.extend(defaults, options);
        this.each(function () {

            $.ajax({
                url: options.url + "/" + options.id,
                data: JSON.stringify(item),
                type: options.type,
                success: function (data) {

                    $("#" + options.div).dialog("open");
                    $("#" + options.div).dialog("option", "title", options.title);
                    $("#" + options.div).empty().append(data);

                    if (options.success != null) options.success(data);
                },
                error: function (xhr, status, error) {
                    $("#Message").Message({ Message: error, Icon: 'Error' });
                }
            });
        });
    };

    $.fn.dialogManagementModulo = function (options) {
        var defaults = {
            id: 0,
            title: '',
            autoOpen: false,
            height: 400,
            width: 800,
            modal: true,
            buttons: {}
        };
        options = $.extend(defaults, options);
        this.each(function () {
            $(this).dialog({
                title: options.title,
                autoOpen: options.autoOpen,
                height: options.height,
                width: options.width,
                modal: options.modal,
                buttons: {
                    "Enviar": function () {
                        if ($.isFunction(saveRow)) {
                            saveRow();
                        }
                    },
                    "Cerrar": function () {
                        $(this).dialog("close");
                    }
                },
                open: function () {
                    $('.ui-dialog-buttonpane').find('button:contains("Cerrar")').focus();
                }
            }).parent().attr("id", "ui-dialog-" + $(this).attr("id"));

            /*$(window).bind('resize', function () {
                if ($(window).width() < 480) {
                    $()
                }
            }).trigger('resize');*/
        });
    };

    $.fn.showDialogManagementModulo = function (options) {
        var defaults = {
            id: 0,
            div: '',
            title: '',
            url: '',
            type: 'Post',
            success: null
        };
        var item = {};
        var options = $.extend(defaults, options);
        this.each(function () {

            $.ajax({
                url: options.url + "/" + options.id,
                data: JSON.stringify(item),
                type: options.type,
                success: function (data) {

                    $("#" + options.div).dialog("open");
                    $("#" + options.div).dialog("option", "title", options.title);
                    $("#" + options.div).empty().append(data);

                    if (options.success != null) options.success(data);
                },
                error: function (xhr, status, error) {
                    $("#Message").Message({ Message: error, Icon: 'Error' });
                }
            });
        });
    };
    

    $.fn.initComplete = function (options) {
        var defaults = {
            colSearch: [],
            colData: [],
            method: '',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            select: null,
            minLength: 3,
            label: '',
            value: ''
        };
        var options = $.extend(defaults, options);
        var columns = [];
        var item = {};
        this.each(function () {
            if (options.dataType == 'html') {
                options.dataType = '';
            }

            $(this).autocomplete({
                source: function (request, response) {
                    for (i = 0; i < options.colSearch.length; i++) {
                        if (options.colSearch[i].type == 'int') {
                            item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).val();
                        }
                        if (options.colSearch[i].type == 'string') {
                            item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                        }
                        if (options.colSearch[i].type == 'bool') {
                            if (options.colSearch[i].control != null) {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).is(':checked') ? 1 : $('#' + options.colSearch[i].control).is(':checked') ? 0 : '';
                            } else {
                                item[options.colSearch[i].col] = $('#' + options.colSearch[i].name).valStr();
                            };
                        }
                        if (options.colSearch[i].type == 'value') {
                            item[options.colSearch[i].col] = options.colSearch[i].value;
                        }
                    };

                    $.ajax({
                        url: options.method,
                        data: item,
                        dataType: options.dataType,
                        type: 'POST',
                        success: function (data) {
                            if (options.colData.length <= 2) {
                                response($.map(data, function (item) {
                                    return {
                                        label: item[options.colData[0].col],
                                        value: item[options.colData[1].col]
                                    }
                                }));
                            } else {
                                response($.map(data, function (item) {
                                    return {
                                        label: item[options.colData[0].col],
                                        value: item[options.colData[1].col],
                                        text: item[options.colData[2].col]
                                    }
                                }));
                            }
                        }
                    })
                },
                select: function (event, ui) {
                    $('#' + options.colData[0].name).val(ui.item.label);
                    $('#' + options.colData[1].name).val(ui.item.value);

                    if (options.colData.length > 2) {
                        $('#' + options.colData[2].name).val(ui.item.text);
                    }

                    if (options.select != null) {
                        options.select(event, ui);
                    }

                    return false;
                },
                minLength: options.minLength
            });

            return false;
        });
    };

})(jQuery);