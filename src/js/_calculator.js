class LoanCalculator {
    constructor (total, dp, intRate, duration){
        this.total = total - dp;
        this.interestRate = intRate > 0 ? intRate / 100 / 12 : 0;
        this.duration = duration;
        this.payment = this.calculatePayment();
        this.totalPaid = this.calculateTotalAmountPaid();
        this.schedule = {};
    }

    static round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    calculateTotalAmountPaid(){
        return LoanCalculator.round((this.payment * this.duration), 2);
    }

    calculateInterest(principal){
        return LoanCalculator.round( (this.interestRate) * Math.floor(principal), 2 );
    }

    calculateTotalInterest(){
        return LoanCalculator.round((this.totalPaid - this.total), 2);
    }
    calculatePayment(){
        let x = Math.pow(1 + this.interestRate, this.duration);
        if(this.interestRate === 0) return LoanCalculator.round((this.total / this.duration), 2);
        return LoanCalculator.round((this.total * x * this.interestRate)/(x-1), 2);
    }

    createAmortizationSchedule(){
        let principal = this.total;
        for(let i = 1; i <= this.duration; i++){
            this.schedule[i] = {
                'month': i,
                'principal': LoanCalculator.round(principal, 2),
                'monthlyPayment': this.payment,
                'interestPaid': this.calculateInterest(principal)
            };
            principal -= this.payment - this.calculateInterest(principal);
        }
    }
}

module.exports = LoanCalculator;