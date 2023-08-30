const sprintf = require('../libs/sprintf');

describe('sprintf strings', () => {
    it('inserts basic strings', () => {
        const result = sprintf('hello %s', 'world');
        expect(result).toBe('hello world');
    })

    it('inserts percentage sign', () => {
		expect(sprintf('%%')).toBe('%');
	});
});

describe('integer', () => {
	it('inserts integers on %d', () => {
		expect(sprintf('%d monkeys', 12)).toBe('12 monkeys');
	});

    it('inserts strings as integers on %d', () => {
		expect(sprintf('%d monkeys', '12')).toBe('12 monkeys');
	});
});

describe('hexadecimal', () => {
	it('inserts lowercase hexadecimal values on %x', () => {
		expect(sprintf('value: %x', 255)).toBe('value: ff');
	});

	it('inserts uppercase hexadecimal values on %X', () => {
		expect(sprintf('value: %X', 255)).toBe('value: FF');
	});
});

describe('float', () => {
	it('inserts floats on %f', () => {
		expect(sprintf('%f', 3.141)).toBe('3.141');
	});

	it('inserts strings as floats on %f', () => {
    	expect(sprintf('%f', '12.01')).toBe('12.01');
    });

    it('inserts floats with fixed 2 decimals on %.2f', () => {
    	expect(sprintf('%.2f', 3.141)).toBe('3.14');
    });

    it('inserts positive floats with fixed decimals always signed on %+.2f', () => {
    	expect(sprintf('%+.2f', 3.141)).toBe('+3.14');
    });

    it('inserts negative floats with fixed decimals always signed on %+.2f', () => {
    	expect(sprintf('%+.2f', -3.141)).toBe('-3.14');
    });
});

describe('scientific notation', function() {
	it('without precision, lowercase e ok', () => {
	    expect(sprintf('%e', 3000000000000)).toBe('3e+12');
	});
	it('with precision=4, lowercase e ok', () => {
	    expect(sprintf('%.4e', 1234.56789)).toBe('1.2346e+3');
	});
	it('without precision, uppercase e ok', () => {
	    expect(sprintf('%E', 3000000000000)).toBe('3E+12');
	});
	it('with precision=4, uppercase e ok', () => {
	    expect(sprintf('%.4E', 1234.56789)).toBe('1.2346E+3');
	});
});

describe('float or scientific notation', function() {
	it('without precision, should be exponential, lowercase e ok', () => {
	    expect(sprintf('%g', 3000000000000)).toBe('3e+12');
	});
	it('with precision=4, should be float ok', () => {
	    expect(sprintf('%.4g', 1234.56789)).toBe('1234.5679');
	});
	it('without precision, should be exponential, uppercase e ok', () => {
	    expect(sprintf('%G', 3000000000000)).toBe('3E+12');
	});
	it('with precision=4, should be float ok', () => {
	    expect(sprintf('%.4G', 1234.56789)).toBe('1234.5679');
	});
});

describe('octal', function() {
	it('inserts octal numbers', () => {
	    expect(sprintf('%o', 8)).toBe('10');
	});
	it('inserts negative octal numbers', () => {
	    expect(sprintf('%o', -8)).toBe('-10');
	});
	it('inserts octal numbers from strings', () => {
	    expect(sprintf('%o', '8')).toBe('10');
	});
});

describe('binary', function() {
	it('inserts binary values', () => {
	    expect(sprintf('%b', 255)).toBe('11111111');
	});
	it('inserts binary values from strings', () => {
	    expect(sprintf('%b', '255')).toBe('11111111');
	});
});

describe('unsigned integer', function() {
	it('removes signs from floats', () => {
	    expect(sprintf('%u', -3.141)).toBe('3');
	});
});

describe('char', function() {
	it('replaces with charcode on %c', () => {
	    expect(sprintf('%c', 65)).toBe('A');
	});
	it('replaces with charcode on %c', () => {
	    expect(sprintf('%c', 66)).toBe('B');
	});
	it('replaces with charcode from string on %c', () => {
	    expect(sprintf('%c', '65')).toBe('A');
	});
});

describe('sprintf argument order', function() {
	it('multiple arguments in correct order', () => {
	    expect(sprintf('%3.1f%% of %d MB used', 34.56, 1024)).toBe('34.6% of 1024 MB used');
	});
	it('respects manual defined order', () => {
	    expect(sprintf('%2$3.1f%% of %1$d MB used', 1024, 34.56)).toBe('34.6% of 1024 MB used');
	});
	it('respects manual defined order', () => {
	    expect(sprintf('My %2$s account: %1$\'.+10.2f %3$s', 0.592, 'giro', 'EUR')).toBe('My giro account: .....+0.59 EUR');
	});
});

describe('strings', function() {
	it('adds dots and justifies right', () => {
	    expect(sprintf('%\'.+10s', 'A')).toBe('.........A');
	});
	it('adds dots and justifies left', () => {
	    expect(sprintf('%\'.-10s', 'A')).toBe('A.........');
	});
});