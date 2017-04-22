export default {
    confirm (message){
        return new Promise((resolve, reject) => {
            alertify.confirm(message).set('onok', () => {
                resolve(true);
            }).set('oncancel',() => {
                resolve(false);
            });
        });
    }
}