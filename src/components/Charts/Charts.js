import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea} from '@mui/material';
import BarChart from "../BarChart/BarChart";

export default function ({data}) {
    let labels = [];
    let values = [];
    Object.entries(data).map(([key, value]) => {
        labels.push(value.survey_name);
        values.push(value.number_of_answer);
    });
    return (
        <Card sx={{width: '100%', height: '45%'}}>
            <CardActionArea>
                <CardContent>
                    <BarChart labels={labels} values={values}/>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
