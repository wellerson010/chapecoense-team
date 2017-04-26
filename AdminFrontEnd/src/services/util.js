export default {
    formatDate(value) {
        if (typeof(value) == 'string'){
            value = new Date(value);
        }
        let day = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return `${day}/${month}/${year}`;
    }
}