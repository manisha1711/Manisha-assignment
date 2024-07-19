import { useEffect, useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import TableHeader from './Components/TableHeader/TableHeader';
import Counters from './Components/Counter/Counters';
import {calculateTATStatus} from './Utils/utils';
import AddTripModal from './Components/AddUpdateTrip/AddTrip';
import UpdateTripModal from './Components/AddUpdateTrip/UpdateTrip';
import './App.css'

function App() {
	const [disableUpdate,setDisableUpdate] = useState(true);
	const [openModal,setOpenModal] = useState(false)
	const [openUpdateModal,setOpenUpdateModal] = useState(false)
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
	const [selectedRowData,setSelectedRowData] = useState({});

	const [values, setValues] = useState({
		"id": "",
		"tripId": "",
		"transporter": "",
		"tripStartTime": "",
		"currentStatusCode": "BKD",
		"currenStatus": "Booked",
		"phoneNumber": "",
		"etaDays": 4,
		"distanceRemaining": 995,
		"tripEndTime": "",
		"source": "",
		"sourceLatitude": 15.4,
		"sourceLongitude": 89,
		"dest": "",
		"destLatitude": 28.1,
		"destLongitude": 90.7,
		"lastPingTime": "2024-02-21T09:45:48.000Z",
		"createdAt": "2024-02-15T09:45:48.000Z"
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


	const closeModal = () =>{
		setOpenModal(false);
		setOpenUpdateModal(false)
		setValues({
			"id": "",
			"tripId": "",
			"transporter": "",
			"tripStartTime": "",
			"currentStatusCode": "BKD",
			"currenStatus": "Booked",
			"phoneNumber": "",
			"etaDays": 4,
			"distanceRemaining": 995,
			"tripEndTime": "",
			"source": "",
			"sourceLatitude": 15.4,
			"sourceLongitude": 89,
			"dest": "",
			"destLatitude": 28.1,
			"destLongitude": 90.7,
			"lastPingTime": "2024-02-21T09:45:48.000Z",
			"createdAt": "2024-02-15T09:45:48.000Z"
		});
	}
	const AddTrip = () =>{
		setOpenModal(true);
	}
	const saveTrip = () =>{
		let data = {
			createdAt:new Date(),
			lastPingTime:new Date(),
			...values
		}
		data.id = Math.random()+"addtrip"
		let copy = [...tripData];
		copy.push(data);
		setTripData(copy)
		closeModal();
	}
	const updateTrip = () => {
		console.log(values)
	}
	const updateStatus = () =>{
		setValues(selectedRowData)
		setOpenUpdateModal(true)
	}
 	return (
		<>
			<Counters counters={counters} selectedCounter={selectedCounter} setSelectedCounter={setSelectedCounter}></Counters>
			<div className='table-container'>
				<TableHeader disableUpdate={disableUpdate} AddTrip={AddTrip} updateStatus={updateStatus}></TableHeader>
				<DataTable data={tripData} filterModel={filterModel} setFilterModel={setFilterModel} setDisableUpdate={setDisableUpdate} setSelectedRowData={setSelectedRowData}></DataTable>
			</div>
			{openModal && <AddTripModal open={openModal} onClose={closeModal} values={values} setValues={setValues} saveTrip={saveTrip}></AddTripModal>}
			{openUpdateModal && <UpdateTripModal open={openUpdateModal} onClose={closeModal} values={values} setValues={setValues} updateTrip={updateTrip}></UpdateTripModal>}
		</>
	)
}

export default App