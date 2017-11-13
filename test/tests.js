const assert = require('assert');
const sprintf = require('../libs/sprintf.js');

describe('strings', () => {
	it('inserts basic strings', () => {
		assert.equal(sprintf('hello %s', 'world'), 'hello world');
	});

	it('inserts percentage sign', () => {
		assert.equal(sprintf('%%'), '%');
	});
});

describe('integer', () => {
	it('inserts integers on %d', () => {
		assert.equal(sprintf('%d monkeys', 12), '12 monkeys');
	});

    it('inserts strings as integers on %d', () => {
		assert.equal(sprintf('%d monkeys', '12'), '12 monkeys');
	});
});

describe('hexadecimal', () => {
	it('inserts lowercase hexadecimal values on %x', () => {
		assert.equal(sprintf('value: %x', 255), 'value: ff');
	});

	it('inserts uppercase hexadecimal values on %X', () => {
		assert.equal(sprintf('value: %X', 255), 'value: FF');
	});
});

describe('float', () => {
	it('inserts floats on %f', () => {
		assert.equal(sprintf('%f', 3.141), '3.141');
	});

	it('inserts strings as floats on %f', () => {
    	assert.equal(sprintf('%f', '12.01'), '12.01');
    });

    it('inserts floats with fixed 2 decimals on %.2f', () => {
    	assert.equal(sprintf('%.2f', 3.141), '3.14');
    });

    it('inserts positive floats with fixed decimals always signed on %+.2f', () => {
    	assert.equal(sprintf('%+.2f', 3.141), '+3.14');
    });

    it('inserts negative floats with fixed decimals always signed on %+.2f', () => {
    	assert.equal(sprintf('%+.2f', -3.141), '-3.14');
    });
});

describe('scientific notation', function() {
	it('', () => {
	    assert.equal(sprintf('%e', 3000000000000), '3e+12', 'without precision, lowercase e ok');
	});
	it('', () => {
	    assert.equal(sprintf('%.4e', 1234.56789), '1.2346e+3', 'with precision=4, lowercase e ok');
	});
	it('', () => {
	    assert.equal(sprintf('%E', 3000000000000), '3E+12', 'without precision, uppercase e ok');
	});
	it('', () => {
	    assert.equal(sprintf('%.4E', 1234.56789), '1.2346E+3', 'with precision=4, uppercase e ok');
	});
});

describe('float or scientific notation', function() {
	it('', () => {
	    assert.equal(sprintf('%g', 3000000000000), '3e+12', 'without precision, should be exponential, lowercase e ok');
	});
	it('', () => {
	    assert.equal(sprintf('%.4g', 1234.56789), '1234.5679', 'with precision=4, should be float ok');
	});
	it('', () => {
	    assert.equal(sprintf('%G', 3000000000000), '3E+12', 'without precision, should be exponential, uppercase e ok');
	});
	it('', () => {
	    assert.equal(sprintf('%.4G', 1234.56789), '1234.5679', 'with precision=4, should be float ok');
	});
});

describe('octal', function() {
	it('inserts octal numbers', () => {
	    assert.equal(sprintf('%o', 8), '10');
	});
	it('inserts negative octal numbers', () => {
	    assert.equal(sprintf('%o', -8), '-10');
	});
	it('inserts octal numbers from strings', () => {
	    assert.equal(sprintf('%o', '8'), '10');
	});
});

describe('binary', function() {
	it('inserts binary values', () => {
	    assert.equal(sprintf('%b', 255), '11111111');
	});
	it('inserts binary values from strings', () => {
	    assert.equal(sprintf('%b', '255'), '11111111');
	});
});

describe('unsigned integer', function() {
	it('removes signs from floats', () => {
	    assert.equal(sprintf('%u', -3.141), '3');
	});
});

describe('char', function() {
	it('replaces with charcode on %c', () => {
	    assert.equal(sprintf('%c', 65), 'A');
	});
	it('replaces with charcode on %c', () => {
	    assert.equal(sprintf('%c', 66), 'B');
	});
	it('replaces with charcode from string on %c', () => {
	    assert.equal(sprintf('%c', '65'), 'A', '\'65\' to A ok');
	});
});

describe('sprintf argument order', function() {
	it('multiple arguments in correct order', () => {
	    assert.equal(sprintf('%3.1f%% of %d MB used', 34.56, 1024), '34.6% of 1024 MB used');
	});
	it('respects manual defined order', () => {
	    assert.equal(sprintf('%2$3.1f%% of %1$d MB used', 1024, 34.56), '34.6% of 1024 MB used');
	});
	it('respects manual defined order', () => {
	    assert.equal(sprintf('My %2$s account: %1$\'.+10.2f %3$s', 0.592, 'giro', 'EUR'), 'My giro account: .....+0.59 EUR');
	});
});

describe('strings', function() {
	it('adds dots and justifies right', () => {
	    assert.equal(sprintf('%\'.+10s', 'A'), '.........A');
	});
	it('adds dots and justifies left', () => {
	    assert.equal(sprintf('%\'.-10s', 'A'), 'A.........');
	});
});