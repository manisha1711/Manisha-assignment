
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './CounterCard.css'


export default function CounterCard(props) {

    const {counterStatus,count,showPercentage,total} = props
    return (
        <Box  sx={{ minWidth: 275 ,textAlign:"left"}}>
            <Card className={counterStatus=="Delayed"?"delayed-counter":"border-radius"} variant="outlined">
                    <CardContent>
                            <div style={{padding:"20px 0"}}>{counterStatus}</div>
                            <div>{count} 
                            {
                               showPercentage && <span className='percentage'>{((count/total).toFixed(2))*100}%</span>
                            }
                            </div>
                    </CardContent>
            </Card>
        </Box>
    );
}
