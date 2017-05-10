export default {
    formatDate(value, formatTime = false, options = {}) {
        if (typeof (value) == 'string') {
            value = new Date(value);
        }
        let day = formatValue(value.getDate());
        let month = formatValue(value.getMonth() + 1);
        let year = value.getFullYear();

        let date = `${day}/${month}/${year}`;

        if (!formatTime) {
            return date;
        }

        let hour = formatValue(value.getHours()),
            minute = formatValue(value.getMinutes());

        if (!options.hideTrace){
            date += ' -';
        }
        date += ` ${hour}:${minute}`;

        return date;
    }
}

function formatValue(value) {
    if (value < 10) {
        value = '0' + value;
    }

    return value;
}