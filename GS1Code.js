// 00 080179380010044425
var sscc_test = '08017938001004442'; //17 cifre
//var GS1CompanyPrefix = '';
//const applicationIdentifier = '00';
//const extensionDigit = '0';
//var serialReference = '';
//var checkDigit = '';


//console.log('SSCC_TEST=' + sscc_test);
//console.log('Test method -> Create base SSCC:' + createBase() );

//const sscc1 = sscc;


//console.log('Test method -> ssccLong17: (17)' + sscc().ssccLong17('08017938001004442') );
//console.log('Test method -> ssccLong17: (18)' + sscc().ssccLong17('080179380010044421') );
//console.log('Test method -> ssccLong17: (20)' + sscc().ssccLong17('00080179380010044422') );
//console.log('Test method -> ssccLong17: (20)*' + sscc().ssccLong17('01080179380010044422') );
//console.log('Test method -> Next:' + sscc().ssccLong17('08017938001004442') );

 let objSscc = { 
        extensionDigit : '0' ,
        GS1CompanyPrefix: '',
        GS1Serial: '000', 
        serialNumber: '000000',
        checkDigit: ''
        }

function  sscc () {

        
    this.ssccLong17 = function(_sscc){
        var ssccText = '';
        ssccText = _sscc;
        //if(ssccText.length >20 || ssccText.length< 17 ) 
        if(ssccText.length === 17) return _sscc
        if(ssccText.length === 18) return _sscc.substring(0,17)
        if(_sscc.substring(0,2) === '00' && ssccText.length === 20) _sscc.substring(2,20)
        return undefined
    }

    this.digitCalculate = function(_sscc) {
        //string.match(/^[0-9]+$/) != null; add check 17 digits
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
        //console.log(this.split(checkDigit));
        return checkDigit;
    }
    this.ssccFromObj = function (){
        let _sscc = objSscc.extensionDigit + objSscc.GS1CompanyPrefix + objSscc.GS1Serial + objSscc.serialNumber;
        if (objSscc.checkDigit ) _sscc = _sscc + objSscc.checkDigit;
        else _sscc = _sscc + digitCalculate(_sscc);
        return _sscc
    }
    this.split = function (_sscc) {
        if (!this.check(_sscc)) return { result: 'error', message: 'Check digit is not right...' }
        
        else {
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
    }

    this.check = function(_sscc) {
        const _checkResult = this.digitCalculate(_sscc.substring(0,17));
        console.log(_checkResult + ' - Substring:' +_sscc.substring(17,18));
        if (_checkResult == _sscc.substring(17,18)) return true
        else return false
    }

}

module.exports = new sscc();
const mySscc = new sscc();
console.log('Test method -> ssccLong17: (16)' + mySscc.check( '080179380010044425') );