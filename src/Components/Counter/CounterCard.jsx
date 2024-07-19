/**
 * The CounterCard component is used to display a statistical card with various information such as status, count,
 * and optional percentage and on-time sections. It is styled using Material-UI components and custom CSS.
 * 
 * Props:
 * - `counterStatus`: The main status text to display on the card (e.g., "Total Trips").
 * - `count`: The numerical count associated with the counterStatus (e.g., total number of trips).
 * - `showPercentage`: A boolean indicating whether to display the percentage of the count relative to the total.
 * - `total`: The total number used to calculate the percentage (relevant if showPercentage is true).
 * - `showOntimeSection`: A boolean indicating whether to display the on-time section with a percentage chart.
 * - `ontimeCount`: The count of items that are on time, used in the on-time section.
 * - `setSelectedCounter`: A function to update the selected counter status when the card is clicked.
 * - `counterID`: A unique identifier for the counter, used to specify which counter is selected.
 * - `styleComp`: Custom styles to be applied to the Box component containing the Card.
 * 
 * The component utilizes Material-UI's Box, Card, CardContent, and CardActionArea components for layout and interaction.
 * It includes:
 * - A title section showing `counterStatus` and `count`, with an optional percentage display.
 * - An optional on-time section with a circular percentage chart and on-time count.
 * 
 * The `CardActionArea` component handles clicks, invoking the `setSelectedCounter` function with `counterID` to update
 * the selected counter in the parent component.
 */

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import './CounterCard.css'


export default function CounterCard(props) {

    const {counterStatus,count,showPercentage,total,showOntimeSection,ontimeCount,setSelectedCounter,counterID,styleComp} = props
    return (
        <Box sx={styleComp}>
            <Card className={counterStatus} variant="outlined" >
            <CardActionArea onClick={()=>setSelectedCounter(counterID)}>
                    <CardContent sx={{ display: "flex"}}>
                        <div className='flex1'>
                            <div  className='font-larger paddingTB20'>{counterStatus}</div>
                            <div><span className='font-larger'>{count} </span>
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
                                <div className='ontime-count'>On Time: {ontimeCount}</div>
                            </div>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
