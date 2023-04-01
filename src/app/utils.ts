const categoreyList: any[] = ["Vegitables", "Milk", "Fruits", "Maligai", "NonVeg", "Tea/Snacks", "Hotel Food", "Waters", "Gold", "Electronics items", "Silk", "Medical", "Amount", "Maintanance", "Fuel", "Travel", "Bill Payments", "Buy", "Others", "Insurance"];
const amount: any[] = ["Sent", "Get", "Give"];
const medical: any[] = ["Medicene", "Hospital"];
const maintanence: any[] = ["Car", "Bike", "TV", "Washing Machine", "Refreidgerator", "Laptop", "Stablilizer", "Induction", "Mobile"];
const fuel: any[] = ["Car", "Bike"];
const travel: any[] = ["Bus", "Train", "Flight", "Auto", "Bike", "Cab"];
const bill: any[] = ["Credit Card", "EB", "GAS", "Broad Band", "Pay borrow money", "Mobile Rechagrge", "Rent Pay"];
const maligai: any[] = ["Rice", "Flour(idli/dosa)", "Washing Items", "Kitchen Items", "Paste", "Soap", "Others", "Oil"];
const nonveg: any[] = ["Chicken", "Mutton", "Fish", "Egg", "Karuvadu"];
const buy: any[] = ["Mobile", "Tv", "Washing Machine", "Heater", "RO Machine", "Fridge", "Laptop", "Cheppals/Shoes", "Speaker", "HeadPhone", "Bike", "Flat", "Other Items"];
const calList: any[] = ["Day", "Week", "Month", "Year"];
const monthList: any[] = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const insurance: any[] = ["Health", "Car", "Bike", "Mobile", "Laptop", "AC"]

export { categoreyList, amount, medical, maintanence, fuel, travel, bill, maligai, nonveg, calList, buy, monthList, insurance };

export interface ICalender {
    type: string,
    month: number,
    year: number
}