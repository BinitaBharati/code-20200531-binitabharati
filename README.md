# code-20200531-binitabharati

## Build
1. Clone this repo.
2. cd to the project.
3. Execute `yarn build` to generate the build.


## Run
1.Execute `yarn run-main` to run the code.

## Code design
1. Running this code will generate a json file (named `huge-data.json`)with 1 million random objects of the structure as given below:
```
[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, 
{ "Gender": "Male", "HeightCm": 161, "WeightKg": 85 } ]
```
2. Each of these objects will be read and further enhanced to contain 3 additional fields as below:
```
[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96, "BMIKgM":262.7450980392157,"BMICategory":"Very severely obese","HealthRisk":"Very high" },
{ "Gender": "Male", "HeightCm": 161, "WeightKg": 85, "BMIKgM":262.7450980392157,"BMICategory":"Very severely obese","HealthRisk":"Very high" }]
```
3. The enahnced JSON file (named `enhanced.json`) will be processed to print the count of overweight people.

