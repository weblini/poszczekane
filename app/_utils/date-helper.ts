export const isDateBetween = (targetDate: Date, dateOne: Date, dateTwo?: Date) => {
    // clone the dates to avoid mutating the original date object
    const d1 = new Date(dateOne);
    // if only one date provided, check if target is on that day
    const d2 = dateTwo ? new Date(dateTwo) : new Date(dateOne);

    // set dates to midnight to avoid missing on half-days
    d1.setHours(0, 0, 0, 0);
    d2.setHours(23, 59, 59, 0);
    return targetDate >= d1 && targetDate <= d2;
};


export const timeFormatter = new Intl.DateTimeFormat("pl-PL", { hour: "2-digit", minute: "2-digit" })

export const formatEventDate = (startStamp: string, endStamp?: string) => {

    const startDate = new Date(startStamp)
    const endDate = endStamp ? new Date(endStamp) : null

    let dateInfoString = startDate.toLocaleDateString()

    if (endDate && !isDateBetween(endDate, startDate)) {
        dateInfoString += ` do ${endDate.toLocaleDateString()}`
    }
    
    return dateInfoString
}

export const getStartOfDayDate = (ISOString: string) => {
    const date = new Date(ISOString)
    date.setHours(0,0,0,0)
    return date
}

export const isDatePast = (targetDate: Date) => {
    return targetDate <= new Date();
};

export const todayDateString = new Date().toISOString().split("T")[0];