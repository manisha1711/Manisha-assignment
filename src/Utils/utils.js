const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};
const calculateTATStatus = (trip) =>{
    const tripStartTime = new Date(trip.tripStartTime);
    const endTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
    const timeTakenDays = (endTime - tripStartTime) / (1000 * 60 * 60 * 24);
    
    if (trip.etaDays <= 0) {
      return 'Others';
    } else if (trip.etaDays >= timeTakenDays) {
      return 'On time';
    } else {
      return 'Delayed';
    }
}
export  {formatDate,calculateTATStatus};