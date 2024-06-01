// adjust request data to store into database

// convert date format DD/MM/YYYY to YYYY-MM-DD to safe in database
function convertDateFormat(date) {
    const dateParts = date.split('#x2F;'); // server receives DD/MM/YYYY as DD#x2F;MM#x2F;YYYY
    if (dateParts.length === 3) {
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);

        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return `${year}-${month}-${day}`;
        }
    }
    return '';
}

// get uni abbreviation from email address xxx@hs-mittweida.de (= req.body.abbr)
function convertUniAbbr(mailAddr) {
    const cutIndex = mailAddr.indexOf('@');
    return mailAddr.substring(0, cutIndex);
}

module.exports = {
    convertDateFormat,
    convertUniAbbr
}