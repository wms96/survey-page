import React, {useEffect, useRef, useState} from 'react';
import "./Details.css"
import {Alert, Box, CardActionArea, LinearProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import BarChart from "../../components/BarChart/BarChart";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

export default function () {
    let {code} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_BASE_API + 'listing/' + code);
            const json = await response.json();
            setData(json);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const mounted = useRef(false);

    useEffect(() => {
        fetchData();
    }, []);
    return (

        <div>
            {loading &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }
            {(data && !loading) && (
                <div>
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key}>
                            {value['type'] === 'qcm' &&
                                <BarChart labels={Object.keys(value.result)} values={Object.values(value.result)}
                                          label={value.label}/>}
                            {value['type'] === 'numeric' &&
                                <div className='numeric-value-holder'>
                                    <Card sx={{width: '25%', height: '45%'}}>
                                        <CardActionArea>
                                            <CardContent>
                                                <h4>{value.label}</h4>
                                                <h6>Average: {value.result}</h6>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            )}
            {(error) && (
                <div>
                    <Alert severity="error">an error occurred please check it later!</Alert>
                </div>
            )}
        </div>
    )
}
