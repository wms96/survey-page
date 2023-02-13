import React from 'react';
import "./Survey.css"
import {CardActionArea, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useNavigate} from "react-router-dom";

export default function ({survey, code}) {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('/' + code);
    }

    return (
        <Card sx={{width: '25%', height: '45%'}} onClick={handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {survey['survey_name']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        number of answers: {survey['number_of_answer']}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
