(function ($) {
    $.fn.Controls = function (options) {
        var defaults = {
            action: '',
            clean: [],
            enable: []
        };

        options = $.extend(defaults, options);
        var i = 0;
        var tagName = '';
        var type = '';
        var state = false;
        var action = '';
        var control = '';
        this.each(function () {
            // Clean Controls
            for (i = 0; i < options.clean.length; i++) {
                if ($('#' + options.clean[i].name).exists()) {
                    control = $('#' + options.clean[i].name);
                    tagName = control.get(0).tagName.toLowerCase();
                    action = options.clean[i].action;
                    if (action.indexOf('A') != -1) {
                        state = true;
                    } else if (action.indexOf('C') != -1 && options.action == 'C') {
                        state = true;
                    } else if (action.indexOf('U') != -1 && options.action == 'U') {
                        state = true;
                    } else if (action.indexOf('G') != -1 && options.action == 'G') {
                        state = true;
                    } else if (action.indexOf('R') != -1 && options.action == 'R') {
                        state = true;
                    };
                    if (state == true) {
                        if (tagName == 'input') {
                            type = control.attr('type');
                            if (type == 'text') { control.val(''); };
                            if (type == 'hidden') { control.val(''); };
                            if (type == 'checkbox') { control.attr('checked', false); };
                        };
                        if (tagName == 'select') {
                            control.val() == '0' ? control.val('0') : control.val('');
                        };
                        if (tagName == 'textarea') { control.val(''); };
                        if (tagName == 'span') { control.html(''); };
                        if (options.clean[i].focus == true) {
                            control.focus();
                        }
                    };
                };
                state = false;
            };

            // Enable Controls
            if (options.enable.length > 0) {
                if (options.action == 'C' || options.action == 'U') {
                    LimpiarControles(options.action);
                };
                if (options.action == 'R') {
                    LimpiarControles(options.action);
                };
                for (i = 0; i < options.enable.length; i++) {
                    if ($('#' + options.enable[i].name).exists()) {
                        control = $('#' + options.enable[i].name);
                        if ((options.enable[i].action == 'C' || options.enable[i].action == 'U') && (options.action == 'C' || options.action == 'U')) {
                            if (options.enable[i].readOnly == true) {
                                control.ReadOnly();
                            };
                            if (options.enable[i].defaultValue == true) {
                                (options.action == 'C') ? control.val('1') : control.val('');
                            };
                            if (options.enable[i].focus == true) {
                                control.focus();
                            };
                        };
                        if (options.enable[i].action == 'G' && options.action == 'G') {
                            if (options.enable[i].focus == true) {
                                control.focus();
                            };
                        };
                    };
                };
            };
        });
    };
})(jQuery);