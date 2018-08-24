const sscc = require('../GS1Code');

describe('SSCC digitCalculate', () =>{
    it('should return check digit = 5', ()=> {
        const result = sscc.digitCalculate('08017938001004442');
        expect(result).toBe(5);
    });
});

describe('SSCC next', () =>{
    it('Invalid SSCC, long 19', ()=> {
        const result = sscc.next('0801793800100444251','123413');
        expect(result).toBe(undefined);
    });
    it('Normal case to increment +1 serial number', ()=> {
        const result = sscc.next('080179380010044425','123413');
        expect(result).toBe('080179380010044432');
    });
    it('Last serial number code 999... should go to 000...', ()=> {
        const result = sscc.next('012349999999999992','123493');
        expect(result).toBe('012349900000000002');
    });
    it('Invalid SSCC too short, 16', ()=> {
        const result = sscc.next('0801793800100444','123413');
        expect(result).toBe(undefined);
    });
});

describe('SSCC check', () =>{
    it('Valid check digit', ()=> {
        const result = sscc.check('080179380010044425');
        expect(result).toBe(true);
    });
    it('Invalid check digit', ()=> {
        const result = sscc.check('080189380010044425');
        expect(result).toBe(false);
    });

});

describe('SSCC first', () =>{
    it('Crea', ()=> {
        const result = sscc.first('1234567');
        expect(result).toBe('012345670000000008');
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


