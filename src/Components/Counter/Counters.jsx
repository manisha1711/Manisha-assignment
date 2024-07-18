import CounterCard from "./CounterCard";
import './Counters.css';
function Counters(props){
    const {counters,setSelectedCounter,selectedCounter} = props;
    return (
        <>
            <div className="main-contaner">
                <CounterCard counterStatus={"Total Trips"} count={counters.Total}></CounterCard>
                <CounterCard counterStatus={"Delivered"} count={counters.Delivered} showOntimeSection={true} ontimeCount={counters.Ontime} total={counters.Total}></CounterCard>
                <div className="containers">
                    <CounterCard counterStatus={"Delayed"}  count={counters.Delayed}></CounterCard>
                    <CounterCard counterStatus={"In-Transit"} count={counters.InTransit} showPercentage={true} total={counters.Total}></CounterCard>
                    <CounterCard counterStatus={"Delivered"} count={counters.Delivered} showPercentage={true} total={counters.Total}></CounterCard>
                </div>
               
            </div>
        </>
    )
}
export default Counters;