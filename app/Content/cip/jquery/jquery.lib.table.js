(function ($) {
    $.fn.Table = function (options) {
        var defaults = {
            id: '',
            control: '',
            caption: '',
            data: [],
            colNames: [],
            colModel: [],
            height: 100,
            width: 900,
            zebra: true,
            wrapper: false,
            footer: false,
            colActions: []
        };

        var options = $.extend(defaults, options);
        var i = 0;
        var j = 0;
        var table = '';
        var colWidth = [30];
        var value = '';
        var method = '';
        this.each(function () {
            table += '<table id="' + options.id + '">';
            table += '<thead><tr>';
            table += '<th>N&#176;</th>';
            // Actions
            for (i = 0; i < options.colActions.length; i++) {
                table += '<th>' + options.colActions[i].caption + '</th>';
            };
            // Columns
            for (i = 0; i < options.colNames.length; i++) {
                table += '<th>' + options.colNames[i] + '</th>';
            };
            table += '</tr></thead>';
            table += '<tbody>';
            for (i = 0; i < options.data.length; i++) {
                table += '<tr>';
                table += '<td class="Center">' + (i + 1) + '</td>';
                // Actions
                for (j = 0; j < options.colActions.length; j++) {
                    if (options.colActions[j].type == 'E') {
                        method = options.colActions[j].method;
                        method = (method == '' || method == null) ? 'ModificarRegistroDet' : method;
                        table += (options.colActions[j].align == '') ? '<td>' : '<td class="' + options.colActions[j].align + '">';
                        table += '<img src="../images/pan_editar.gif" onclick="' + method + '(' + options.data[i][options.colActions[j].name] + ');" border="0" title="' + options.colActions[j].title + '" class="Hipervinculo">';
                        table += '</td>';
                    };
                    if (options.colActions[j].type == 'D') {
                        method = options.colActions[j].method;
                        method = (method == '' || method == null) ? 'EliminarRegistroDet' : method;
                        table += '<td class="Center"><img src="../images/pan_borrar.gif" onclick="' + method + '(\'' + options.data[i][options.colActions[j].name] + '\',\'' + options.data[i][options.colActions[j].text] + '\');" border="0" title="' + options.colActions[j].title + '" width="16px" height="16px" class="Hipervinculo"></td>'
                    };
                    if (options.colActions[j].type == 'A') {
                        method = options.colActions[j].method;
                        method = (method == '' || method == null) ? 'AdjuntarRegistroDet' : method;
                        table += '<td class="Center"><img src="../images/Adjuntar.png" onclick="' + method + '(\'' + options.data[i][options.colActions[j].name] + '\',' + i + ');" border="0" title="' + options.colActions[j].title + '" width="16px" height="16px" class="Hipervinculo"></td>'
                    };
                    if (options.colActions[j].type == 'F') {
                        method = options.colActions[j].method;
                        method = (method == '' || method == null) ? 'VerRegistroDet' : method;
                        table += '<td class="Center"><img src="../images/Archivo.png" onclick="' + method + '(\'' + options.data[i][options.colActions[j].name] + '\');" border="0" title="' + options.colActions[j].title + '" width="16px" height="16px" class="Hipervinculo"></td>'
                    };
                };
                // Columns
                for (j = 0; j < options.colModel.length; j++) {
                    table += (options.colModel[j].align == '') ? '<td>' : '<td class="' + options.colModel[j].align + '">';
                    value = options.data[i][options.colModel[j].name];
                    if (options.colModel[j].format == 'decimal') {
                        value = (value == null || value == '') ? '0' : value;
                        value = parseFloat(value).toFixed(2);
                    }
                    table += (value != null) ? value : '';
                    table += '</td>';
                };
                table += '</tr>';
            };
            table += '</tbody>';
            table += '</table>';

            //$(this).html(table);
            if (options.control == '') {
                $(this).html(table);
            } else {
                $("#" + options.control).html(table);
            }
            //alert(table);
            /* Width */
            // Actions
            for (i = 0; i < options.colActions.length; i++) {
                colWidth.push(options.colActions[i].width);
            };
            // Columns
            for (i = 0; i < options.colModel.length; i++) {
                colWidth.push(options.colModel[i].width);
            };

            $('#' + options.id).fixheadertable({
                caption: options.caption,
                colratio: colWidth,
                height: options.height,
                width: options.width,
                zebra: options.zebra,
                footer: options.footer,
                resizeCol: false,
                wrapper: options.wrapper
            });
        });


    };
})(jQuery);