var fs = require('fs');
var JSONStream = require("JSONStream");
var es = require("event-stream");


export interface Person{
    Gender: string,
    HeightCm: number,
    WeightKg: number
}


interface ProcessedBMIData {
    BMIKgM: number,
    BMICategory: string,
    HealthRisk: string

}

type EnhancedPerson = Person & ProcessedBMIData;

enum BMI_CATEGORY {
    UNDER_WEIGHT = "Underweight",
    NORMAL_WEIGHT = "Normal weight",
    OVER_WEIGHT = "Overweight",
    MOD_OBESE = "Moderately obese",
    SEV_OBESE = "Severely obese",
    VER_SEV_OBESE = "Very severely obese"
  }

  enum HEALTH_RISK {
    MALNUTRITION = "Malnutrition",
    LOW = "Low",
    ENHANCED = "Enhanced",
    MEDIUM = "Medium",
    HIGH = "HIGH",
    VERY_HIGH = "Very high"
  }

function populateBMIData(person: Person): EnhancedPerson {
   
        const bmi = person.WeightKg/(person.HeightCm*0.01);
        var bmiCategory = null;
        var healthRisk = null;
        switch(true) {
            case (bmi <= 18.4):
                bmiCategory = BMI_CATEGORY.UNDER_WEIGHT
                healthRisk = HEALTH_RISK.MALNUTRITION;
                break;
            case (bmi >=18.5 && bmi <= 24.9):
                bmiCategory = BMI_CATEGORY.NORMAL_WEIGHT
                healthRisk = HEALTH_RISK.LOW;
                break;
            case (bmi >=25 && bmi <= 29.9):
                bmiCategory = BMI_CATEGORY.OVER_WEIGHT
                healthRisk = HEALTH_RISK.ENHANCED;
                break;
            case (bmi >=30 && bmi <= 34.9):
                bmiCategory = BMI_CATEGORY.MOD_OBESE
                healthRisk = HEALTH_RISK.MEDIUM;
                break;
            case (bmi >=35 && bmi <= 38.9):
                bmiCategory = BMI_CATEGORY.SEV_OBESE
                healthRisk = HEALTH_RISK.HIGH;
                break;
            case (bmi >=40):
                bmiCategory = BMI_CATEGORY.VER_SEV_OBESE
                healthRisk = HEALTH_RISK.VERY_HIGH;
                break;          
        }
        const enhancedPerson: EnhancedPerson = 
                    {
                        "Gender": person.Gender, 
                        "HeightCm" : person.HeightCm, 
                        "WeightKg": person.WeightKg,
                        "BMIKgM": bmi,
                        "BMICategory": bmiCategory,
                        "HealthRisk": healthRisk
                    }

        return enhancedPerson;
}

function getOverweightPeopleCount(): void {

    var overweightCount = 0;
    var readFileStream = fs.createReadStream("./enhancedperson.json", { encoding: "utf8" });
    var jsonStream = readFileStream.pipe(JSONStream.parse('*'));
    jsonStream.on('data', function(data) {
        const person = data as EnhancedPerson;
        if(person.BMICategory == BMI_CATEGORY.OVER_WEIGHT) {
            ++overweightCount;
        }
        return;
    });

    jsonStream.on('end', () => {
        console.log('Overweight count = '+overweightCount);
        return overweightCount;
        });

}

export function main(inputPath: string): void {
    var readFileStream = fs.createReadStream(inputPath, { encoding: "utf8" });
    var fileWriteStream = fs.createWriteStream("./enhancedperson.json", { encoding: "utf8" });
    var firstEntryDone:boolean = false;

    var jsonStream = readFileStream.pipe(JSONStream.parse('*'));
    jsonStream.on('data', function(data) {
    const person = data as Person;
    const enhancedPerson = populateBMIData(person);
    if(!firstEntryDone) {
        fileWriteStream.write("["+ JSON.stringify(enhancedPerson));
        firstEntryDone = true;

    } else {
        fileWriteStream.write(',' + JSON.stringify(enhancedPerson));

    }
    return;
    });

    jsonStream.on('end', () => {
    fileWriteStream.end(']');    
   getOverweightPeopleCount();
    });

 }

