sprintf.js
==========

[![CI](https://github.com/joside/sprintf.js/actions/workflows/ci.yml/badge.svg)](https://github.com/joside/sprintf.js/actions/workflows/ci.yml)

Another implementation of the classic `sprintf` in JavaScript. No dependencies, one file, works in Node.js and in the browser.

```javascript
sprintf('%d monkeys in the %s', 12, 'tree');   // "12 monkeys in the tree"
sprintf('%3.1f%% of %d MB used', 34.56, 1024); // "34.6% of 1024 MB used"
sprintf('%05.1f', 3.14159);                    // "003.1"
```

## Installation

### Node.js

Install it straight from GitHub:

```bash
npm install github:joside/sprintf.js
```

```javascript
const sprintf = require('sprintf');
```

### Browser

Copy `libs/sprintf.js` into your project and include it. It defines a global `sprintf` function:

```html
<script src="/path/to/sprintf.js"></script>
<script>
  document.title = sprintf('hello %s', 'world');
</script>
```

AMD loaders (e.g. RequireJS) are supported as well.

## Usage

```
String sprintf(String format [, mixed ...arguments])
```

The format string is copied to the result, with every placeholder replaced by a formatted argument. Text inside the arguments is never parsed as a placeholder.

`sprintf` returns `undefined` when it is called without a format, when a positional argument (`%3$s`) points to an argument that does not exist, or when positional and sequential placeholders are mixed.

### Placeholder syntax

```
%[argnum$][padding][-][+][width][.precision]type
```

All parts except `%` and the type are optional and must appear in this order:

| Part        | Meaning |
|-------------|---------|
| `argnum$`   | Use the argument at this position (1-based), e.g. `%2$s`. |
| `padding`   | Character used to reach `width`: a space (default), `0`, or any character prefixed with `'`, e.g. `'.` |
| `-`         | Left-justify inside `width` (default: right-justify). |
| `+`         | Prefix positive numbers with `+`. |
| `width`     | Minimum length of the result. |
| `.precision`| Number of decimals for `e`, `E`, `f`, `F`, `g`, `G`; maximum length for `s`. |

With `0` padding the sign stays in front: `sprintf('%05d', -42)` is `"-0042"`.

### Types

| Type | Output |
|------|--------|
| `%`  | A literal percent sign. Takes no argument. |
| `b`  | Integer as binary number (unsigned). |
| `c`  | Integer as the character with that character code. |
| `d`, `i` | Integer as signed decimal number. |
| `u`  | Integer as unsigned decimal number. |
| `o`  | Integer as octal number. |
| `x`, `X` | Integer as hexadecimal number, lowercase / uppercase letters. |
| `e`, `E` | Number in scientific notation, e.g. `1.2e+2` / `1.2E+2`. Without precision all significant digits are kept. |
| `f`, `F` | Number in fixed-point notation. Without precision the number is printed as is. |
| `g`, `G` | The shorter of `f` and `e` / `E`. |
| `s`  | String. |

## Examples

### Argument numbering

Placeholders can refer to arguments by position. That way a format string can be reordered (for example for translations) without touching the code that passes the arguments:

```javascript
sprintf('There are %1$d monkeys in the %2$s', 12, 'world'); // "There are 12 monkeys in the world"
sprintf('The %2$s contains %1$d monkeys', 12, 'world');     // "The world contains 12 monkeys"
```

### Padding and justifying

```javascript
sprintf("%'.10s", 'test');  // "......test"
sprintf("%'.-10s", 'test'); // "test......"
sprintf('%05d', 42);        // "00042"
```

### Precision

```javascript
sprintf('%.2f', 3.141); // "3.14"
sprintf('%.0f', 2.7);   // "3"
sprintf('%.3s', 'abcdef'); // "abc"
```

### Always signed values

```javascript
sprintf('%+.2f', 3.141);  // "+3.14"
sprintf('%+.2f', -3.141); // "-3.14"
```

More examples are in `index.html` and in `test/sprintf.spec.js`.

## Development

The tests use the test runner built into Node.js (`node:test`), so there are no dependencies to install. Node.js 18 or newer is required.

```bash
npm test
```

`npm run test:watch` runs the tests in watch mode.
