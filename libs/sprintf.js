/**
 * A sprintf function
 * @author Michael Jostmeyer
 */
var sprintf = (function(){
    "use strict";
    var re = /([^%]*)%(\d\$)?('.|0|\x20)?(-)?(\+)?(\d+)?(\.\d+)?(%|b|c|s|i|d|u|o|x|X|e|E|f|F|g)(.*)/;
    return function(){
        var str,
            a = [],
            left,
            right,
            argnum,
            padding,
            justify,
            minlen,
            conversion,
            precision = -1,
            repl,
            crtArgumentCtr = 1,
            crtArgument,
            joiner = [],
            useArgNum = false,
            alwayssigned = false;
        
        if(!arguments || arguments.length < 1){
            return;
        }
        str = arguments[0];
        while(a = re.exec(str)){
            left = a[1];
            argnum = a[2]?parseInt(a[2].substring(0,1),10):false;
            padding = a[3]?a[3].substring(1):' ';
            justify = a[4]||false;
            alwayssigned = (a[5] === '+');
            minlen = a[6]?parseInt(a[6],10):false;
            precision = a[7]?parseInt(a[7].substring(1),10):false;
            conversion = a[8];
            right = a[9];
            if(argnum && argnum < 1 && argnum > arguments.length - 1){
                return;
            }
            if(argnum){
                crtArgument = arguments[argnum];
                useArgNum = true;
            } else {
                if(useArgNum && conversion !== '%'){
                    return;
                }
                crtArgument = arguments[crtArgumentCtr++];
            }
            switch(conversion){
                case '%':
                    //a percent sign
                    repl = '__pct__';
                    crtArgumentCtr--;
                    break;
                case 'b':
                    //an unsigned integer, in binary
                    repl = Math.abs(parseInt(crtArgument,10)).toString(2);
                    break;
                case 'c':
                    //a character with the given number
                    repl = String.fromCharCode(parseInt(crtArgument,10));
                    break;
                case 's':
                    //a string
                    repl = crtArgument;
                    if(precision){
                        repl = repl.substring(0,precision);
                    }
                    break;
                case 'i':
                case 'd':
                    //a signed integer, in decimal
                    repl = parseInt(crtArgument,10) || 0;
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'u':
                    //an unsigned integer, in decimal
                    repl = Math.abs(parseInt(crtArgument,10));
                    break;
                case 'o':
                    //a signed integer, in octal
                    repl = parseInt(crtArgument,10).toString(8);
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'x':
                    //a signed integer, in hexadecimal, lowercase letters
                    repl = parseInt(crtArgument,10).toString(16).toLowerCase();
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'X':
                    //a signed integer, in hexadecimal, uppercase letters
                    repl = parseInt(crtArgument,10).toString(16).toUpperCase();
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'e':
                    //a floating-point number, in scientific notation
                    repl = parseFloat(crtArgument,10);
                    repl = repl.toExponential(precision);
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'E':
                    //a floating-point number, in scientific notation
                    repl = parseFloat(crtArgument,10);
                    repl = repl.toExponential(precision).toUpperCase();
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'F':
                case 'f':
                    //a floating-point number, in fixed decimal notation
                    repl = parseFloat(crtArgument,10);
                    if(precision){
                        repl = repl.toFixed(precision);
                    }
                    if(alwayssigned && repl > 0){
                        repl = '+' + repl;
                    }
                    break;
                case 'g':
                    //a floating-point number, in %e or %f notation
                    //wip
                    break;
            }
            if(minlen && repl.toString().length < minlen){
                joiner.length = minlen - repl.toString().length + 1;
                if(justify === '-'){
                    repl = repl + joiner.join(padding);
                } else {
                    repl = joiner.join(padding) + repl;
                }
            }
            str = left + repl + right;
        }
        
        return str.replace(/__pct__/g,'%');
    };
}());
