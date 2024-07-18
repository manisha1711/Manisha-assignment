import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import formatDate from '../../Utils/DateFormatter';
import './DataTable.css';

function DataTable(props){
	const {data} = props;
	const statusColor = {
		"Delayed":"warning",
		"On time":"success",
		"Others":"primary",
		"Delivered":"success"

	}
	  
	const columns = [
		{ 
			field: 'tripId', 
			headerName: 'Trip ID' ,
			flex: 1,
			minWidth: 130
		},
		{ 
			field: 'transporter', 
			headerName: 'Transporter',
			width: 120
		},
		{ 
			field: 'source', 
			headerName: 'Source',
			width:90
		},
		{
			field: 'dest',
			headerName: 'Destination',
			width:130
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone',
			width:150
		},
		{
			field: 'ETA',
			headerName: 'ETA',
			width:150,
			flex:1,
			valueGetter:  (value, trip)  => {
				const createdAt = new Date(trip.createdAt);
				const eta = new Date(createdAt);
				eta.setDate(createdAt.getDate() + trip.etaDays);
				return formatDate(eta); 
			},
			sortable:250
		},
		{
			field: 'distanceRemaining',
			headerName: 'Distance Remaining',
			width:170
		},
		{
			field: 'currenStatus',
			headerName: 'Trip Status',
			width: 200,
			renderCell: (params) => {
				const onClick = (e) => {
				  e.preventDefault();
				};
				return (
					<Button variant="outlined" color={statusColor[params.value]} size="small" onClick={onClick}>{params.value}</Button>
				);
			},
		},
		{
			field: 'TATStatus',
			headerName: 'TAT Status',
			valueGetter: (value, trip)  => {
				const tripStartTime = new Date(trip.tripStartTime);
				const endTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
				const timeTakenDays = (endTime - tripStartTime) / (1000 * 60 * 60 * 24);
			  
				if (trip.etaDays <= 0) {
				  return 'Others';
				} else if (trip.etaDays >= timeTakenDays) {
				  return 'On time';
				} else {
				  return 'Delayed';
				}
			},
			width: 120,
			renderCell: (params) => {
				const onClick = (e) => {
				  e.preventDefault();
				};
				return (
					<Button variant="outlined" color={statusColor[params.value]} size="small" onClick={onClick}>{params.value}</Button>
				);
			},
			
		},
		
	];

	  
	return (
		<>
			<DataGrid
				rows={data}
				columns={columns}
				initialState={{
				pagination: {
					paginationModel: { page: 0, pageSize: 10 },
				}

				}}
				sx={{
					"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":{
						outline: "none",
					},
					'.MuiDataGrid-iconButtonContainer': {
						visibility: 'visible',
					},
					'.MuiDataGrid-sortIcon': {
						opacity: 'inherit !important',
					},
				  }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				disableColumnResize
				disableColumnMenu
			/>
		</>
	);
}
export default DataTable;