
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import './CounterCard.css'


export default function CounterCard(props) {

    const {counterStatus,count,showPercentage,total,showOntimeSection,ontimeCount,setSelectedCounter,counterName,styleComp} = props
    return (
        <Box sx={styleComp}>
            <Card className={counterStatus} variant="outlined" >
            <CardActionArea onClick={()=>setSelectedCounter(counterName)}>
                    <CardContent sx={{ display: "flex"}}>
                        <div style={{flex:1}}>
                            <div style={{padding:"20px 0",fontSize:"large"}}>{counterStatus}</div>
                            <div><span style={{fontSize:"large"}}>{count} </span>
                                {
                                showPercentage && <span className='percentage'>{((count/total).toFixed(2))*100}%</span>
                                }
                            </div>
                        </div>
                        { showOntimeSection && 
                            <div className='Ontime-section'>
                                <div className="percentage-chart percentage-chart-focus">
                                    <svg viewBox="0 0 36 36">
                                        <path className="percentage-chart-bg" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="percentage-chart-stroke" style={{"--counter-var":((ontimeCount/count).toFixed(2))*100}}  d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="counter" style={{"--counter-end":((ontimeCount/count).toFixed(2))*100}}></div>
                                </div>
                                <div style={{fontSize: "16px",padding: "10px 0 0 10px"}}>On Time: {ontimeCount}</div>
                            </div>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
