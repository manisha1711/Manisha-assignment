/**
 * UpdateTripModal Component
 * 
 * This component displays a modal dialog used for updating trip details. It allows users to change the
 * trip status and update the last ping time. The modal includes form controls for selecting the trip status
 * and a DateTime picker for updating the last ping time.
 * 
 * Props:
 * - open: Boolean indicating whether the modal is open or closed.
 * - onClose: Function to handle closing the modal.
 * - values: Object containing the current values of the trip details.
 * - setValues: Function to update the state with new values.
 * - updateTrip: Function to handle the trip update logic when the "Update Trip" button is clicked.
 * 
 * Features:
 * - Trip Status Selection: Allows users to select a new trip status from a dropdown menu.
 * - DateTime Picker: Enables users to select and update the last ping time using a date and time picker.
 * - Dialog Actions: Includes "Cancel" and "Update Trip" buttons for managing modal actions.
 * 
 * Styling:
 * - The modal is styled to a maximum width of "md" and includes padding for better layout.
 * - The form controls are styled with a width of 90% for the status selector and use Material-UI components for consistent design.
 * 
 * Libraries Used:
 * - Material-UI: For dialog, form controls, and buttons.
 * - Day.js: For handling date and time formatting.
 * - MUI X Date Pickers: For the DateTime picker functionality.
 */
import dayjs from 'dayjs';
import {DialogContent,Dialog,MenuItem,FormControl,InputLabel,Select,OutlinedInput,DialogTitle,DialogActions,Button,TextField} from '@mui/material';
import {DateTimePicker} from'@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function UpdateTripModal(props) {
    const {open,onClose,values,setValues,updateTrip} = props;
    return (
        <>
        <Dialog
            maxWidth="md"
            open={open}
            onClose={() => onClose()}
        >
        <DialogTitle>Update Trip</DialogTitle>
        <DialogContent style={{padding:"12px",width:"500px"}}>
            <div style={{padding:"10px"}}>
                <FormControl style={{width:"90%"}}>
                    <InputLabel id="demo-dialog-select-label">Trip Status</InputLabel>
                    <Select
                        required
                        size="small"
                        id="tri"
                        value={values.currenStatus}
                        onChange={(e) => {
                            let currenStatus = {currenStatus:e.target.value};
                            setValues(val => ({
                                ...val,
                                ...currenStatus
                            }));
                        }}
                        input={<OutlinedInput label="Trip Status" />}
                    >
                        <MenuItem value={"Booked"}>Booked</MenuItem>
                        <MenuItem value={"In Transit"}>In Transit</MenuItem>
                        <MenuItem value={"Reached Destination"}>Reached Destination</MenuItem>
                        <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{padding:"10px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            label="Time"
                            value={dayjs(values.lastPingTime)}
                            onChange={(newValue) => {
                                let lastPingTime = {lastPingTime:newValue.toString()};
                                    setValues(val => ({
                                        ...val,
                                        ...lastPingTime
                                    }));
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={updateTrip}>Update Trip</Button>
        </DialogActions>
        </Dialog>
        </>
    );
}

export default UpdateTripModal;
