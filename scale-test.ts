var fs = require('fs');
var JSONStream = require("JSONStream");
import {Person, main} from './index';

var firstEntryDone:boolean = false;

const gender:string[] = ["Male", "Female"];

var fileWriteStream = fs.createWriteStream("./huge_data.json", { encoding: "utf8" });
for (var i = 0 ; i < 1000000; i++) {
    const p:Person = {"Gender": gender[generateRandomIndex(0, 2)], "HeightCm": generateRandomIndex(50, 176), "WeightKg": generateRandomIndex(2.5, 500)};
    if(!firstEntryDone) {
        fileWriteStream.write("["+ JSON.stringify(p));
        firstEntryDone = true;
    
    } else {
        fileWriteStream.write(',' + JSON.stringify(p));
    
    }
}
fileWriteStream.on('finish', () => {
    console.log('entered finish');
    main('./huge_data.json')

  });

fileWriteStream.end(']');

function generateRandomIndex(min: number, max: number): number{
    return Math.floor(
        Math.random() * (max - min) + min
      )
}

