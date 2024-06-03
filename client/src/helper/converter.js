// contains function to convert data

// converts to DD/MM/YYYY from date format ISO8601
export const convertDateFormat = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getUTCFullYear();
    return `${day}/${month}/${year}`;
};