const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', ' at');
};
export default formatDate;