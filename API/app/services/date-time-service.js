module.exports = {
    transformToDatabaseDate(date){
        if (typeof (date) == 'string'){
            date = new Date(date);
        }

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}