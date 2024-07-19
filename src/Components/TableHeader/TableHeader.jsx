/**
 * The TableHeader component is responsible for rendering the header section of a table interface.
 * It includes a title and two buttons for updating the status and adding a new trip.
 * 
 * Props:
 * - `updateStatus`: A function passed as a prop to handle the action of updating the status when the "Update Status" button is clicked.
 * - `AddTrip`: A function passed as a prop to handle the action of adding a new trip when the "Add Trip" button is clicked.
 * - `disableUpdate`: A boolean value that determines whether the "Update Status" button should be disabled or not.
 * 
 */
import './TableHeader.css'
import {Button} from '@mui/material';
function TableHeader(props){
    const {updateStatus,AddTrip,disableUpdate} = props;
    return (
        <>
            <div className='table-header'>
                <span className='font-large'>Trip Details</span>
                <div className="button-container">
                    <Button variant="outlined" disabled={disableUpdate} className='margin-right10' size="small"  onClick={updateStatus}>Update Status</Button>
                    <Button variant="outlined"  size="small" className='button-color' onClick={AddTrip}>Add Trip</Button>
                </div>
            </div>
        </>
    )
}
export default TableHeader