'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var lpad = require( 'utils-left-pad-string' );
var pow = require( 'math-power' );
var bits = require( 'math-float64-bits' );
var lowWord = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof lowWord === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an integer', function test( t ) {
	var w = lowWord( pow( 2, 53 ) );

	t.equal( typeof w, 'number', 'returns a number' );
	t.equal( w%1, 0, 'returns an integer' );

	t.end();
});

tape( 'the function extracts a lower order word from a double-precision floating-point number', function test( t ) {
	var expected;
	var values;
	var low;
	var v;
	var w;
	var i;

	values = [
		5,
		pow( 2, 53 ),
		1e308,
		-1e308,
		-3.14,
		1e-324,
		4.94e-324,
		1.234567890123456789,
		-4.94e-324,
		6.333333333333333333e-310,
		-0,
		0,
		100,
		1/10,
		0.625,
		1/3,
		5e-240,
		-5e-240,
		10,
		15,
		-10,
		-15,
		pow( 2, -42 ),
		-pow( 2, 100 ),
		1,
		-1,
		1.5,
		1111111111111.111111111,
		-1111111111111.111111111,
		pow( 2, 54 ),
		pow( 2, 53 ) + 1,
		pow( 2, 53 ) + 2,
		pow( 2, 55 ),
		pow( 2, 56 ) - 1,
		-pow( 2, 57 ) + 5,
		3*pow( 2, 53 ),
		8*pow( 2, 54 )
	];

	for ( i = 0; i < values.length; i++ ) {
		v = values[ i ];
		w = lowWord( v );

		// Convert to a binary string:
		low = w.toString( 2 );
		low = lpad( low, 32, '0' );

		expected = bits( v ).substring( 32 );
		t.equal( low, expected, 'low equals expected bit string for ' + v );
	}
	t.end();
});

tape( 'if provided `+infinity`, the lower order word is 0 (IEEE754-1985)', function test( t ) {
	var w = lowWord( pinf );
	t.equal( w, 0, 'equals 0' );
	t.end();
});

tape( 'if provided `-infinity`, the lower order word is 0 (IEEE754-1985)', function test( t ) {
	var w = lowWord( ninf );
	t.equal( w, 0, 'equals 0' );
	t.end();
});
