import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';



const AdminCard =({heading, content, link})=> {
    const navigate= useNavigate();
  return (
    <Card sx={{ maxWidth: 230, minWidth: 230, maxHeight: 100, background: "linear-gradient(90deg, rgba(2,178,175,0.7914624467951243) 0%, rgba(0,191,99,0.6654120266270571) 100%)" }}>
      <CardContent className='d-flex'>
        <Typography variant="h5" style={{borderRight:"1px solid black",textShadow: "1px 1px 0px #00e476", paddingRight:"5px", paddingBottom:"10px", fontFamily:"serif"}}>
          {heading}
        </Typography>
        <Typography variant="h6" style={{paddingLeft:"10px", paddingBottom:"10px"}}>
         {" "} {content}
        </Typography>
      </CardContent>
      <p style={{cursor:"pointer", textAlign:"center", borderTop:"1px solid black"}} onClick={()=>navigate(link)}>View Details &gt; </p>
    </Card>
  );
}
export default AdminCard;
