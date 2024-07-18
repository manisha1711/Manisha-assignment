import CounterCard from "./CounterCard";
import './Counters.css';
function Counters(props){
    const {counters,setSelectedCounter,selectedCounter} = props;
    return (
        <>
            <div className="main-contaner">
                <div style={{display: "flex",width: "100%",justifyContent: "space-between"}}>
                <CounterCard styleComp={{textAlign:"left",minWidth:"45%"}} counterStatus={"Total Trips"}  counterName={"Total"} setSelectedCounter={setSelectedCounter} count={counters.Total}></CounterCard>
                <CounterCard styleComp={{textAlign:"left",minWidth:"45%"}} counterStatus={"Delivered"} counterName={"Delivered"} setSelectedCounter={setSelectedCounter} count={counters.Delivered} showOntimeSection={true} ontimeCount={counters.Ontime} total={counters.Total}></CounterCard>
                </div>
                <div className="containers" style={{textAlign:"left",minWidth:"50%",justifyContent: "flex-end"}}>
                    <CounterCard  styleComp={{textAlign:"left",minWidth:"31%"}} counterStatus={"Delayed"} counterName={"Delayed"} setSelectedCounter={setSelectedCounter} count={counters.Delayed}></CounterCard>
                    <CounterCard  styleComp={{textAlign:"left",minWidth:"31%"}} counterStatus={"In-Transit"} count={counters.InTransit} counterName={"InTransit"} setSelectedCounter={setSelectedCounter} showPercentage={true} total={counters.Total}></CounterCard>
                    <CounterCard styleComp={{textAlign:"left",minWidth:"31%"}}  counterStatus={"Delivered"} count={counters.Delivered} counterName={"Delivered"}  setSelectedCounter={setSelectedCounter} showPercentage={true} total={counters.Total}></CounterCard>
                </div>
               
            </div>
        </>
    )
}
export default Counters;