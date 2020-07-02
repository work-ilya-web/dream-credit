$(document).ready(function() {
    initFilters(cardsData);
    // $.ajax({
    //     url: 'getData.php',
    //     method: 'GET',
    //     dataType: 'json',
    //     success: initFilters
    // });
});

function initFilters(cardsData) {
    let filter = [];
    renderCards(cardsData);


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
        const filtered = filterCards(cardsData, filter);
        renderCards(filtered);
    });

    $('#getCredits').click(function() {
        const sortingField = $('#sorting_field');
        const sortSelect = sortingField.closest('.select');
        const sortDefault = sortSelect.find('.select-options__value:first');
        sortSelect.find('.select-title__value').html(sortDefault.html());
        sortingField.val(sortDefault.data('value'));

        $('.result__top-slide :checkbox').prop('checked', false);
        filter = collectFilter();
        const filtered = filterCards(cardsData, filter);
        renderCards(filtered);
        $('#sort').data('direction', 'asc').removeClass('desc');
        $([document.documentElement, document.body]).animate({
            scrollTop: $('.result').offset().top
        }, 600);
    });

    $('#sort').click(function(e) {
        e.preventDefault();
        $(this).data('direction', $(this).data('direction') === 'asc' ? 'desc' : 'asc');
        $(this).toggleClass('desc', $(this).data('direction') !== 'asc');
        const filtered = filterCards(cardsData, filter);
        const sorted = sort(filtered);
        renderCards(sorted);
    });

    $('#sorting_field').change(function() {
        $(this).data('direction', 'asc');
        const filtered = filterCards(cardsData, filter);
        const sorted = sort(filtered);
        renderCards(sorted);
    });
}

function collectFilter() {
    let filter = [
        {
            rule: 'range',
            name: 'limit',
            value : $('#limit_selection').val()
        }
    ];

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

function filterCards(cards, filter) {
    let filtered = [...cards];
    filter.forEach(item => {
        const value = item.value;
        const name = item.name;
        switch (item.rule) {
            case 'range':
                filtered = filtered.filter(card => +value.split(' ').join('') <= card[name]);
                break;
            case 'includes':
                filtered = filtered.filter(card => card[name].includes(value));
                break;
            case 'equal':
                filtered = filtered.filter(card => value == card[name]);
                break;
            case 'bool':
                filtered = filtered.filter(card => value === (card[name] === '1'));
                break;
        }
    });
    return filtered;
}

function sort(cards) {
    const direction = $('#sort').data('direction');
    const field = $('#sorting_field').val();
    return cards.sort(function(a, b) {
        if (direction === 'asc') {
            return a[field] > b[field] ? 1 : -1;
        } else {
            return a[field] < b[field] ? 1 : -1;
        }
    });
}

function renderCards(cards) {
    $('#result_cards').html(cards.reduce((r, card) => r + getCard(card), ''));
}

function getCard(cardInfo) {
    return `
        <div class="result__tr flex">
            <div class="result__td">
                <div class="result__block">
                    <div class="result__card">
                        <img src="images/result-card/img-${cardInfo.id}.png" alt="">
                    </div>
                    <div class="result__card-name">${cardInfo.name}</div>
                </div>
            </div>
            <div class="result__td">
                <div class="result__block">
                    <p><span>${cardInfo.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</span><strong>${cardInfo.percent}%</strong></p>
                </div>
            </div>
            <div class="result__tbody-box flex">
                <div class="result__td">
                    <div class="result__caption">Дней без процентов</div>
                    <div class="result__block">
                        <p>${cardInfo.days}</p>
                    </div>
                </div>
                <div class="result__td">
                    <div class="result__caption">Кешбек</div>
                    <div class="result__block">
                        <p>${cardInfo.cashback}%</p>
                    </div>
                </div>
                <div class="result__td">
                    <div class="result__caption">Обслуживание</div>
                    <div class="result__block">
                        <p>${cardInfo.cost} руб.</p>
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