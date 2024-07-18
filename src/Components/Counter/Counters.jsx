import CounterCard from "./CounterCard";
import './Counters.css';
function Counters(props){
    const {counters,setSelectedCounter,selectedCounter} = props;
    return (
        <>
            <div className="main-contaner">
                <CounterCard counterStatus={"Total Trips"}  counterName={"Total"} setSelectedCounter={setSelectedCounter} count={counters.Total}></CounterCard>
                <CounterCard counterStatus={"Delivered"} counterName={"Delivered"} setSelectedCounter={setSelectedCounter} count={counters.Delivered} showOntimeSection={true} ontimeCount={counters.Ontime} total={counters.Total}></CounterCard>
                <div className="containers">
                    <CounterCard counterStatus={"Delayed"} counterName={"Delayed"} setSelectedCounter={setSelectedCounter} count={counters.Delayed}></CounterCard>
                    <CounterCard counterStatus={"In-Transit"} count={counters.InTransit} counterName={"InTransit"} setSelectedCounter={setSelectedCounter} showPercentage={true} total={counters.Total}></CounterCard>
                    <CounterCard counterStatus={"Delivered"} count={counters.Delivered} counterName={"Delivered"}  setSelectedCounter={setSelectedCounter} showPercentage={true} total={counters.Total}></CounterCard>
                </div>
               
            </div>
        </>
    )
}
export default Counters;