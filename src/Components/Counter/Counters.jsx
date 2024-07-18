import CounterCard from "./CounterCard";
import './Counters.css';
function Counters(props){
    const {counters,setSelectedCounter,selectedCounter} = props;
    return (
        <>
            <div className="main-contaner">
                <CounterCard counterStatus={"Total Trips"} count={counters.Total}></CounterCard>
                <CounterCard counterStatus={"Delayed"} count={counters.Delayed}></CounterCard>
                <CounterCard counterStatus={"Deliverd"} count={counters.Deliverd}></CounterCard>
                <CounterCard counterStatus={"InTransit"} count={counters.InTransit}></CounterCard>
            </div>
        </>
    )
}
export default Counters;