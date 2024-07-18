import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';

function DataTable(props){
	const {data} = props;
	const columns = [
		{ 
			field: 'tripId', 
			headerName: 'Trip ID' ,
			flex: 1,
			minWidth: 200
		},
		{ 
			field: 'transporter', 
			headerName: 'Transporter',
			width: 150
		},
		{ 
			field: 'source', 
			headerName: 'Source',
			width:150
		},
		{
			field: 'dest',
			headerName: 'Destination',
			width:150
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone',
			width:150
		},
		{
			field: 'ETA',
			headerName: 'ETA',
			width:200,
			flex:1,
			valueGetter: (value, row) => `${row.createdAt}`,
			sortable:true
		},
		{
			field: 'distanceRemaining',
			headerName: 'Distance Remaining',
			width:150
		},
		{
			field: 'currenStatus',
			headerName: 'Trip Status',
			width: 150
		},
		{
			field: 'TATStatus',
			headerName: 'TAT Status',
			width: 150},
		
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
				pageSizeOptions={[5, 10]}
				checkboxSelection
				disableColumnResize
				disableColumnMenu
			/>
		</>
	);
}
export default DataTable;
