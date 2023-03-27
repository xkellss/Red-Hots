const date = new Date();

export function firstDayOfMonth(date) {
    const yearSubString = parseInt(date.Year.toString().substring(2, 4));
    // console.log(yearSubString)
    const yearCode = (yearSubString + (Math.floor(yearSubString / 4))) % 7;
    const monthCode = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
    // const centuryCode = [4, 2, 0, 6, 4, 2, 0];
    // 1700 => 4, 2300 => 0
    const centuryCode = (date.Year < 2000 && date.Year > 1899) ? 
        0 : (date.Year < 3000 && date.Year > 1999) ? 6 : 0;
    const leapYear = ((date.Year % 4 === 0 || date.Year % 400 === 0) && date.Year % 100 !== 0 ) ? 1 : 0;
    return (yearCode + monthCode[date.Month - 1] + centuryCode + 1 - leapYear) % 7;
}

export function formatTime(militaryTime) {
    const hour = parseInt(militaryTime.split(':')[0])
    const code = hour > 11 ? 'PM' : 'AM';
    return `${hour > 12 ? hour - 12 : hour}: ${militaryTime.split(':')[1]} ${code}`;
}

export function getDaysPerMonth(date) {
    const leapYear = (date.Year % 4 === 0 || date.Year % 400 === 0) && (date.Year % 100 !== 0);
    if (leapYear && date.Month === 2) return 29;
    
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[date.Month - 1];

}

const current_date = {
    Day: date.getDate(),
    Month: date.getMonth() + 1,
    Year: date.getFullYear()
};
const yesterday = {
    Day: (date.getDate() === 1) ? getDaysPerMonth({
        Day: 1,
        Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
        Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
    }) : date.getDate() - 1,
    Month: (date.getDate() === 1) ? (date.getMonth() === 0) ? 12 : date.getMonth() + 1 : date.getMonth() + 1,
    Year: (date.getMonth() === 0) ? (date.getDate() === 1) ? date.getFullYear() - 1 : date.getFullYear() : date.getFullYear()
};
const first_day_of_month = firstDayOfMonth({
    Day: date.getDate(),
    Month: date.getMonth() + 1,
    Year: date.getFullYear()
});
const current_day_of_week = ((date.getDate() % 7)) + first_day_of_month;
const prevMonth = {
    Day: 1,
    Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
    Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
};
const days_per_prev_month = getDaysPerMonth(prevMonth);
const sunday_date = date.getDate() - current_day_of_week + 1;
const first_date_of_current_week = {
    Day: sunday_date,
    Month: date.getMonth() + 1,
    Year: date.getFullYear()
};

export const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getLastSevenDays() {
    const d = date.getDate();
    if (d > 6) {
        return [ 
            {
                Day: d - 6,
                Month: date.getMonth() + 1,
                Year: date.getFullYear()
            },
            {
                Day: d,
                Month: date.getMonth() + 1,
                Year: date.getFullYear()
            }
        ];
    } else {
        return [
            {
                Day: days_per_prev_month - (6 - d),
                Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
            },
            {
                Day: d,
                Month: date.getMonth() + 1,
                Year: date.getFullYear()
            }
        ];
    }
}