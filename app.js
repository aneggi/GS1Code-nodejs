


// 00 080179380010044425
var sscc = '08017938001004442';

var GS1CompanyPrefix = '';

const applicationIdentifier = '00';

const extensionDigit = '0';


var serialReference = '';

var checkDigit = '';


function checkDigitCalculate(_sscc) {
    var _calculateDigit = 0;
    var _value = 0;
    for( i = 0; i< 17 ; i++){
        if (i % 2 == 0 ) _value = (Number.parseInt(_sscc[i]) * 3)
        else _value = (Number.parseInt(_sscc[i]) * 1)
        _calculateDigit = _calculateDigit + _value;
        //console.log (`Calculating...is ${i % 2 == 0}  (Stringa[${i}]- ${_sscc[i]}) -> ${_value} Sum:${_calculateDigit}  `);
    }
    const lastDigitCalculated =_calculateDigit % 10 ;
    //console.log('Units: ', lastDigitCalculated);
    if (lastDigitCalculated >4 ) checkDigit = 10 -  lastDigitCalculated;
    else checkDigit = lastDigitCalculated;
    //console.log('Check digit is: ', checkDigit);

    console.log(split(sscc + checkDigit));

    return sscc + checkDigit ;
}



function split(_sscc) {
    
    //check is is valid

    //split 
    return { 
        result: 'OK',
        sscc: [{
            extensionDigit : _sscc.substring(0, 1) ,
        GS1CompanyPrefix: _sscc.substring(1, 8),
        GS1Serial: _sscc.substring(8, 11), 
        serialNumber: _sscc.substring(11, 17),
        checkDigit: _sscc.substring(17, 18)
        }]
        
     }
}


console.log(checkDigitCalculate(sscc));