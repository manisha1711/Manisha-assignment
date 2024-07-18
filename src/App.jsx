import { useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import './App.css'

function App() {

  return (
    <>
      <DataTable data={SampleData.data}></DataTable>
    </>
  )
}

export default App