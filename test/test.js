let chai = require('chai');
chai.should();
let LoanCalculator = require('../src/js/_calculator');

describe('LoanCalculator', () => {
    describe('#round', () => {
        let result;

        it('rounds the amount to the indicated decimals', function () {
            result = LoanCalculator.round(455.345221, 2);
            result.should.equal(455.35);
        });
    });

    describe('#total', () => {
        let loanCalculator;
        beforeEach(function () {
            loanCalculator = new LoanCalculator(1500, 0, 10, 36);
        });

        it('returns the total minus down payment', function () {
            loanCalculator.total.should.equal(1500);
        });

        it('can be changed', function () {
            loanCalculator.total = 30000;
            loanCalculator.total.should.equal(30000);
        });
    });

    describe('#duration', () => {
        let loanCalculator;
        beforeEach(function () {
            loanCalculator = new LoanCalculator(1500, 0, 10, 36);
        });
        it('returns the duration', function () {
            loanCalculator.duration.should.equal(36);
        });

        it('can be changed', function () {
            loanCalculator.duration = 48;
            loanCalculator.duration.should.equal(48);
        });
    });
});