sprintf.js
==========

[![Build Status](https://travis-ci.org/joside/sprintf.js.svg)](https://travis-ci.org/joside/sprintf.js)

#### Another implementation of sprintf in JavaScript ####

`sprintf` returns - like the sprintf versions in other languages - a formatted String.

### Targeted platforms ###

`sprintf.js` currently targets the following platforms:

* Mozilla Firefox 14 and higher
* Chrome 18 and higher

Using sprintf.js
----------------

To use `sprintf.js` in your application, download the latest release and copy 
`libs/sprintf.js` to a suitable location. Then include it in your HTML
like so:

    <script type="text/javascript" src="/path/to/sprintf.js"></script>

Documentation
-------------

    String sprintf ( String format [, mixed arguments] )

# Parameters #

## format ##

The format string is composed of zero or more directives: ordinary characters (excluding %) that are copied directly to the result, and conversion specifications, each of which results in fetching its own parameter. 

Each conversion specification consists of a percent sign (%), followed by one or more of these elements, in order:

1. An optional sign specifier that forces a sign (- or +) to be used on a number. By default, only the - sign is used on a number if it's negative. This specifier forces positive numbers to have the + sign attached as well.
* An optional padding specifier that says what character will be used for padding the results to the right string size. This may be a space character or a 0 (zero character). The default is to pad with spaces. An alternate padding character can be specified by prefixing it with a single quote (').
* An optional alignment specifier that says if the result should be left-justified or right-justified. The default is right-justified; a - character here will make it left-justified.
* An optional number, a width specifier that says how many characters (minimum) this conversion should result in.
* An optional precision specifier in the form of a period (`.') followed by an optional decimal digit string that says how many decimal digits should be displayed for floating-point numbers. When using this specifier on a string, it acts as a cutoff point, setting a maximum character limit to the string.

A type specifier that says what type the argument data should be treated as.

### Possible types ###
* % - a literal percent character. No argument is required.
* b - the argument is treated as an integer, and presented as a binary number.
* c - the argument is treated as an integer, and presented as the character with that ASCII value.
* d - the argument is treated as an integer, and presented as a (signed) decimal number.
* e - the argument is treated as scientific notation (e.g. 1.2e+2). The precision specifier stands for the number of digits after the decimal point since PHP 5.2.1. In earlier versions, it was taken as number of significant digits (one less).
* E - like %e but uses uppercase letter (e.g. 1.2E+2).
* u - the argument is treated as an integer, and presented as an unsigned decimal number.
* f - the argument is treated as a float, and presented as a floating-point number (locale aware).
* F - the argument is treated as a float, and presented as a floating-point number (non-locale aware).
* g - shorter of %e and %f.
* G - shorter of %E and %f.
* o - the argument is treated as an integer, and presented as an octal number.
* s - the argument is treated as and presented as a string.
* x - the argument is treated as an integer and presented as a hexadecimal number (with lowercase letters).
* X - the argument is treated as an integer and presented as a hexadecimal number (with uppercase letters).

### argument numbering/swapping ###
The format string supports argument numbering/swapping. Here is an example:

```javascript
var format = 'There are %d monkeys in the %s',
    text = sprintf(format,12,'world');
```

Imagine, we want to rewrite the text without changing the code itself:

```javascript
var format = 'The %s contains %d',
    text = sprintf(format,12,'world');
```

We have some problems now: The order and type of placeholders does not match the order of arguments in the code. So we have to rewrite the format string:

```javascript
var format = 'The %2$s contains %1$d',
    text = sprintf(format,12,'world');
```

### padding and justifying ###

Point-padded and right justified String, length is 10:
```javascript
var text = sprintf("%'.+10s", "test");
//text == "......test"
```

Point-padded and left justified String, length is 10:
```javascript
var text = sprintf("%'.-10s", "test");
//text == "test......"
```

### precision ###

```javascript
var text = sprintf("%.2f", 3.141);
//text == "3.14"
```

### always signed values ###

```javascript
var text = sprintf("%+.2f", 3.141);
//text == "+3.14"
```

## More examples ##

Check out test/index.html for more examples on `sprintf.js`