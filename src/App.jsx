import { useEffect, useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import TableHeader from './Components/TableHeader/TableHeader';
import Counters from './Components/Counter/Counters';
import {calculateTATStatus} from './Utils/utils'
import './App.css'

function App() {
  const [disableUpdate,setUpdateDisableUpdate] = useState(true);
  const [selectedCounter,setSelectedCounter] = useState("Delivered")
  const [tripData,setTripData] = useState(SampleData.data);
  const [counters,setCounters] = useState({
      "Total":0,
      "Delivered":0,
      "Ontime":0,
      "Delayed":0,
      "InTransit":0,
  })

  useEffect(()=>{
    let data = {};
    data.Total = tripData.length;
    data.Delivered = tripData.filter((val) =>{ return val.currenStatus=="Delivered"}).length;
    data.InTransit = tripData.filter((val) =>{ return val.currenStatus=="In Transit"}).length;
    data.Delayed = tripData.filter((val) =>{ return calculateTATStatus(val)=="Delayed"}).length;
    setCounters(data)
  },[tripData])


  const AddTrip = () =>{

  }
  const updateStatus = () =>{
    
  }
  return (
    <>
      	<Counters counters={counters} selectedCounter={selectedCounter} setSelectedCounter={setSelectedCounter}></Counters>
      	<div className='table-container'>
			<TableHeader disableUpdate={disableUpdate} AddTrip={AddTrip} updateStatus={updateStatus}></TableHeader>
			<DataTable data={tripData}></DataTable>
      	</div>
    </>
  )
}

export default App