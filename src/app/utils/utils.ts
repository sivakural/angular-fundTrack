const expenses: any = {
    categoreyList : ["Vegitables", "Milk", "Fruits", "Maligai", "NonVeg", "Tea/Snacks", "Hotel Food", "Waters", "Gold", "Scheme", "Electronics items", "Silk", "Medical", "Amount", "Maintanence", "Fuel", "Travel", "Bill Payments", "Buy", "Others", "Insurance", "Scheme", "Loan EMI", "Tax"],
    amount : ["Sent", "Give"],
    medical : ["Medicene", "Hospital", "Scan"],
    maintanence : ["Car", "Bike", "TV", "Washing Machine", "Refreidgerator", "Laptop", "Stablilizer", "Induction", "Mobile", 'Light'],
    fuel : ["Car", "Bike"],
    travel : ["Bus", "Train", "Flight", "Auto", "Bike", "Cab"],
    'bill payments' : ["Credit Card", "EB", "GAS", "Broad Band", "Pay borrow money", "Mobile Recharge", "Rent Pay", "Gold recovery"],
    maligai : ["Rice", "Flour(idli/dosa)", "Washing Items", "Kitchen Items", "Paste", "Soap", "Extras", "Oil"],
    nonveg : ["Chicken", "Mutton", "Fish", "Egg", "Karuvadu"],
    buy : ["Mobile", "Tv", "Washing Machine", "Heater", "RO Machine", "Fridge", "Laptop", "Cheppals/Shoes", "Speaker", "HeadPhone", "Bike", "Flat", "Other Items"],
    insurance : ["Health", "Car", "Bike", "Mobile", "Laptop", "AC"],
    'loan emi' : ["Personal loan", "Housing loan", "Bike loan", "Car loan", "Land loan", "Flat loan", "Gold loan", "Paddy loan"],
    schme : ["RD", "FD", "Child savings", "Post Office", "Gold", "Gold bond"],
    tax : ["Salary"]
};
const calList: any[] = ["Day", "Week", "Month", "Year"];
const monthList: any[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const keyIncludes: any[] = ["amount", "maintanence", "medical", "fuel", "travel", "bill payments", "maligai", "nonveg", "buy", "insurance", "scheme", "loan emi", "tax", "sent", "give"];

const formKeys: any = {
    "thingsForm": ['date', 'things'],
    "creditCardForm": ['date', 'amount', 'reason']
}

const user: any  = {
    register: '/register',
    login: '/login'
}

const expense: any = {
    add: '/entry',
    list: '/tracklist',
    get: '/getentry',
    update: '/update'
}

const creditcarduse: any = {
    add: '/creditcarduse',
    get: '/getcreditcarduse',
    list: '/getCreditCardUsedlist',
    delete: '/deletecreditcarduse',
    update: '/creditcarduseupdate'
}

const creditcardpay: any = {
    add: '/creditcardpay',
    get: '/getcreditcardpay',
    list: '/getCreditCardPayslist',
    delete: '/deletecreditcardpay'
}

export { expenses, keyIncludes, calList, monthList, formKeys, expense, creditcarduse, creditcardpay, user };

export interface ICalender {
    type: string,
    month: number,
    year: number
}

export function formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}