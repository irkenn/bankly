let hourTranslator = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen",
    "20": "twenty",
    "30": "thirty",
    "40": "forty",
    "50": "fifty"
};

function numberToString(number){  
  
  let numberInt = parseInt(number);
  if (number === '00'){
    return "twelve"
  }
  else if(numberInt < 10){
    return hourTranslator[numberInt];
  }
  else if(numberInt < 20 || number[1] == 0){
    return hourTranslator[number];
  }
  else if (numberInt < 60){
      return numberToString(number[0]+'0') + " " + numberToString(number[1]);
  }
}

function timeWord(integerHour){
    if (integerHour.length === 5){
        //******************* SPECIAL CASES

        if(integerHour == '00:00') return 'midnight';
        else if(integerHour === '12:00') return 'noon';

        let arr = integerHour.split(':');
        let hours = arr[0];
        let minutes = arr[1];
        
        //******************* MINUTES SECTION
        if(minutes === "00"){
            minutes = "o'clock";  
        }
        else if(minutes[0] === '0'){
            minutes = 'oh ' + numberToString(minutes);  
        }
        else if (minutes < 60){
          minutes = numberToString(minutes);  
        }
        else{
          return "Invalid minute format. Minutes should be between 00 and 59"; 
        }

        //******************* HOURS SECTION
        let hoursInt = parseInt(hours);
        if(hoursInt < 12 && hoursInt >= 0){
          return numberToString(hours) + " " + minutes + " am";
        }
        else if(hoursInt == 12){
          return "twelve " + minutes + " pm";
        }
        else if(hoursInt > 12 && hoursInt < 24 ){
          hoursInt = hoursInt - 12;
         return  numberToString(hoursInt) + " " + minutes + " pm";
        }
        return "Invalid hour format. Hours should be between 00 and 23";
    }
    return "Invalid hour format. It should be the following HH:MM";
}

module.exports = timeWord;