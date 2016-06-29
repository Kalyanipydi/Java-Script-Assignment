var fs = require("fs");
var d;
var inFile = "AllCarbohydrates.json";
var res = [];
var obj = {};
fs.readFile(inFile, function (err, data) {
    if (err) throw err;
    data = data.toString();
    d = JSON.parse(data);
    // console.log(d[0]["Table Name"]);
    for (var i = 0, len = d.length; i < len; i++) {
        var object1 = d[i]["country"];
      //  console.log(o);
          var item1 = parseInt(d[i]["carbohydrates"]);
          var item2 = parseInt(d[i]["proteins"]);
          var item3 = parseInt(d[i]["fat"]);
      if (obj.hasOwnProperty(object1)) {

          //  obj[object1] = parseInt(obj[object1]) + item1+item2+item3;
            obj[object1]["carbohydrates"]=parseInt(obj[object1]["carbohydrates"])+item1;
            obj[object1]["proteins"]=parseInt(obj[object1]["proteins"])+item2;
            obj[object1]["fat"]=parseInt(obj[object1]["fat"])+item3;


        }
        else {
            obj[object1]={"carbohydrates":item1,"proteins":item2,"fat":item3};

        }



    }

        console.log(obj);
    for (var x in obj) {
        var obj1 = {};
        obj1["country"] = x;
        obj1["carbohydrates"] = obj[x]["carbohydrates"];
        obj1["proteins"]=obj[x]["proteins"];
        obj1["fat"]=obj[x]["fat"];
        res.push(obj1);
    }
     fs.writeFile("graph3.json", JSON.stringify(res), function (err) {
         if (err) throw err;
    })
});
