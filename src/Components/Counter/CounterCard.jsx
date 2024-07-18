
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function CounterCard(props) {

    const {counterStatus,count} = props
    return (
        <Box sx={{ minWidth: 275,flex:1 }}>
            <Card variant="outlined">
                    <CardContent>
                            <div>{counterStatus}</div>
                            <div>{count}</div>
                    </CardContent>
            </Card>
        </Box>
    );
}
