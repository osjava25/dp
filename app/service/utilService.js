'use strict';

app.service("utilsService", function () {

    this.getArrayCascade = function (items, nameId, nameValue) {
        var jsonSelect = { id: "", name: "" };
        var result = [];
        var resultArray = [];
        $.each(items, function (index, item) {
            if ($.inArray(item[nameId], resultArray) === -1) {
                resultArray.push(item[nameId]);
                jsonSelect = { id: item[nameId], name: item[nameValue] };
                result.push(jsonSelect);
            }
        });

        return result;
    };

    this.getCheckCascade = function (items, nameId, nameValue) {
        var jsonSelect = { id: "", name: "" };
        var result = [];
        var resultArray = [];
        $.each(items, function (index, item) {
            if ($.inArray(item[nameId], resultArray) === -1) {
                resultArray.push(item[nameId]);
                jsonSelect = { id: item[nameId], name: item[nameValue], select: false };
                result.push(jsonSelect);
            }
        });

        return result;
    };
});