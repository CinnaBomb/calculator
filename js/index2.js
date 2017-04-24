$(document).ready(function() {

    var Calc = {

        //VARIABLES

        prevNum: "",
        currentNum: "",
        equation: "",
        total: 0,
        currentOperator: "",

        //HELPERS

        operators: ["/", "X", "-", "+"],
        validNum: /^[1-9]\d*(\.\d+)?$/, //valid regex?


        //UI UPDATES

        updateMain: function(content) {
            $(".main").html("<p>" + content + "</p>");
        },

        updateOngoing: function(content) {
            $(".ongoing").html("<p>" + content + "</p>");
        },




        //BUTTON CLICK FUNCTIONS

        digitOrSymbol: function(val) {
            console.log(this.currentNum);
            if (this.currentNum.length >= 8) {
                this.updateMain("Digit Limit Reached");
            } else if (val == "%") {
                if (this.currentNum !== "") { //add percentage only if there is a currentNum
                    this.currentNum = Number(this.currentNum) / 100;
                    this.equation += "%";
                }
            } else if (val == "." && (this.currentNum.toString().indexOf(".") !== -1)) { //do nothing if currentNum already has a decimal

            } else { //add values
                this.currentNum += val;
                this.equation += val;
                this.updateMain(this.currentNum);
            }
        },

        operator: function(val) {

            if (this.currentNum == "") { //if currentNum is not a valid number
                this.updateMain("Enter a Valid Number");
            } else if (this.equation.indexOf("=") !== -1) { //if an equation was previously evaluated
                this.currentOperator = val;
                this.prevNum = this.total;
                this.equation = this.prevNum + val;
                this.total = "";
                this.currentNum = "";
                this.updateMain(val);
            } else {
                this.currentOperator = val;
                this.prevNum = this.currentNum;
                this.currentNum = "";
                this.equation += val;
                this.updateMain(val);
            }
        },

        equalSign: function() {

            if (this.prevNum == "" || this.currentNum == "" || this.currentOperator == "") { //if both prevNum and currentNum are valid
                this.updateMain("Enter a Valid Equation");
            } else {
                this.total = this.evalEquation();//.toFixed(3);
                this.currentOperator = "";
                this.currentNum = this.total;
                this.equation += "=" + this.total;
                this.updateMain(this.total);
            }
        },

        ACorCE: function(val) {
            if (val == "CE") {
                this.equation = this.equation.substr(0, this.equation.length - this.currentNum.length);
                this.currentNum = "";
            } else {
                this.prevNum = "";
                this.currentNum = "";
                this.equation = "";
                this.total = 0;
                this.currentOperator = "";
                this.updateOngoing(0);
            }
            this.updateMain(0);
        },

        //EVALS
        evalEquation: function() {
            this.prevNum = Number(this.prevNum);
            this.currentNum = Number(this.currentNum);
            switch (true) {
                case (this.currentOperator == "/"):
                    return this.prevNum / this.currentNum;
                    break;
                case (this.currentOperator == "X"):
                    return this.prevNum * this.currentNum;
                    break;
                case (this.currentOperator == "-"):
                    return this.prevNum - this.currentNum;
                    break;
                case (this.currentOperator == "+"):
                    return this.prevNum + this.currentNum;
                    break;
            }
        },

        evalButtonClick: function(val) {
            //console.log(val);
            if (val.search(/\d/g) !== -1 || val == "." || val == "%") { //if digit, percentage, or decimal
                //console.log("digit or symbol");
                this.digitOrSymbol(val);
            } else if (this.operators.indexOf(val) !== -1) { //if operator pressed
                //console.log("operator");
                this.operator(val);
            } else if (val == '=') { //if = pressed
                //console.log("equal");
                this.equalSign();
            } else if (val == "AC" || val == "CE") { //if AC or CE pressed
                //console.log("ACCE");
                this.ACorCE(val);
            }

            if (this.equation !== "") {
                console.log("equation updated");
                this.updateOngoing(this.equation);
            }
        }

    };




    $(".main").html(0);
    $(".ongoing").html(0);


    $("button").on("click", function() { //BUTTON HANDLER
        val = $(this).html();

        Calc.evalButtonClick(val);


    });

});