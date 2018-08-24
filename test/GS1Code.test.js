const sscc = require('../GS1Code');

describe('SSCC digitCalculate', () =>{

    it('should return number 5', ()=> {
        const result = sscc.digitCalculate('08017938001004442');
        expect(result).toBe(5);
    });


});

describe('SSCC next', () =>{

    it('should return undefined', ()=> {
        const result = sscc.next('0801793800100444251','123413');
        expect(result).toBe(undefined);
    });

    it('should return code: 080179380010044432', ()=> {
        const result = sscc.next('080179380010044425','123413');
        expect(result).toBe('080179380010044432');
    });

    it('should return code: 012349900000000002', ()=> {
        const result = sscc.next('012349999999999992','123493');
        expect(result).toBe('012349900000000002');
    });

    it('should return undefined', ()=> {
        const result = sscc.next('0801793800100444','123413');
        expect(result).toBe(undefined);
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


describe('SSCC first', () =>{

    it('should return true', ()=> {
        const result = sscc.check('080179380010044425');
        expect(result).toBe(true);
    });

    it('should return false', ()=> {
        const result = sscc.check('080189380010044425');
        expect(result).toBe(false);
    });
    

});

describe('SSCC uniform', () =>{

    it('should return 08017938001004442', ()=> {
        const result = sscc.ssccUniform('08017938001004442');
        expect(result).toBe('08017938001004442');
    });

    it('should return 08017938001004442', ()=> {
        const result = sscc.ssccUniform('080179380010044425');
        expect(result).toBe('08017938001004442');
    });

    it('should return 08017938001004442', ()=> {
        const result = sscc.ssccUniform('00080179380010044425');
        expect(result).toBe('08017938001004442');
    });

    it('should return false', ()=> {
        const result = sscc.ssccUniform('01080179380010044425');
        expect(result).toBe(undefined);
    });

    
    
    

});


