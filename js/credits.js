$(document).ready(function() {
    initFilters(banksData);
    // $.ajax({
    //     url: 'getData.php',
    //     method: 'GET',
    //     dataType: 'json',
    //     success: initFilters
    // });
});

function initFilters(banksData) {
    let filter = [];
    renderBanks(banksData);
    $('.promo__form-coll_banks :checkbox').change(function() {
        const bankPill = `
            <div class="promo__form-argument">
                <div class="promo__form-argument__closed img-contain">
                    <img src="images/icons/close-blue.svg" alt="">
                </div>
                <div class="promo__form-argument__name">${$(this).val()}</div>
            </div>`;
        $('.promo__form-selected').append(bankPill);
    });

    $('#fast_filter :checkbox').change(function() {
        const name = $(this).data('name');
        const filter_rule = $(this).data('filter-rule');
        const value = $(this).is(':checked');
        if (value) {
            filter.push({
                rule: filter_rule,
                name,
                value
            });
        } else {
            filter = filter.filter(item => item.name !== name);
        }
        const filtered = filterBanks(banksData, filter);
        renderBanks(filtered);
    });

    $('.promo__form-selected').on('click', '.promo__form-argument__closed', function() {
        const name = $(this).closest('.promo__form-argument').find('.promo__form-argument__name').text();
        $('.promo__form-coll_banks :checkbox[value="' + name + '"]').prop('checked', false);
        $(this).closest('.promo__form-argument').remove();
    });

    $('#getCredits').click(function() {
        const sortingField = $('#sorting_field');
        const sortSelect = sortingField.closest('.select');
        const sortDefault = sortSelect.find('.select-options__value:first');
        sortSelect.find('.select-title__value').html(sortDefault.html());
        sortingField.val(sortDefault.data('value'));

        $('.result__top-slide :checkbox').prop('checked', false);
        filter = collectFilter();
        const filtered = filterBanks(banksData, filter);
        renderBanks(filtered);
        $('#sort').data('direction', 'asc').removeClass('desc');
        $([document.documentElement, document.body]).animate({
            scrollTop: $('.result').offset().top
        }, 600);
    });

    $('#sort').click(function(e) {
        e.preventDefault();
        $(this).data('direction', $(this).data('direction') === 'asc' ? 'desc' : 'asc');
        $(this).toggleClass('desc', $(this).data('direction') !== 'asc');
        const filtered = filterBanks(banksData, filter);
        const sorted = sort(filtered);
        renderBanks(sorted);
    });

    $('#sorting_field').change(function() {
        $(this).data('direction', 'asc');
        const filtered = filterBanks(banksData, filter);
        const sorted = sort(filtered);
        renderBanks(sorted);
    });
}

function collectFilter() {
    const banks = $('.promo__form-selected .promo__form-argument__name');
    let filter = [
        {
            rule: 'range',
            name: 'amount',
            value : $('#total_amount_selection').val()
        },
        {
            rule: 'range',
            name: 'period',
            value : $('#period').val(),
        }
    ];
    if (banks.length > 0) {
        filter.push(
            {
                rule: 'list',
                name: 'bank_name',
                value : banks.length > 0
                    ? $.map(banks, bank => $(bank).text())
                    : '0'
            }
        );
    }

    [...$('.form_data')].forEach(input => {
        if ($(input).val() !== '0') {
            filter.push({
                rule: $(input).data('filter-rule'),
                name: $(input).attr('name'),
                value: $(input).val()
            })
        }
    });
    return filter;
}

function filterBanks(banks, filter) {
    let filtered = [...banks];
    filter.forEach(item => {
        const value = item.value;
        const name = item.name;
        switch (item.rule) {
            case 'range':
                filtered = filtered.filter(bank => value >= bank[name].min && value <= bank[name].max);
                break;
            case 'list':
                filtered = filtered.filter(bank => value.includes(bank[name]));
                break;
            case 'equal':
                filtered = filtered.filter(bank => value == bank[name]);
                break;
        }
    });
    return filtered;
}

function sort(banks) {
    const direction = $('#sort').data('direction');
    const field = $('#sorting_field').val();
    return banks.sort(function(a, b) {
        if (direction === 'asc') {
            return a[field] > b[field] ? 1 : -1;
        } else {
            return a[field] < b[field] ? 1 : -1;
        }
    });
}

function renderBanks(banks) {
    $('#result_banks').html(banks.reduce((r, bank) => r + getBank(bank), ''));
}

function getBank(bankInfo) {
    return `
        <div class="result__tr flex">
            <div class="result__td">
                <div class="result__block">
                    <img src="images/banks/icon-${bankInfo.id}.png" alt="">
                </div>
            </div>
            <div class="result__td">
                <div class="result__block">
                    <p><strong>от ${(bankInfo.percent+'').replace('.', ',')}%</strong> ${bankInfo.type_name}</p>
                </div>
            </div>
            <div class="result__tbody-box flex">
                <div class="result__td">
                    <div class="result__caption">Сумма</div>
                    <div class="result__block">
                        <p><span>${bankInfo.amount.min} ₽ - ${bankInfo.amount.max} ₽</span> На срок до ${bankInfo.period.max} лет</p>
                    </div>
                </div>
                <div class="result__td">
                    <div class="result__caption">документы</div>
                    <div class="result__block">
                        <p>Паспорт РФ</p>
                        ${bankInfo.docs > 0 && `<p>+ ${bankInfo.docs} документа</p>`}
                    </div>
                </div>
                <div class="result__td">
                    <div class="result__caption">требования</div>
                    <div class="result__block">
                        <ul>
                            <li>Возраст от ${bankInfo.minAge} года</li>
                            <li>Стаж от ${bankInfo.minWork} месяцев</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="result__td">
                <div class="result__block">
                    <a href="#" class="btn">Оформить</a>
                </div>
            </div>
        </div>
    `;
}