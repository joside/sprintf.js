/**
 * sprintf.js - another implementation of the classic sprintf in javascript
 *
 * - pure javascript - no libs needed
 * - works in node (CommonJS), with AMD loaders and as a plain <script> (global `sprintf`)
 *
 * @copyright 2017 Michael Jostmeyer
 * @license BSD 3-Clause License
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.sprintf = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // %[argnum$][padding][-][+][minlen][.precision]conversion
    const placeholder = /%(?:(\d+)\$)?('.|0|\x20)?(-)?(\+)?(\d+)?(?:\.(\d+))?([%bcsiduoxXeEfFgG])/g;

    const toExponential = (value, precision, uppercase) => {
        const result = parseFloat(value).toExponential(precision);
        return uppercase ? result.toUpperCase() : result;
    };

    const toFixed = (value, precision) => {
        const number = parseFloat(value);
        return precision === undefined ? String(number) : number.toFixed(precision);
    };

    const toShortest = (value, precision, uppercase) => {
        const exponential = toExponential(value, precision, uppercase);
        const fixed = toFixed(value, precision);
        return exponential.length >= fixed.length ? fixed : exponential;
    };

    const convert = (conversion, value, precision) => {
        switch (conversion) {
            case 'b': return Math.abs(parseInt(value, 10)).toString(2);
            case 'c': return String.fromCharCode(parseInt(value, 10));
            case 's': {
                const str = String(value);
                return precision === undefined ? str : str.substring(0, precision);
            }
            case 'i':
            case 'd': return String(parseInt(value, 10) || 0);
            case 'u': return String(Math.abs(parseInt(value, 10)));
            case 'o': return parseInt(value, 10).toString(8);
            case 'x': return parseInt(value, 10).toString(16).toLowerCase();
            case 'X': return parseInt(value, 10).toString(16).toUpperCase();
            case 'e': return toExponential(value, precision, false);
            case 'E': return toExponential(value, precision, true);
            case 'f':
            case 'F': return toFixed(value, precision);
            case 'g': return toShortest(value, precision, false);
            case 'G': return toShortest(value, precision, true);
        }
    };

    // conversions that get a leading "+" when the + flag is set
    const signable = 'diefFgGeE';

    const pad = (repl, padding, leftJustify, minlen) => {
        if (minlen === undefined || repl.length >= minlen) {
            return repl;
        }
        const fill = padding.repeat(minlen - repl.length);
        if (leftJustify) {
            return repl + fill;
        }
        // zero padding goes between the sign and the digits: -0042, not 00-42
        if (padding === '0' && (repl[0] === '-' || repl[0] === '+')) {
            return repl[0] + fill + repl.substring(1);
        }
        return fill + repl;
    };

    return function sprintf(format, ...args) {
        if (format === undefined) {
            return;
        }

        let nextArgument = 0;
        let usedPositional = false;
        let invalid = false;

        const result = String(format).replace(placeholder,
            (match, argnum, padSpec, justify, sign, minlen, precision, conversion) => {
                if (invalid) {
                    return match;
                }
                if (conversion === '%') {
                    return '%';
                }

                let value;
                if (argnum !== undefined) {
                    const index = parseInt(argnum, 10);
                    if (index < 1 || index > args.length) {
                        invalid = true;
                        return match;
                    }
                    value = args[index - 1];
                    usedPositional = true;
                } else {
                    // mixing positional and sequential arguments is not supported
                    if (usedPositional) {
                        invalid = true;
                        return match;
                    }
                    value = args[nextArgument++];
                }

                const precisionValue = precision === undefined ? undefined : parseInt(precision, 10);
                let repl = convert(conversion, value, precisionValue);

                if (sign === '+' && signable.includes(conversion) && parseFloat(repl) > 0) {
                    repl = '+' + repl;
                }

                const padding = padSpec === undefined ? ' '
                    : padSpec[0] === '\'' ? padSpec[1] : padSpec;

                return pad(repl, padding, justify === '-',
                    minlen === undefined ? undefined : parseInt(minlen, 10));
            });

        return invalid ? undefined : result;
    };
}));
