var fs = require("fs");
var mainFile = "FoodFacts.csv";
var wrStream = fs.createWriteStream('AllCarbohydrates.json');
//United Kingdom, Denmark, Sweden and Norway----north Europe
//France, Belgium, Germany, Switzerland and Netherlands---Central Europe
//Portugal, Greece, Italy, Spain, Croatia and Albania--south Europe
var northEurope = ["United Kingdom","Denmark","Sweden","Norway"];
var centralEurope=["France","Belgium","Germany","Switzerland","Netherlands"];
var southEurope=["Portugal","Greece","Italy","Spain","Croatia","Albania"];
var result = [];
var count =1;

var parse = function(mainFile){
  fs.readFile(mainFile,function(error,data){
    if(error)throw error;

    var data1 = data.toString();
    var lines = data1.split('\n');
    var country, fat, protein,carbohydrate;
    // streamWrite.write("[");
    // console.log('total line '+lines.length);
    var head = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (var i = 0; i < head.length; i++) {
      if (head[i] === "countries_en") country = i;
      else if (head[i] === "carbohydrates_100g") carbohydrate = i;
      else if (head[i] === "proteins_100g") protein= i;
      else if (head[i] === "fat_100g") fat= i;
      //else if (head[i] === "last_modified_datetime") last_modified = i;
    }
    // console.log(country, salt, sugar);
    var count = 0;
    // if(mydata.includes("United Kingdom")&& mydata.includes("France")&& mydata.includes("Australia") && mydata.includes("Germany") && mydata.includes("Spain") && mydata.includes("South Africa")){

   wrStream.write('[');
    for(var i = 1; i <lines.length;i++){

      var arry = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      var obj={};
      //   // var flag=0;
      // console.log("count is" + ++count)


      // for(var j = 0; j<arry.length;j++){

        if ((northEurope.indexOf(arry[country]) > -1) && arry[carbohydrate] !== "" && arry[carbohydrate]>0
            && arry[protein] !== "" && arry[protein]>0 &&  arry[fat] !== "" && arry[fat]>0) {

            obj['country'] = "NorthEurope";
            obj['carbohydrates'] = arry[carbohydrate];
            obj['proteins'] = arry[protein];
            obj['fat'] = arry[fat];
            //obj['sugar']=arry[sugar];
          //result.push(obj);
          console.log(obj);
          if (i == 65505) {
              wrStream.write(JSON.stringify(obj));
          }
          else {
              wrStream.write(JSON.stringify(obj) + ",");
          }
        }
      else if ((centralEurope.indexOf(arry[country]) > -1) && arry[carbohydrate] !== "" && arry[carbohydrate]>0
          && arry[protein] !== "" && arry[protein]>0 &&  arry[fat] !== "" && arry[fat]>0) {

          obj['country'] = "CentralEurope";
          obj['carbohydrates'] = arry[carbohydrate];
          obj['proteins'] = arry[protein];
          obj['fat'] = arry[fat];
          //obj['sugar']=arry[sugar];
        //result.push(obj);
        console.log(obj);
        if (i == 65505) {
            wrStream.write(JSON.stringify(obj));
        }
        else {
            wrStream.write(JSON.stringify(obj) + ",");
        }
      }if ((southEurope.indexOf(arry[country]) > -1) && arry[carbohydrate] !== "" && arry[carbohydrate]>0
          && arry[protein] !== "" && arry[protein]>0 &&  arry[fat] !== "" && arry[fat]>0) {

          obj['country'] = "SouthEurope";
          obj['carbohydrates'] = arry[carbohydrate];
          obj['proteins'] = arry[protein];
          obj['fat'] = arry[fat];
          //obj['sugar']=arry[sugar];
        //result.push(obj);
        console.log(obj);
        if (i == 65505) {
            wrStream.write(JSON.stringify(obj));
        }
        else {
            wrStream.write(JSON.stringify(obj) + ",");
        }
      }

      // }



  }
     wrStream.write(']');
//console.log(result);
});
}

parse(mainFile);
