var program = $(".programlisting");
var str = "";
if (program) {
    if (program[0])
        str = program[0].innerText;
    else
        str = program.innerText;
}

var getArray = function (t) {
    return {
        "type": "array",
        "items": getType(t)
    };
}

var getType = function (t) {
    return {
        "type": t
    };
}

var stringKeys = ["String", "Resource Tag", "Stage Key"];

for (key in stringKeys) {
    var regExp = new RegExp('\\[ ' + stringKeys[key] + ', ... ]', 'g');
    str = str.replace(regExp, JSON.stringify(getArray("string")));
}

str = str.replace(/\[ Boolean, ... ]/g, JSON.stringify(getArray("boolean")));
str = str.replace(/Boolean/g, JSON.stringify(getType("boolean")));

str = str.replace(/\[ Number, ... ]/g, JSON.stringify(getArray("number")));
str = str.replace(/Number/g, JSON.stringify(getType("number")));

str = str.replace(/String/g, JSON.stringify(getType("string")));

var obj = JSON.parse(str);

var description = "";
description = $("p","#main-col-body")[0].innerText;

var item = {
    "type": "object",
    "description":description,
    "properties": {
        "Type": {
            "$ref": "#/definitions/resourceType",
            "pattern": obj.Type,
        },
        "Properties": {
            "type": "object",
            "properties": obj.Properties
        }
    }
};

console.log(JSON.stringify(item));