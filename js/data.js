const banksData = [
    {
        amount: {
            min: 1,
            max: 4000000
        },
        period: {
            min: 1,
            max: 20
        },
        id: '2',
        bank_name: 'Тинькофф',
        city: 1,
        type: 1,
        type_name: 'Потербительский',
        percent: 7.7,
        deposit: 1,
        guarantee: 0,
        money_proof: 0,
        money_type: 1,
        term: 1,
        borrower: 1,
        insurance: 0,
        rating: 1,
        rate: 2,
        docs: 0,
        minAge: 23,
        minWork: 3,
        best: true,
        zero: false,
        bad_history: false,
        no_docs: false,
        calculator: true
    },
    {
        amount: {
            min: 1,
            max: 7000000
        },
        period: {
            min: 1,
            max: 30
        },
        bank_name: 'Альфа',
        id: '1',
        city: 1,
        type: 1,
        type_name: 'Потербительский',
        percent: 5,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: 0,
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 1,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: false,
        zero: true,
        bad_history: true,
        no_docs: true,
        calculator: false
    },
    {
        amount: {
            min: 1,
            max: 11000000
        },
        period: {
            min: 1,
            max: 5
        },
        bank_name: 'Home Credit Bank',
        id: '3',
        city: 1,
        type: 1,
        type_name: 'На недвижимость',
        percent: 11,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: 0,
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 4,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: true,
        zero: false,
        bad_history: false,
        no_docs: false,
        calculator: true
    },
    {
        amount: {
            min: 1,
            max: 3000000
        },
        period: {
            min: 1,
            max: 10
        },
        bank_name: 'Восточный банк',
        id: '5',
        city: 1,
        type: 1,
        type_name: 'Автокредит',
        percent: 13,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: 0,
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 3,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: false,
        zero: true,
        bad_history: true,
        no_docs: true,
        calculator: false
    }
];

const cardsData = [
    {
        id: '1',
        name: 'Карта “Совесть” для рассрочки',
        city: 1,
        limit: 350000,
        percent: 10,
        days: 365,
        cashback: 0,
        cashback_place: [1, 2],
        cost: 0,
        docs: false,
        period_pay: false,
        for_cash: true,
        for_time: false,
        for_cashback: false,
        debit: true,
        rating: 2,
        rate: 20
    },
    {
        id: '2',
        name: 'Карта “Халва”',
        city: 1,
        limit: 200000,
        percent: 15,
        days: 216,
        cashback: 6,
        cashback_place: [],
        cost: 0,
        docs: true,
        period_pay: true,
        for_cash: false,
        for_time: true,
        for_cashback: true,
        debit: false,
        rating: 5,
        rate: 10
    }
];

const microCreditData = [
    {
        amount: {
            min: 1,
            max: 4000000
        },
        period: {
            min: 1,
            max: 20
        },
        id: '2',
        bank_name: 'Тинькофф',
        city: 1,
        type: 1,
        type_name: 'Потербительский',
        percent: 7.7,
        deposit: 1,
        guarantee: 0,
        money_proof: 0,
        money_type: [1, 2, 3],
        term: 1,
        borrower: 1,
        insurance: 0,
        rating: 1,
        rate: 2,
        docs: 0,
        minAge: 23,
        minWork: 3,
        best: true,
        zero: false,
        bad_history: false,
        no_docs: false,
        calculator: true
    },
    {
        amount: {
            min: 1,
            max: 7000000
        },
        period: {
            min: 1,
            max: 30
        },
        bank_name: 'Альфа',
        id: '1',
        city: 1,
        type: 1,
        type_name: 'Потербительский',
        percent: 5,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: [1, 2, 3],
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 1,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: false,
        zero: true,
        bad_history: true,
        no_docs: true,
        calculator: false
    },
    {
        amount: {
            min: 1,
            max: 11000000
        },
        period: {
            min: 1,
            max: 5
        },
        bank_name: 'Home Credit Bank',
        id: '3',
        city: 1,
        type: 1,
        type_name: 'На недвижимость',
        percent: 11,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: [1, 2, 3],
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 4,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: true,
        zero: false,
        bad_history: false,
        no_docs: false,
        calculator: true
    },
    {
        amount: {
            min: 1,
            max: 3000000
        },
        period: {
            min: 1,
            max: 10
        },
        bank_name: 'Восточный банк',
        id: '5',
        city: 1,
        type: 1,
        type_name: 'Автокредит',
        percent: 13,
        deposit: 0,
        guarantee: 2,
        money_proof: 1,
        money_type: [1, 2, 3],
        term: 1,
        borrower: 1,
        insurance: 2,
        rating: 2,
        rate: 3,
        docs: 3,
        minAge: 23,
        minWork: 3,
        best: false,
        zero: true,
        bad_history: true,
        no_docs: true,
        calculator: false
    }
];