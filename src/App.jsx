import { useEffect, useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import TableHeader from './Components/TableHeader/TableHeader';
import Counters from './Components/Counter/Counters';
import {calculateTATStatus} from './Utils/utils';
import AddTripModal from './Components/AddUpdateTrip/AddTrip';
import './App.css'

function App() {
	const [disableUpdate,setUpdateDisableUpdate] = useState(true);
	const [openModal,setOpenModal] = useState(false)
	const [selectedCounter,setSelectedCounter] = useState("Delivered")
	const [tripData,setTripData] = useState(SampleData.data);
	const [counters,setCounters] = useState({
		"Total":0,
		"Delivered":0,
		"Ontime":0,
		"Delayed":0,
		"InTransit":0,
	});
	const [filterModel, setFilterModel] = useState({
		items: [
		{
			field: 'currenStatus',
			operator: 'contains',
			value: 'Delivered',
		},
		],
	});

	const [values, setValues] = useState({
		"id": "",
		"tripId": "",
		"transporter": "",
		"tripStartTime": "",
		"currentStatusCode": "",
		"currenStatus": "",
		"phoneNumber": "",
		"etaDays": "1",
		"distanceRemaining": 0,
		"tripEndTime": "2024-02-21T07:01:33.000Z",
		"source": "",
		"sourceLatitude": 17.5,
		"sourceLongitude": 80.5,
		"dest": "",
		"destLatitude": 15.4,
		"destLongitude": 78.8,
		"lastPingTime": "2024-02-19T07:01:33.000Z",
		"createdAt": "2024-02-15T07:01:33.000Z"
    });


	useEffect(()=>{
			let data = {};
			data.Total = tripData.length;
			let DeliveredCount = tripData.filter((val) =>{ return val.currenStatus=="Delivered"});
			data.Delivered = DeliveredCount.length;
			data.Ontime = DeliveredCount.filter((val) =>{ return calculateTATStatus(val)=="On time"}).length;
			data.InTransit = tripData.filter((val) =>{ return val.currenStatus=="In Transit"}).length;
			data.Delayed = tripData.filter((val) =>{ return calculateTATStatus(val)=="Delayed"}).length;
			setCounters(data)
	},[tripData])

	useEffect(()=>{
		if(selectedCounter=="InTransit"){
			setFilterModel(
				{
					items: [
					{
						field: 'currenStatus',
						operator: 'contains',
						value: 'In Transit',
					},
					],
				}
			)
		}else if(selectedCounter=="Delivered"){
			setFilterModel(
				{
					items: [
					{
						field: 'currenStatus',
						operator: 'contains',
						value: 'Delivered',
					},
					],
				}
			)
		}else if(selectedCounter=="Delayed"){
			setFilterModel(
				{
					items: [
					{
						field: 'TATStatus',
						operator: 'contains',
						value: 'Delayed',
					},
					],
				}
			)
		}
		else if(selectedCounter=="Total"){
			setFilterModel(
				{
					items: [
						{
							field: 'TATStatus',
							operator: 'contains',
							value: '',
						},
					],
				}
			)
		}
		
	},[selectedCounter])

	useEffect(()=>{
		console.log(filterModel)
	},[filterModel])

	const closeModal = () =>{
		setOpenModal(false);
	}
	const AddTrip = () =>{
		setOpenModal(true);
	}
	const updateStatus = () =>{
		
	}
 	return (
		<>
			<Counters counters={counters} selectedCounter={selectedCounter} setSelectedCounter={setSelectedCounter}></Counters>
			<div className='table-container'>
				<TableHeader disableUpdate={disableUpdate} AddTrip={AddTrip} updateStatus={updateStatus}></TableHeader>
				<DataTable data={tripData} filterModel={filterModel} setFilterModel={setFilterModel}></DataTable>
			</div>
			{openModal && <AddTripModal open={openModal} onClose={closeModal} values={values} setValues={setValues}></AddTripModal>}
		</>
	)
}

export default App