const sscc = require('../GS1Code');

describe('SSCC digitCalculate', () =>{

    it('should return number 5', ()=> {
        const result = sscc.digitCalculate('08017938001004442');
        expect(result).toBe(5);
    });


});

describe('SSCC check', () =>{

    it('should return true', ()=> {
        const result = sscc.check('080179380010044425');
        expect(result).toBe(true);
    });

    it('should return false', ()=> {
        const result = sscc.check('080189380010044425');
        expect(result).toBe(false);
    });
    

});


