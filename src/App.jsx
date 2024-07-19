import { useEffect, useState } from 'react'
import SampleData from './assets/data';
import DataTable from './Components/DataTable/DataTable';
import TableHeader from './Components/TableHeader/TableHeader';
import Counters from './Components/Counter/Counters';
import {calculateTATStatus} from './Utils/utils';
import AddTripModal from './Components/AddUpdateTrip/AddTrip';
import UpdateTripModal from './Components/AddUpdateTrip/UpdateTrip';
import SweetAlert2 from 'react-sweetalert2';
import './App.css'

function App() {
	// State variables
	const [disableUpdate,setDisableUpdate] = useState(true); // state to disable update status button
	const [openModal,setOpenModal] = useState(false)
	const [openUpdateModal,setOpenUpdateModal] = useState(false)
	const [selectedCounter,setSelectedCounter] = useState("Delivered") // By default the counter will be Delivered
	const [tripData,setTripData] = useState(SampleData.data); // state for trip data
	const [showMessage,setShowMessage] = useState(false);

	// State for counters
	const [counters,setCounters] = useState({
		"Total":0,
		"Delivered":0,
		"Ontime":0,
		"Delayed":0,
		"InTransit":0,
	});
	// State for filter model
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

	// State for form values
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

	 // Effect to calculate counters whenever tripData changes
	useEffect(()=>{
			let data = {};
			data.Total = tripData.length;
			// Filter the trips to find those that are "Delivered"
			let DeliveredCount = tripData.filter((val) =>{ return val.currenStatus=="Delivered"});
			data.Delivered = DeliveredCount.length;
			// Filter the delivered trips to find those that are "On time"
			data.Ontime = DeliveredCount.filter((val) =>{ return calculateTATStatus(val)=="On time"}).length;
			// Filter the trips to find those that are "In Transit"
			data.InTransit = tripData.filter((val) =>{ return val.currenStatus=="In Transit"}).length;
			// Filter the trips to find those that are "Delayed"
			data.Delayed = tripData.filter((val) =>{ return calculateTATStatus(val)=="Delayed"}).length;
			setCounters(data)
	},[tripData])

	/** 
	 * It runs whenever the selectedCounter state changes.
	 * Based on the currently selected counter it sets the filter model to show trips.
	 * For InTransit and Delivered counter filter by currenStatus
	 * For Total counter reset the value to ""
	 * For Delayed counter filter by TATStatus
	*/
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

	// Function to close  Add update modal and reset values
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

	// Function to open add trip modal
	const AddTrip = () =>{
		setShowMessage(false);
		setOpenModal(true);
	}

	// Function to save a new trip
	const saveTrip = () =>{
		let data = {
			createdAt:new Date(), // Set the createdAt property to the current date and time
			lastPingTime:new Date(), // Set the lastPingTime property to the current date and time
			...values
		}
		data.id = Math.random()+"addtrip"  // Generate a unique id for the new trip in case of actual system it will be handled by db
		let copy = [...tripData];
		copy.push(data);
		setTripData(copy)
		closeModal();
		setShowMessage(true)
	}

	// Function to update an existing trip
	const updateTrip = () => {
		let index = tripData.findIndex(a=>a.id==values.id)
		let copy = [...tripData];
		copy[index] = values;
		//If the User is updating the current status to Delivered than add tripEndTime as lastPingTime
		if(copy[index].currenStatus=="Delivered"){ 
			copy[index].tripEndTime = copy[index].lastPingTime;
		}
		setTripData(copy)
		setShowMessage(true);
		closeModal();
	}

	// Function to open update trip modal with selected row data
	const updateStatus = () =>{
		setShowMessage(false)
		setValues(selectedRowData)
		setOpenUpdateModal(true)
	}
 	return (
		<>
			{/**
			 * Render the Counters component, passing counters, setSelectedCounter as props
			 * On Clicking  on counter setSelectedCounter will get triggered
			 */}
			<Counters 
				counters={counters}  
				setSelectedCounter={setSelectedCounter}
			></Counters>
			<div className='table-container'>
				{/**
				 * Render the TableHeader component, passing disableUpdate, AddTrip, and updateStatus as props
				 * disableUpdate-this will handle update status button enable on checkbox selection
				 * AddTrip- This is callback function which will get called on Add Trip Button Click
				 * updateStatus- This is callback function which will get called on update Status  Button Click
				*/}
				<TableHeader 
					disableUpdate={disableUpdate} 
					AddTrip={AddTrip} 
					updateStatus={updateStatus}>
				</TableHeader>
				{/**
				 * Render the DataTable component, passing data, filterModel, setFilterModel, setDisableUpdate, and setSelectedRowData as props
				 * data- this is table data which should be an array of object
				 * filterModel- state variable which is by deflaut getting set to filter Delivered status trips 
				 * setFilterModel- is getting called when user is editing current filter and setting it to different col
				 * setDisableUpdate - to enable update when row is getting checked
				 * setSelectedRowData - to set selected row data to prefill update status modal
				 */}
				<DataTable 
					data={tripData} 
					filterModel={filterModel} 
					setFilterModel={setFilterModel} s
					etDisableUpdate={setDisableUpdate} 
					setSelectedRowData={setSelectedRowData}>
				</DataTable>
			</div>
			{
				/**
				 * conditional renderening on openModal flag
				 *  onClose -  callback when MOdal gets close
				 *  values - form data (set to default values)
				 * saveTrip - callback to save trip data
				 */
			}
			{openModal && 
				<AddTripModal 
					open={openModal} 
					onClose={closeModal} 
					values={values} 
					setValues={setValues} 
					saveTrip={saveTrip}>
				</AddTripModal>
			}
			{
				/**
				 * conditional renderening on openUpdateModal flag
				 *  onClose -  callback when MOdal gets close
				 *  values - form data set to selectedrowdata
				 * updateTrip - callback to update trip data
				 */
			}
			{openUpdateModal && 
				<UpdateTripModal 
					open={openUpdateModal} 
					onClose={closeModal} 
					values={values} 
					setValues={setValues} 
					updateTrip={updateTrip}>
				</UpdateTripModal>
			}
			<SweetAlert2 show={showMessage} title='success' text="Saved Successfully" />
		</>
	)
}

export default App