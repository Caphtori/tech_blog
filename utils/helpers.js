module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    post_preview: (text) => {
        if (text.length<100){
            return text;
        } else {
            if (text.slice(0,99)[-1]==='.'){
                return `${text.slice(0,99)}..`;
            } else {
                return `${text.slice(0,99)}...`;
            };
        };
    }
};