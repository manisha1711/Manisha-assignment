import './TableHeader.css'
import {Button} from '@mui/material';
function TableHeader(props){
    const {updateStatus,AddTrip,disableUpdate} = props;
    return (
        <>
            <div className='table-header'>
                <span>Trip Details</span>
                <div className="button-container">
                    <Button variant="outlined" disabled={disableUpdate}  size="small" style={{backgroundColor: "rgb(25, 118, 210)",color: "white"}} onClick={updateStatus}>Update Status</Button>
                    <Button variant="outlined"  size="small" style={{backgroundColor: "rgb(25, 118, 210)",color: "white"}} onClick={AddTrip}>Add Trip</Button>
                </div>
            </div>
        </>
    )
}
export default TableHeader