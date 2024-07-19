/**
 * The Counters component displays a series of `CounterCard` components that present various statistics related
 * to trips. The component receives `counters` and `setSelectedCounter` as props:
 * 
 * - `counters`: An object containing various counts such as total trips, delivered trips, delayed trips, etc.
 * - `setSelectedCounter`: A function to update the selected counter status.
 * 
 * The component organizes the `CounterCard` components into two main sections:
 * 1. A top section with "Total Trips" and "Delivered" counters.
 * 2. A bottom section with "Delayed", "In-Transit", and "Delivered" counters.
 * 
 * The styling for the cards is set inline to adjust alignment and width, ensuring the counters are displayed 
 * appropriately within their containers.
 * 
 * Each `CounterCard` is customized with specific styling and additional props depending on the counter it represents.
 */
import CounterCard from "./CounterCard";
import './Counters.css';
function Counters(props){
    const {counters,setSelectedCounter} = props;
    return (
        <>
            {/** 
             * CounterCard takes props as styleComp, counterStatus,counterID,setSelectedCounter,count,showOntimeSection,ontimeCount,total,showPercentage
             * 
             * - `styleComp`:Inline style to align text to the left and set minimum width of the card
             * - `counterStatus`:Text to display the status of the counter
             * - `counterID`:Unique identifier for the counter, used for handling filter
             * - `setSelectedCounter`:Function to update the selected counter when the card is clicked
             * - `count`:Value to display the count of total trips
             * - `showOntimeSection` :flag to show section which has ontime percent and count
             * - `ontimeCount`:count of ontime trips in that counter
             * - `total`:total count of trip to calculate percentage
             * - `showPercentage`: flag to display percentage
             * 
             */}
            <div className="main-contaner">
                <div className="top-section">
                    <CounterCard 
                        styleComp={{textAlign:"left",minWidth:"45%"}} 
                        counterStatus={"Total Trips"}
                        counterID={"Total"} 
                        setSelectedCounter={setSelectedCounter} 
                        count={counters.Total}
                    ></CounterCard>
                    <CounterCard 
                        styleComp={{textAlign:"left",minWidth:"45%"}} 
                        counterStatus={"Delivered"}    
                        counterID={"Delivered"} 
                        setSelectedCounter={setSelectedCounter} 
                        count={counters.Delivered} 
                        showOntimeSection={true} 
                        ontimeCount={counters.Ontime} 
                        total={counters.Total}
                    ></CounterCard>
                </div>
                <div className="containers">
                    <CounterCard  
                        styleComp={{textAlign:"left",minWidth:"31%"}} 
                        counterStatus={"Delayed"} 
                        counterID={"Delayed"} 
                        setSelectedCounter={setSelectedCounter} 
                        count={counters.Delayed}
                    ></CounterCard>
                    <CounterCard  
                        styleComp={{textAlign:"left",minWidth:"31%"}} 
                        counterStatus={"In-Transit"} 
                        count={counters.InTransit} 
                        counterID={"InTransit"} 
                        setSelectedCounter={setSelectedCounter} 
                        showPercentage={true} 
                        total={counters.Total}
                    ></CounterCard>
                    <CounterCard 
                        styleComp={{textAlign:"left",minWidth:"31%"}}  
                        counterStatus={"Delivered"} 
                        count={counters.Delivered} 
                        counterID={"Delivered"}  
                        setSelectedCounter={setSelectedCounter} 
                        showPercentage={true} 
                        total={counters.Total}
                    ></CounterCard>
                </div>
               
            </div>
        </>
    )
}
export default Counters;