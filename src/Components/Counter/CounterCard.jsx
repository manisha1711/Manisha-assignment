
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './CounterCard.css'


export default function CounterCard(props) {

    const {counterStatus,count,showPercentage,total,showOntimeSection,ontimeCount} = props
    return (
        <Box  sx={{ minWidth: 275 ,textAlign:"left"}}>
            <Card className={counterStatus} variant="outlined">
                    <CardContent sx={{ display: "flex"}}>
                        <div style={{flex:1}}>
                            <div style={{padding:"20px 0"}}>{counterStatus}</div>
                            <div>{count} 
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
                                <div>On Time: {ontimeCount}</div>
                            </div>
                        }
                    </CardContent>
            </Card>
        </Box>
    );
}
