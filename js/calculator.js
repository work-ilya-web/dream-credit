///Calculator
$(document).ready(function () {

    function createEmptyTable() {
        $('.calc-credit').slideUp(400);
        $('.calc-credit').append(`
	<div class="credit-table table-responsive">
				  <div class="top">
                    <div class="title">График платежей</div>
                </div>
				 <div class="payment-schedule__table">
                    <div class="payment-schedule__thead flex">
                                <div class="payment-schedule__th">
                                    <div class="payment-schedule__caption">
                                        <span>Месяц платежа</span><span>#</span>
                                    </div>
                                </div>
                                <div class="payment-schedule__th">
                                    <div class="payment-schedule__caption">Сумма платежа</div>
                                </div>
                                <div class="payment-schedule__th">
                                    <div class="payment-schedule__caption">Основной долг</div>
                                </div>
                                <div class="payment-schedule__box flex">
                                    <div class="payment-schedule__th">
                                        <div class="payment-schedule__caption">Начисленные проценты</div>
                                    </div>
                                    <div class="payment-schedule__th">
                                        <div class="payment-schedule__caption">Остаток задолженности на конец месяца</div>
                                    </div>
                                </div>
                            </div>
					<div class="payment-schedule__tbody"></div>
				</div>
			</div>
		`);
    }

    function calculateAnn(noresults = false) {
        let creditData = {},
            overprice = 0;

        $('.credit-table').find('.payment-schedule__tbody').empty();

        $('.mortgage-form .mortgage-form__input').each((index, el) => {
            switch (index) {
                case 0:
                    creditData.fullPrice = parseFloat(el.value.replace(/ /g, ''));
                    break;
                case 1:
                    creditData.firstPayment = parseFloat(el.value.replace(/ /g, ''));
                    break;
                case 3:
                    creditData.year = parseFloat(el.value);
                    break;
                case 4:
                    creditData.percent = parseFloat(el.value.replace(/,/, '.'));
                    break;
            }
        });

        let months = creditData.year * 12,
            creditYearPercent = creditData.percent / 100 / 12,
            creditPercentPiece = creditData.fullPrice * creditYearPercent,
            creditLeft = creditData.fullPrice - creditData.firstPayment,
            monthPayMain = 0,
            hideRow = '',
            showRow = false;

        creditData.monthPay = creditLeft * (creditYearPercent + (creditYearPercent / ((Math.pow((1 + creditYearPercent), months)) - 1)));

        for (let i = 1; i <= months; ++i) {
            creditPercentPiece = creditLeft * creditYearPercent;
            monthPayMain = creditData.monthPay - creditPercentPiece;
            creditLeft = creditLeft - monthPayMain;

            if (creditLeft < 0) {
                creditLeft = 0;
            }

            if ((i > 6 && i < (months - 5))) {
                hideRow = ' class="hidden"';
                showRow = true;
            } else {
                hideRow = '';
            }

            if (!noresults) {
                $('.credit-table').find('.payment-schedule__tbody').append(`
				<div class="payment-schedule__tr flex">
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${i}</div>
                        </div>
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${numFormat(creditData.monthPay.toFixed(2))}</div>
                        </div>
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${numFormat(monthPayMain.toFixed(2))}</div>
                        </div>
                        <div class="payment-schedule__box flex">
                            <div class="payment-schedule__td">
                                <div class="payment-schedule__caption">Начисленные проценты:</div>
                                <div class="payment-schedule__value">${numFormat(creditPercentPiece.toFixed(2))}</div>
                            </div>
                            <div class="payment-schedule__td">
                                <div class="payment-schedule__caption">Остаток задолженности на конец месяца:</div>
                                <div class="payment-schedule__value">${numFormat(creditLeft.toFixed(2))}</div>
                            </div>
                        </div>
                    </div>
				`);
            }
            overprice = overprice + creditPercentPiece;
            $('._all-overpay b').html(numFormat(Math.round(overprice)));
        }
        $('._month-pay b').html(numFormat(creditData.monthPay.toFixed(2)));
        if (!noresults) {
            $('.calc-credit').slideDown(400);
        }
    }

    function calculateDiff(noresults = false) {
        let date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth(),
            creditData = {};

        $('.credit-table').find('.payment-schedule__tbody').empty();

        $('.mortgage-form .mortgage-form__input').each((index, el) => {
            switch (index) {
                case 0:
                    creditData.fullPrice = parseFloat(el.value.replace(/ /g, ''));
                    break;
                case 1:
                    creditData.firstPayment = parseFloat(el.value.replace(/ /g, ''));
                    break;
                case 3:
                    creditData.year = parseFloat(el.value);
                    break;
                case 4:
                    creditData.percent = parseFloat(el.value.replace(/,/, '.'));
                    break;
            }
        });

        let months = creditData.year * 12,
            daysInYear = 0,
            year = 0,
            overprice = 0,
            creditLeft = creditData.fullPrice - creditData.firstPayment,
            monthPay = creditLeft / months,
            periodMonthPayment = [],
            hideRow = '',
            showRow = false;

        for (let i = 1; i <= months; ++i) {
            year = parseInt(y + ((m + i - 1) / 12));

            if (isLeapYear(year)) {
                daysInYear = 366;
            } else {
                daysInYear = 365;
            }

            percentMonthPayment = creditData.fullPrice * (creditData.percent / 100) * daysInMonth(m + i, y) / daysInYear;
            totalMonthPayment = monthPay + percentMonthPayment;
            creditLeft = creditLeft - monthPay;

            if (creditLeft < 0) {
                creditLeft = 0;
            }

            if ((i > 6 && i < (months - 5))) {
                hideRow = ' class="hidden"';
                showRow = true;
            } else {
                hideRow = '';
            }

            if (!noresults) {
                $('.credit-table').find('.payment-schedule__tbody').append(`
				<div class="payment-schedule__tr flex">
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${i}</div>
                        </div>
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${numFormat(totalMonthPayment.toFixed(2))}</div>
                        </div>
                        <div class="payment-schedule__td">
                            <div class="payment-schedule__value">${numFormat(monthPay.toFixed(2))}</div>
                        </div>
                        <div class="payment-schedule__box flex">
                            <div class="payment-schedule__td">
                                <div class="payment-schedule__caption">Начисленные проценты:</div>
                                <div class="payment-schedule__value">${numFormat(percentMonthPayment.toFixed(2))}</div>
                            </div>
                            <div class="payment-schedule__td">
                                <div class="payment-schedule__caption">Остаток задолженности на конец месяца:</div>
                                <div class="payment-schedule__value">${numFormat(creditLeft.toFixed(2))}</div>
                            </div>
                        </div>
                    </div>
				`);
            }

            switch (i) {
                case 1:
                    periodMonthPayment['from'] = Math.round(totalMonthPayment);
                    break;
                case months:
                    periodMonthPayment['to'] = Math.round(totalMonthPayment);
                    break;
                default:
                    break;
            }

            overprice = overprice + percentMonthPayment;
            $('._all-overpay b').html(numFormat(Math.round(overprice)));
        }
        $('._month-pay b').html(numFormat(periodMonthPayment['from']) + ' - ' + numFormat(periodMonthPayment['to']));
        if (!noresults) {
            $('.calc-credit').slideDown(400);
        }
    }

    function calculate() {
        $('.calc-credit').slideUp(400);
        let calc = $('.mortgage-result__buttons').find('.active').data('calc');
        switch (calc) {
            case 'calculateDiff':
                calculateDiff(true);
                break;
            case 'calculateAnn':
                calculateAnn(true);
                break;
            default:
                $('.calc-button-ann').addClass('active');
                calculateAnn(true);
                break;
        }
    }

    function numFormat(num) {
        return num.toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ');
    }

    function plural(num, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
    }

    function isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function daysInMonth(m, y) {
        return new Date(y, m, 0).getDate();
    }

    function reinitSlider(slider_name) {
        let total_amount = s_total_amount.result.from,
            first_percent = s_first_percent.result.from.toFixed(1),
            first_payment = s_first_payment.result.from,
            period = s_period.result.from,
            interest_rate = s_interest_rate.result.from.toFixed(1),
            first_percent_max = s_first_percent.result.max,
            first_payment_max = Math.round(total_amount * first_percent_max / 100),
            new_percent = (first_payment / total_amount * 100).toFixed(1),
            new_payment = Math.round(first_percent * total_amount / 100);
        switch (slider_name) {
            case 'total_amount':
                first_payment = first_payment > first_payment_max ? first_payment_max : first_payment;
                new_percent = (first_payment / total_amount * 100).toFixed(1);
                if (total_amount == 0) {
                    first_payment = 0;
                    new_percent = 0;
                }
                $('input.total_amount').prop('value', numFormat(total_amount));
                $('input.first_payment').prop('value', numFormat(first_payment));
                $('input.first_percent').prop('value', new_percent);
                s_first_payment.update({
                    from: first_payment,
                    max: first_payment_max
                });
                s_first_percent.update({
                    from: new_percent
                });
                break;

            case 'first_payment':
                $('input.first_payment').prop('value', numFormat(first_payment));
                $('input.first_percent').prop('value', new_percent);
                s_first_percent.update({
                    from: new_percent
                });
                break;

            case 'first_percent':
                $('input.first_payment').prop('value', numFormat(new_payment));
                $('input.first_percent').prop('value', first_percent);
                s_first_payment.update({
                    from: new_payment
                });
                break;

            case 'period':
                $('input.period').prop('value', period);
                $('input.period + span').text(plural(period, ['Год', 'Года', 'Лет']));
                break;

            case 'interest_rate':
                $('input.interest_rate').prop('value', interest_rate);
                break;

            default:
                break;
        }
    }

    function updateRange(slider_name, from) {
        eval(`s_${slider_name}`).update({
            from: from
        });
    };

    $('.mortgage-form__row').each(function () {
        let $slider = $(this).find('.js-range-slider'),
            $input = $(this).find('.mortgage-form__input'),
            slider_name = $input.data('slider');
        $slider.ionRangeSlider({
            hide_min_max: true,
            hide_from_to: true,
            grid: true,
            onStart: function (data) {
                $input.prop('value', data.from_pretty);
            },
            onChange: function (data) {
                reinitSlider(slider_name);
                calculate();
            }
        });
    });

    calculate();
    createEmptyTable();

    let s_total_amount = $('#total_amount').data('ionRangeSlider'),
        s_first_payment = $('#first_payment').data('ionRangeSlider'),
        s_first_percent = $('#first_percent').data('ionRangeSlider'),
        s_period = $('#period').data('ionRangeSlider'),
        s_interest_rate = $('#interest_rate').data('ionRangeSlider');

    $('.mortgage-form__input').on('keypress', function (e) {
        if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            e.preventDefault();
        }
    });

    $('.mortgage-form__input').on('keyup', function () {
        $(this).val(numFormat($(this).val().replace(/[^0-9\.]/g, '')));
    });

    $('.mortgage-form__input').on('change', function () {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        let slider_name = $(this).data('slider'),
            new_from = $(this).prop('value'),
            max = eval(`s_${slider_name}`).result.max;
        from = new_from > max ? max : new_from;
        from = new_from < 0 ? 0 : new_from;
        updateRange(slider_name, from);
        reinitSlider(slider_name);
        calculate();
    });

    // Set event handler
    $('.calc-button-ann').on('click', function () {
        $('.calc-button-diff').removeClass('active');
        $(this).addClass('active');
        calculateAnn();
    });

    $('.calc-button-diff').on('click', function () {
        $('.calc-button-ann').removeClass('active');
        $(this).addClass('active');
        calculateDiff();
    });

    // calc and scroll to results
    $('.btn-results').on('click', function (e) {
        e.preventDefault();

        let to = $(this).data('to'),
            calc = $('.mortgage-result__buttons').find('.active').data('calc'),
            delay = 400;

        switch (calc) {
            case 'calculateDiff':
                calculateDiff();
                break;
            case 'calculateAnn':
                calculateAnn();
                break;
            default:
                $('.calc-button-ann').addClass('active');
                calculateAnn();
                break;
        }

        $('body, html').animate({
            scrollTop: $('.' + to).offset().top
        }, delay);
    });


    // show all table
    $(document).on('click', '.credit-table__result a', function (e) {
        e.preventDefault();
        $('.credit-table__result').remove();
        $('.credit-table tr.hidden').removeClass('hidden');
    });

});