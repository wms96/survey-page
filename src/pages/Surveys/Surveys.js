import React, {useEffect, useRef, useState} from 'react';
import "./Surveys.css"
import Charts from "../../components/Charts/Charts";
import Survey from "../../components/Survey/Survey";
import {Alert, alpha, AppBar, Box, InputBase, LinearProgress, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function () {
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData(searchValue = '') {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_BASE_API + 'listing?' + new URLSearchParams({
                keyword: searchValue
            }));
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

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            fetchData(searchValue);
        }
    };
    return (

        <div>
            {loading &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }
            {(data && !loading) && (
                <div>
                    <Charts data={data}/>
                    <AppBar position="static">
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={searchValue}
                                onChange={event => setSearchValue(event.target.value)}
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                onKeyDown={handleKeyDown}
                            />
                        </Search>
                    </AppBar>
                    <div className='surveys-holder'>
                        {Object.entries(data).map(([key, value]) => (
                            <Survey key={key} survey={value} code={key}/>
                        ))}
                    </div>
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
