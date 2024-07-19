/**
 * formate date by passing options
 * @param {date} date 
 * @param {object} options 
 * @returns {date} 
 */
const formatDate = (date,options) => {
    const option = options?options:{
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-GB', option).format(date);
};

/**
 * returns the tat status
 * @param {object} trip 
 * @returns {String}
 */
const calculateTATStatus = (trip) =>{
    const tripStartTime = new Date(trip.tripStartTime);
    const endTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
    /**
     *  Calculate the total time taken for the trip in days by subtracting the start time from the end time 
     *  and dividing by the number of milliseconds in a day (1000 ms * 60 s * 60 min * 24 h)
     */
    const timeTakenDays = (endTime - tripStartTime) / (1000 * 60 * 60 * 24);
    
    // Determine the trip status based on etaDays and timeTakenDays
    if (trip.etaDays <= 0) {
      return 'Others';
    } else if (trip.etaDays >= timeTakenDays) {
      return 'On time';
    } else {
      return 'Delayed';
    }
}
export  {formatDate,calculateTATStatus};