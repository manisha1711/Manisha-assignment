import { useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import TableHeader from './Components/TableHeader/TableHeader';
import Counters from './Components/Counter/Counters';
import './App.css'

function App() {
  const [disableUpdate,setUpdateDisableUpdate] = useState(true);
  const [selectedCounter,setSelectedCounter] = useState("Deliverd")
  const [tripData,setTripData] = useState(SampleData.data);
  const [counters,setCounters] = useState({
      "Total":0,
      "Deliverd":0,
      "Ontime":0,
      "Delayed":0,
      "InTransit":0,
  })


  const AddTrip = () =>{

  }
  const updateStatus = () =>{
    
  }
  return (
    <>
      <Counters counters={counters} selectedCounter={selectedCounter} setSelectedCounter={setSelectedCounter}></Counters>
      <TableHeader disableUpdate={disableUpdate} AddTrip={AddTrip} updateStatus={updateStatus}></TableHeader>
      <DataTable data={tripData}></DataTable>
    </>
  )
}

export default App