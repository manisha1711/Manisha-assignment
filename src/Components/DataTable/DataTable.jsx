/**
 * The DataTable component displays a grid of trip data using Material-UI's DataGrid component.
 * It provides a structured view of trip details with filtering, pagination, and selection features.
 * 
 * Props:
 * - `data`: An array of objects representing the trip data to be displayed in the grid.
 * - `filterModel`: An object representing the current filter model for the grid, controlling which rows are visible based on the filter criteria.
 * - `setFilterModel`: A function to update the filter model based on user interactions with the grid's filters.
 * - `setSelectedRowData`: A function to set the currently selected row's data, typically used to enable or disable actions based on selection.
 * - `setDisableUpdate`: A function to enable or disable the update functionality based on row selection.
 * 
 * Features:
 * - Columns: The grid has predefined columns for trip details such as Trip ID, Transporter, Source, Destination, Phone, ETA, Distance Remaining, Trip Status, and TAT Status.
 * - Formatting:
 *   - `ETA`: Computes the estimated time of arrival based on the trip's creation date and ETA days, formatted using the `formatDate` utility function.
 *   - `Trip Status` and `TAT Status`: Displayed as buttons with colors indicating their status, using the `statusColor` object for color mapping.
 * - Row Selection: Allows single row selection, updating the selected row data and enabling update actions.
 * - Pagination: The grid is configured with pagination, displaying 10 rows per page by default.
 * - Custom Styling: Includes custom styling for focusing on grid cells and column headers.
 * 
 * The DataGrid component is highly customizable and integrates with Material-UI's styling system to provide a responsive and user-friendly data table experience.
 */

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import {formatDate,calculateTATStatus} from '../../Utils/utils';
import './DataTable.css';

function DataTable(props){
	const {data,filterModel,setFilterModel,setSelectedRowData,setDisableUpdate} = props;
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
				return calculateTATStatus(trip)
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
			{
				/**
				 * DataTable Component
				 * 
				 * This component renders a DataGrid from the MUI library, which is used to display and manage trip data
				 * in a tabular format. It supports features such as pagination, filtering, and row selection.
				 * 
				 * Props:
				 * - data: Array of objects representing trip details to be displayed in the grid.
				 * - filterModel: Object representing the current filter criteria applied to the grid.
				 * - setFilterModel: Function to update the filter criteria.
				 * - setSelectedRowData: Function to update the state with the currently selected row's data.
				 * - setDisableUpdate: Function to enable or disable the update button based on row selection.
				 * 
				 * Features:
				 * - Pagination: Allows users to navigate through pages of data with page size options.
				 * - Filtering: Users can filter the displayed data based on various criteria.
				 * - Row Selection: Allows users to select rows using checkboxes. Selection updates the row data and
				 *   enables/disables the update functionality.
				 * - Custom Styling: Includes custom styles to manage focus outlines, icon visibility, and sort icon opacity.
				 * 
				 * Columns:
				 * - Trip ID, Transporter, Source, Destination, Phone, ETA, Distance Remaining, Trip Status, and TAT Status.
				 * 
				 * Note: The grid is configured to prevent column resizing, column menu interactions, multiple row selection,
				 * and row selection on click, focusing instead on checkbox selection.
 				*/
			}
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
				onRowSelectionModelChange={(ids) => {
					const selectedIDs = new Set(ids);
					const selectedRowData = data.filter((row) =>
						selectedIDs.has(row.id.toString())
					)
					setSelectedRowData(selectedRowData[0])
					setDisableUpdate(false);
				}}
				filterModel={filterModel}
        		onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				disableColumnResize
				disableColumnMenu
				disableMultipleRowSelection
				disableRowSelectionOnClick
			/>
		</>
	);
}
export default DataTable;