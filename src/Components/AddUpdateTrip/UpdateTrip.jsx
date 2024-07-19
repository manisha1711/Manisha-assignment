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
