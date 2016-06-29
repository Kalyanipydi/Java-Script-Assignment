var fs = require("fs");
var mainFile = "FoodFacts.csv";
var wrStream = fs.createWriteStream('output.json');
var countryArr = ["France","United Kingdom","Spain","Germany","United States","Australia","South Africa","Netherlands"];
var result = [];
var count =1;
// var streamWrite = fs.createWriteStream("output.json");
//var result = [];
//str = "[";
var parse = function (mainFile) {
    fs.readFile(mainFile, function (error, data) {
        if (error) throw error;

        var data1 = data.toString();
        var lines = data1.split('\n');
        var country, sugar, salt;
        // streamWrite.write("[");
        // console.log('total line '+lines.length);
        var head = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        for (var i = 0; i < head.length; i++) {
            if (head[i] === "countries_en") country = i;
            else if (head[i] === "sugars_100g") sugar = i;
            else if (head[i] === "salt_100g") salt = i;
        }
        // console.log(country, salt, sugar);
        var count = 0;
        // if(mydata.includes("United Kingdom")&& mydata.includes("France")&& mydata.includes("Australia") && mydata.includes("Germany") && mydata.includes("Spain") && mydata.includes("South Africa")){
        
         wrStream.write('[');
         for (var i = 1; i < lines.length; i++) {

            var arry = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            var obj = {};


            if ((countryArr.indexOf(arry[country]) > -1) && arry[salt] !== "" && arry[sugar] !== "") {

                obj['country'] = arry[country];
                obj['salt'] = arry[salt];
                obj['sugar'] = arry[sugar];
                //result.push(obj);
                if (i == 65505) {
                    wrStream.write(JSON.stringify(obj));
                }
                else {
                    wrStream.write(JSON.stringify(obj) + ",");
                }
            }
           


            /*fs.writeFile('Filter.json',JSON.stringify(result), function(err) {
            if (err) throw err;

            }); */




        }
         wrStream.write(']');
        //console.log(result);
    });
}

parse(mainFile);
