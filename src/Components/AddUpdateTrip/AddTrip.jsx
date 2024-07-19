import {useState} from "react";
import { DialogContent,Dialog,MenuItem,FormControl,InputLabel,Select,OutlinedInput,DialogTitle,DialogActions,Button,TextField} from '@mui/material';


function AddTripModal(props) {
    const {open,onClose,values,setValues,saveTrip} = props;
    const [tripIDError,setTripIDError] = useState(false);
    const [sourceError,setSourceError] = useState(false);
    const [destError,setDestError] = useState(false);
    const [phoneError,setPhoneError] = useState(false);
    const [transporterError,setTransporterError] = useState(false);

    const save = () =>{
        if(values.phoneNumber.length==10 && values.dest.length && values.source.length && values.tripId.length && values.transporter.length){
            saveTrip();
            setShowSuccess(true);
        }else{
            if(values.phoneNumber.length<10){
                setPhoneError(true);
            }else{
                setPhoneError(false);
            }
            if(values.dest.length<1){
                setDestError(true)
            }else{
                setDestError(false)
            }
            if(values.source.length<1){
                setSourceError(true)
            }else{
                setSourceError(false)
            }
            if(values.tripId.length<1){
                setTripIDError(true)
            }else{
                setTripIDError(false)
            }
            if(values.transporter.length<1){
                setTransporterError(true)
            }
        }
    }
    return (
        <>
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
                    id="tripId"
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
                <FormControl sx={{minWidth:"45%"}}>
                    <InputLabel className={transporterError?"error":""} id="demo-dialog-select-label">Transporter</InputLabel>
                    <Select
                        required
                        size="small"
                        id="transporter"
                        value={values.transporter}
                        error={transporterError}
                        onChange={(e) => {
                            let transporter = {transporter:e.target.value};
                            setValues(val => ({
                                ...val,
                                ...transporter
                            }));
                        }}
                        input={<OutlinedInput label="Transporter" />}
                    >
                        <MenuItem value={"Bluedart"}>Bluedart</MenuItem>
                        <MenuItem value={"DTDC"}>DTDC</MenuItem>
                        <MenuItem value={"Delhivery"}>Delhivery</MenuItem>
                        <MenuItem value={"Merks"}>Merks</MenuItem>
                    </Select>
                    {transporterError&& <span className="error">Please enter your transporter</span>}
                </FormControl>
            </div>
            <div style={{display: "flex",justifyContent: "space-between",padding:"10px"}}>
                <TextField
                    required
                    sx={{minWidth:"45%"}}
                    size="small"
                    label="Source"
                    id="source"
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
                    id="Destination"
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
                    required
                    label="Phone"
                    size="small"
                    id="Phone"
                    value={values.phoneNumber}
                    onChange={(e) => {
                        let phoneNumber = {phoneNumber:e.target.value};
                        const reg = new RegExp(/^[0-9]+$/)
                        let Valid  = reg.test(e.target.value)
                        if (e.target.validity.valid) {
                            setPhoneError(false);
                        } else {
                            setPhoneError(true);
                        }
                        if(!e.target.value || (Valid && e.target.value && e.target.value.length<=10)){
                            setValues(val => ({
                                ...val,
                                ...phoneNumber
                            }));
                        }
                        
                    }}
                    error={phoneError}
                    helperText={phoneError ? "Please enter your Phone Number" : ""}
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

export default AddTripModal;
