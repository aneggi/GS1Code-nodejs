var sscc_test = '08017938001004442'; //17 cifre

let objSscc = {   // total length fixed to 18 (last one is check digit)
        extensionDigit : '0' , // fixed 1 
        GS1CompanyPrefix: '', // variable from 7 to 9
        serialNumber: '000000',   // variable 7 to 9
        checkDigit: '' // fixed 1
        }

const applength = 2;
const extensiondigitlength = 1;
const sscclength = 18;
let gs1prefixlength = -1;
let serialnumberlength = -1;
    
function setLengths(_gs1prefix)  {
    if(_gs1prefix.length < 6 || _gs1prefix.length > 9) return undefined
    gs1prefixlength= _gs1prefix.length;
    serialnumberlength= 18-2- _gs1prefix.length;
}

function  sscc () {
    this.split = function (_sscc) {
            if(_sscc == undefined) return undefined
            return { 
                    extensionDigit : _sscc.substring(0, extensiondigitlength) ,
                    GS1CompanyPrefix: _sscc.substring(extensiondigitlength,extensiondigitlength+gs1prefixlength),
                    serialNumber: parseInt( _sscc.substring(extensiondigitlength+gs1prefixlength, sscclength-1)),
                    checkDigit: _sscc.substring(sscclength-1,sscclength )
                }
    }

    this.first = function (_gs1prefix){
        setLengths(_gs1prefix);
        var _sscc = objSscc.extensionDigit + _gs1prefix + Array(serialnumberlength+1).join('0');
        console.log(_sscc);
        let checkDigit = this.digitCalculate(_sscc);
        console.log(checkDigit);
        return _sscc + checkDigit;
    }

    this.next = function (_sscc, _gs1prefix) {
        setLengths(_gs1prefix);
        _sscc = this.ssccUniform(_sscc);
        _sscc = this.split(_sscc);
        if (!_sscc) return undefined;
        else {
            let i =0;
            let serialend = '';
            for(i=0 ; i< serialnumberlength;i++) {
                serialend.concat('9');
            }
            var _sn = parseInt( _sscc.serialNumber);
            _sn = (_sn + 1).toString();
            if(_sn.length> serialnumberlength ) {_sn = _sn.substring(1,serialnumberlength+1);}
            _sscc.serialNumber =  _sn;          
            var sscc2 = '' + _sscc.extensionDigit +  _sscc.GS1CompanyPrefix + _sscc.serialNumber
            const ssccCheck = this.digitCalculate(sscc2);      
            sscc2 = '' + String(sscc2) + String(ssccCheck);
            return  sscc2
        }
    }
        
    this.ssccUniform = function(_sscc){ //check long and give a 17 digits
        var ssccText = '';
        ssccText = _sscc;
        //if(ssccText.length >20 || ssccText.length< 17 ) 
        if(ssccText.length === 17) return ssccText
        if(ssccText.length === 18) return ssccText.substring(0,17)
        const _sscc2 = ssccText.substring(0,2);
        if(_sscc2 == '00' && ssccText.length == 20) return ssccText.substring(2,19)  
        return undefined
    }

    this.digitCalculate = function(_sscc) {
        var _calculateDigit = 0;
        var _value = 0;
        for( i = 0; i< 17 ; i++){
            if (i % 2 == 0 ) _value = (Number.parseInt(_sscc[i]) * 3)
            else _value = (Number.parseInt(_sscc[i]) * 1)
            _calculateDigit = _calculateDigit + _value;
        }
        const lastDigitCalculated =_calculateDigit % 10 ;
        checkDigit = 10 -  lastDigitCalculated;
        return checkDigit;
    }
    this.ssccFromObj = function (){
        let _sscc = objSscc.extensionDigit + objSscc.GS1CompanyPrefix + objSscc.GS1Serial + objSscc.serialNumber;
        if (objSscc.checkDigit ) _sscc = _sscc + objSscc.checkDigit;
        else _sscc = _sscc + digitCalculate(_sscc);
        return _sscc
    }
    
    this.check = function(_sscc) {
        const _checkResult = this.digitCalculate(_sscc);
        //console.log(_checkResult + ' - Substring:' +_sscc.substring(17,18));
        if (_checkResult == _sscc.substring(17,18)) return true
        else return false
    }

}

module.exports = new sscc();
const mySscc = new sscc('1234567');

//console.log('Final result:' + mySscc.next( '012349999999999992','123456') );
//console.log('Final result first:' + mySscc.first( '100000') );
//console.log('Test split:' + mySscc.split( '080179380010044425').sscc.extensionDigit );