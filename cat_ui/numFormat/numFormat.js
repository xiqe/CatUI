/**
 * numFormat 组件
 * author jerry_liang
 * update: 2016/05/26
 * 功能: 数字格式化处理
 */
!function (window) {

    var NumFormat ={
        percentageFormat: function (num) {

            if (num === 0 || num === "0") {
                return "0.00%"
            }

            if (!num || isNaN(num)) {
                return "";
            }

            num = parseFloat(num);
            num = Math.round(num * 10000) / 100 + "";

            if (num.indexOf(".") == -1) {
                num += ".00";
            } else {
                num += "00"
            }
            var numArr = num.split(".");
            var floatNumber = numArr[1].substring(0, 2);

            return numArr[0] + "." + floatNumber + "%";

        },
        withoutPercentageFormat: function (num) {

            if (num === 0 || num === "0") {
                return "0.00%"
            }

            if (!num || isNaN(num)) {
                return "";
            }

            num = parseFloat(num);
            num = Math.round(num * 10000) / 100 + "";

            if (num.indexOf(".") == -1) {
                num += ".00";
            } else {
                num += "00"
            }
            var numArr = num.split(".");
            var floatNumber = numArr[1].substring(0, 2);

            return numArr[0] + "." + floatNumber;

        },
        numberFormat: function (nStr) {
            var currency = "￥";
            var number = this.numberFormatWithoutCurrency(nStr);
            if (number == '') {
                return number;
            }
            return currency + number;
        },
        numberFormatWithoutCurrency: function (nStr) {
            if (nStr === 0 || nStr === "0") {
                return "0.00";
            }

            if (!nStr || isNaN(nStr)) {
                return "";
            }

            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '.00';
            if (x2.length < 3) {
                x2 += "00";
            }
            x2 = x2.substring(0, 3);
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },

        round: function (value) {
            return Math.round(value * 100) / 100;
        },


        convertCurrency: function (currencyDigits, isforbidHint) {
            //max number
            var MAXIMUM_NUMBER = 99999999999.99;
            //Predefine the radix characters and currency symbols for output:
            var CN_ZERO = "零";
            var CN_ONE = "壹";
            var CN_TWO = "贰";
            var CN_THREE = "叁";
            var CN_FOUR = "肆";
            var CN_FIVE = "伍";
            var CN_SIX = "陆";
            var CN_SEVEN = "柒";
            var CN_EIGHT = "捌";
            var CN_NINE = "玖";
            var CN_TEN = "拾";
            var CN_HUNDRED = "佰";
            var CN_THOUSAND = "仟";
            var CN_TEN_THOUSAND = "万";
            var CN_HUNDRED_MILLION = "亿";
            var CN_SYMBOL = "人民币";
            var CN_DOLLAR = "元";
            var CN_TEN_CENT = "角";
            var CN_CENT = "分";
            var CN_INTEGER = "整";

            // Variables:
            var integral; // Represent integral part of digit number.
            var decimal; // Represent decimal part of digit number.
            var outputCharacters; // The output result.
            var parts;
            var digits, radices, bigRadices, decimals;
            var zeroCount;
            var i, p, d;
            var quotient, modulus;

            // Validate input string:
            currencyDigits = currencyDigits + "";

            if (currencyDigits == "") {
                if (isforbidHint) {
                    return "";
                }
                return "Empty input!";
            }
            if (currencyDigits.match(/[^,.\d]/) != null) {
                if (isforbidHint) {
                    return "";
                }
                return "Invalid characters in the input string!";
            }
//      if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.\d+)?)|(\d+(.\d+)?))$/) == null) {
                if (isforbidHint) {
                    return "";
                }
                return "Illegal format of digit number!";
            }

            // Normalize the format of input digits:
            currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
            currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
            // Assert the number is not greater than the maximum number.
            if (Number(currencyDigits) > MAXIMUM_NUMBER) {
                if (isforbidHint) {
                    return "";
                }
                return "Too large a number to convert!";
            }

            // hack by wr
            currencyDigits = parseFloat(currencyDigits);
            currencyDigits = currencyDigits + "";

            // Process the coversion from currency digits to characters:
            // Separate integral and decimal parts before processing coversion:
            parts = currencyDigits.split(".");
            if (parts.length > 1) {
                integral = parts[0];
                decimal = parts[1];
                // Cut down redundant decimal digits that are after the second.
                decimal = decimal.substr(0, 2);
            } else {
                integral = parts[0];
                decimal = "";
            }

            // Prepare the characters corresponding to the digits:
            digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
            radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
            bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
            decimals = new Array(CN_TEN_CENT, CN_CENT);
            // Start processing:
            outputCharacters = "";
            // Process integral part if it is larger than 0:
            if (Number(integral) > 0) {
                zeroCount = 0;
                for (i = 0; i < integral.length; i++) {
                    p = integral.length - i - 1;
                    d = integral.substr(i, 1);
                    quotient = p / 4;
                    modulus = p % 4;
                    if (d == "0") {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            outputCharacters += digits[0];
                        }
                        zeroCount = 0;
                        outputCharacters += digits[Number(d)] + radices[modulus];
                    }
                    if (modulus == 0 && zeroCount < 4) {
                        outputCharacters += bigRadices[quotient];
                    }
                }
                outputCharacters += CN_DOLLAR;
            }

            // Process decimal part if there is:
            if (decimal != "") {
                for (i = 0; i < decimal.length; i++) {
                    d = decimal.substr(i, 1);
                    if (d != "0") {
                        outputCharacters += digits[Number(d)] + decimals[i];
                    }
                }
            }

            // Confirm and return the final output string:
            if (outputCharacters == "") {
                outputCharacters = CN_ZERO + CN_DOLLAR;
            }
            if (decimal == "") {
                outputCharacters += CN_INTEGER;
            }
            return outputCharacters;
        },

        secondsOfTrading: function (secondsOfTrading) {
            secondsOfTrading = Number(secondsOfTrading);
            var remainTime,
                minutes,
                hours,
                seconds;

            if (secondsOfTrading <= 60) {
                remainTime = secondsOfTrading + '秒';

            } else if (60 < secondsOfTrading && secondsOfTrading < 3600) {
                seconds = secondsOfTrading % 60;
                minutes = Math.floor(secondsOfTrading / 60) % 60;
                remainTime = minutes + '分' + seconds + '秒';

            } else if (3600 <= secondsOfTrading && secondsOfTrading < 86400) {
                seconds = secondsOfTrading % 60;
                minutes = Math.floor(secondsOfTrading / 60) % 60;
                hours = Math.floor(secondsOfTrading / 60 / 60) % 24;
                remainTime = hours + '小时' + minutes + '分' + seconds + '秒';

            } else {
                remainTime = '';

            }
            return remainTime;
        },

        numberFormatTenThousand: function (nStr) {
            if (nStr === 0 || nStr === "0") {
                return "0万";
            }

            if (!nStr || isNaN(nStr)) {
                return "";
            }


            nStr = nStr / 10000;
            nStr += '';
            var x = nStr.split('.')[0];
            var y = nStr.split('.')[1];
            if (y) {
                y = y.substring(0, 2);
                return x + '.' + y + '万';
            } else {
                return x + '万';
            }

        },

        percentageFormatWithoutZero: function (num) {
            if (num === 0 || num === "0") {
                return "0%"
            }
            if (num > 1 || num > "1") {
                return "100%"
            }
            if (!num || isNaN(num)) {
                return "";
            }
            num = parseFloat(num);
            num = (num * 10000) / 100 + "";
            if (num.indexOf(".") === -1) {
                return  num + "%";
            } else {
                var numArr = num.split("."), secFloatNumber = numArr[1].substring(1, 2), firstFloatNumber = numArr[1].substring(0, 1), floatNumber = numArr[1].substring(0, 2);
                if (secFloatNumber === "0") {
                    return numArr[0] + "." + firstFloatNumber + "%";
                } else {
                    return numArr[0] + "." + floatNumber + "%";

                }
            }
        },

        progressFormat: function (num) {
            if (num === 0 || num === "0") {
                return "0%"
            }
            if (num > 1 || num > "1") {
                return "100%"
            }
            if (!num || isNaN(num)) {
                return "";
            }
            num = parseFloat(num);
            num = (num * 10000) / 100 + "";
            var numArr = num.split(".");
            return numArr[0] + "%";

        },

        telFormat: function (num) {
            if (!num || isNaN(num)) {
                return "";
            }
            var _data = num.substr(0,3)+" "+num.substr(3,4)+" "+num.substr(7);
            return $.trim(_data);
        },

        idFormat: function (num) {
            if (!num || isNaN(num)) {
                return "";
            }
            var _data = num.substr(0,6)+" "+num.substr(6,8)+" "+num.substr(14);
            return $.trim(_data);
        },

        bankCardFormat: function (num) {
            if (!num || isNaN(num)) {
                return "";
            }
            var _data = num.replace(/\s/g,'').replace(/(\d{4})/g,"$1 ");
            return $.trim(_data);
        }
    }


    numFormat = NumFormat;
}(this);
