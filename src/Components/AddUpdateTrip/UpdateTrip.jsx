import {useState} from "react";
import { DialogContent,Dialog,MenuItem,FormControl,InputLabel,Select,OutlinedInput,DialogTitle,DialogActions,Button,TextField} from '@mui/material';


function UpdateTripModal(props) {
    const {open,onClose,values,setValues,updateTrip} = props;
    const [currenStatusError,setCurrenStatusError] = useState(false);
    const [timeError,setTimeErr] = useState(false)
    const save = () =>{
        if( values.currenStatus.length){
            updateTrip();
        }else{
            if(values.currenStatus.length<1){
                setCurrenStatusError(true)
            }
        }
    }
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
                    <InputLabel className={currenStatusError?"error":""} id="demo-dialog-select-label">Trip Status</InputLabel>
                    <Select
                        required
                        size="small"
                        id="tri"
                        value={values.currenStatus}
                        error={currenStatusError}
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
                    {currenStatusError&& <span className="error">Please enter your Current Status</span>}
                </FormControl>
            </div>
            <div style={{padding:"10px"}}>
                <TextField
                    style={{width:"90%"}}
                    required
                    size="small"
                    label="Time"
                    id="time"
                    value={values.lastPingTime}
                    onChange={(e) => {
                        let lastPingTime = {lastPingTime:e.target.value};
                        setValues(val => ({
                            ...val,
                            ...lastPingTime
                        }));
                        if (e.target.validity.valid) {
                            setTimeErr(false);
                        } else {
                            setTimeErr(true);
                        }
                    }}
                    error={timeError}
                    helperText={timeError ? "Please enter correct time" : ""}
                />
                
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    );
}

export default UpdateTripModal;
