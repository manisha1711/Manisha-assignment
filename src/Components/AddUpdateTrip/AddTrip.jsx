import {useState} from "react";
import { DialogContent,Dialog,Input,DialogTitle,DialogActions,Button,TextField} from '@mui/material';


function AddTripModal(props) {
    const {open,onClose,values,setValues} = props;
    const [tripIDError,setTripIDError] = useState(false);
    const [sourceError,setSourceError] = useState(false);
    const [destError,setDestError] = useState(false);
    return (
        <Dialog
        
            fullWidth
            maxWidth="md"
            open={open}
            onClose={() => onClose()}
        >
        <DialogTitle>Add Trip</DialogTitle>
        <DialogContent style={{padding:"12px"}}>
            <div style={{display: "flex",justifyContent: "space-between",padding:"10px"}}>
                <TextField
                    required
                    sx={{minWidth:"45%"}}
                    label="Trip ID"
                    size="small"
                    id="outlined-start-adornment"
                    value={values.tripId}
                    onChange={(e) => {
                        let tripId = {tripId:e.target.value};
                        setValues(val => ({
                            ...val,
                            ...tripId
                        }));
                        if (e.target.validity.valid) {
                            setTripIDError(false);
                        } else {
                            setTripIDError(true);
                        }
                    }}
                    error={tripIDError}
                    helperText={tripIDError ? "Please enter your Trip ID" : ""}
                />
                <TextField
                    sx={{minWidth:"45%"}}
                    label="Transporter"
                    size="small"
                    id="outlined-start-adornment"
                    value={values.transporter}
                    onChange={(event) => console.log(event.target.value)}
                />
            </div>
            <div style={{display: "flex",justifyContent: "space-between",padding:"10px"}}>
                <TextField
                    required
                    sx={{minWidth:"45%"}}
                    size="small"
                    label="Source"
                    id="outlined-start-adornment"
                    value={values.source}
                    onChange={(e) => {
                        let source = {source:e.target.value};
                        setValues(val => ({
                            ...val,
                            ...source
                        }));
                        if (e.target.validity.valid) {
                            setSourceError(false);
                        } else {
                            setSourceError(true);
                        }
                    }}
                    error={sourceError}
                    helperText={sourceError ? "Please enter your Source" : ""}

                />
                <TextField
                    required
                    sx={{minWidth:"45%"}}
                    size="small"
                    label="Destination"
                    id="outlined-start-adornment"
                    value={values.dest}
                    onChange={(e) => {
                        let dest = {dest:e.target.value};
                        setValues(val => ({
                            ...val,
                            ...dest
                        }));
                        if (e.target.validity.valid) {
                            setDestError(false);
                        } else {
                            setDestError(true);
                        }
                    }}
                    error={destError}
                    helperText={destError ? "Please enter your Source" : ""}
                />
            </div>
            <div style={{display: "flex",justifyContent: "space-between",padding:"10px"}}>
                <TextField
                    label="Phone"
                    size="small"
                    id="outlined-start-adornment"
                    value={values.phoneNumber}
                    onChange={(event) => console.log(event.target.value)}
                />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
        </Dialog>
    );
}

export default AddTripModal;
