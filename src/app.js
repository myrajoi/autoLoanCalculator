import 'bootstrap';
import './scss/app.scss';
import './js/_validate';
import './js/_calculator';

let LoanCalculator = require('./js/_calculator');

let vehiclePrice = document.getElementById('vehiclePrice');
let termInMonths = document.getElementById('termInMonths');
let interestPercentage = document.getElementById('interestRate');
let downPayment = document.getElementById('downPayment');

vehiclePrice.addEventListener('change', calculate);
interestPercentage.addEventListener('change', calculate);
termInMonths.addEventListener('change', calculate);
downPayment.addEventListener('change', calculate);

function convertToCurrency(amount) {
    return '$' + (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function append_json(schedule) {
    let table = document.getElementById('js-tbody');
    if (table.hasChildNodes()) {
        table.innerHTML = ''
    }
    for (let key in schedule) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + schedule[key].month + '</td>' +
            '<td>' + convertToCurrency(schedule[key].principal) + '</td>' +
            '<td>' + convertToCurrency(schedule[key].monthlyPayment) + '</td>' +
            '<td>' + convertToCurrency(schedule[key].interestPaid) + '</td>';
        table.appendChild(tr);
    }
}

function calculate() {
    let _vehiclePrice = parseInt(vehiclePrice.value);
    let _interestRate = parseInt(interestPercentage.value);
    let _downPayment = downPayment.value !== '' ? parseInt(downPayment.value) : 0;
    let paymentElement = document.querySelector('.monthly-payment');
    let interestElement = document.querySelector('.interest-paid');
    let paymentAndInterestElement = document.querySelector('.principal-and-interest');
    let duration = termInMonths.value;

    let autoLoanCalculator = new LoanCalculator(_vehiclePrice, _downPayment, _interestRate, duration);

    if (vehiclePrice.value !== '') {
        let calculatedInterest = interestPercentage.value > 0 ? autoLoanCalculator.calculateTotalInterest() : 0;

        paymentElement.innerHTML = convertToCurrency(autoLoanCalculator.payment);
        paymentAndInterestElement.innerHTML = convertToCurrency(calculatedInterest + _vehiclePrice);
        interestElement.innerHTML = convertToCurrency(calculatedInterest);

        autoLoanCalculator.createAmortizationSchedule();

        let schedule = autoLoanCalculator.schedule;
        append_json(schedule);
    }
}
document.addEventListener('DOMContentLoaded', calculate);
