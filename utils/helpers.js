module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    post_preview: (text) => {
        if (text.length<500){
            return text;
        } else {
            if (text.slice(0,499)[-1]==='.'){
                return `${text.slice(0,499)}..`;
            } else {
                return `${text.slice(0,499)}...`;
            };
        };
    }
};