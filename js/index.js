 $(document).ready(function() {
   var prevNum = "";
   var currentNum = "";
   var equation = "";
   var total = 0;
   var currentOperator = "";
   var operators = ["/", "X", "-", "+"]
   var validNum = /^[1-9]\d*(\.\d+)?$/;

   $(".main").html(0);
   $(".ongoing").html(0);

   //BUTTON HANDLER
   $("button").on("click", function() {
     val = $(this).html();

     //VALUE IS A DIGIT, PERCENTAGE, or DECIMAL
     if (val.search(/\d/g) !== -1 || val == "." || val == "%") {
       if (currentNum.length >= 8) {
         $(".main").html("<p>Digit Limit Reached</p>");
       } else if (val == "%") {
         //add percentage only if there is a currentNum
         if (currentNum !== "") {
           currentNum = Number(currentNum) / 100;
           equation += val;
         }
       } else if (val == "." && currentNum.indexOf(".") !== -1) {
         //stop adding decimals if currentNum already has one
       } else {
         currentNum += val;
         equation += val;
         $(".main").html("<p>" + currentNum + "</p>");
       }
     }

     //if operator pressed
     else if (operators.indexOf(val) !== -1) {
       //if currentNum is not a valid number
       if (currentNum == "") {
         $(".main").html("<p>Enter a Valid Number</p>");
       }
       //if an equation was previously evaluated
       else if (equation.indexOf("=") !== -1) {
         currentOperator = val;
         prevNum = total;
         equation = prevNum + val;
         total = "";
         currentNum = "";
         $(".main").html("<p>" + val + "</p>");
       } else {
         currentOperator = val;
         prevNum = currentNum;
         currentNum = "";
         equation += val;
         $(".main").html("<p>" + val + "</p>");
       }
     }

     //if = pressed
     else if (val == '=') {
       //if both prevNum and currentNum are valid
       if (prevNum == "" || currentNum == "" || currentOperator == "") {
         $(".main").html("<p>Enter a Valid Equation</p>");
       } else {
         total = eval(prevNum, currentNum);
         //console.log("total: ", total);
         currentOperator = "";
         currentNum = total;
         //currentNum = "";
         equation += "=" + total;

         $(".main").html("<p>" + total + "</p>");
       }
     }

     //if AC or CE pressed
     else if (val == "AC" || val == "CE") {
       if (val == "CE") {
         equation = equation.substr(0, equation.length - currentNum.length);
         currentNum = "";
       } else {
         prevNum = "";
         currentNum = "";
         equation = "";
         total = 0;
         currentOperator = "";
         $(".ongoing").html("<p>" + 0 + "</p>");
       }
       $(".main").html("<p>" + 0 + "</p>");

     }

     if (equation !== "") {
       $(".ongoing").html("<p>" + equation + "</p>");
     }

   });

   function eval(prevNum, currentNum) {
     prevNum = Number(prevNum);
     currentNum = Number(currentNum);
     switch (true) {
       case (currentOperator == "/"):
         return prevNum / currentNum;
         break;
       case (currentOperator == "X"):
         return prevNum * currentNum;
         break;
       case (currentOperator == "-"):
         return prevNum - currentNum;
         break;
       case (currentOperator == "+"):
         return prevNum + currentNum;
         break;
     }
   }

 });