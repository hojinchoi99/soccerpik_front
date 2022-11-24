import { React, useEffect, useState } from 'react';
import { Stack, styled, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Paper, Rating, Typography, createTheme, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const muiTheme = createTheme({
    typography: {
        h4 : {
            fontFamily: [
                "'Alfa Slab One', cursive",
            ],
            fontSize: "32px",
        },
    },
    palette: {
        primary: {
            main: "#82B1FF",
        },
        secondary: {
            main: "#82B1FF",
        },
    },
});

const BodyStack = styled(Stack)({
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
});

const Result = () => {
    const [resData, setResData] = useState("");
    const [count, setCount] = useState("");

    useEffect(() => 
    {
    	fetch("/result").then(
          response => response.json()
        ).then(
          data => {
            setResData(data);
            setCount(data.result.length);
          }
        ).catch(
          (err) => console.log(err)
        )
    }, [])

    function createData(
        number,
        name,
        rating,
    ){
        return { number, name, rating };
    }

    const rows = [];
    var i;
    for(i = 0; i < count; i++){
        rows.push(createData(i+1, resData.result[i].Name, 5 - (i-1)/3));
    }

    return (
        <div>
            <Header />
            <BodyStack sx={{backgroundColor: "#F0F0F0"}}>
                <Box sx={{ m: 3, pl: 1, pr: 1, pt: 10, pb: 40, backgroundColor: "#FFFFFF", '@media (min-width: 600px)': { pl: 8, pr: 8, width: 550, m: 9 }}}>
                    <Typography theme={muiTheme} variant='h4' color={'#82B1FF'} align="center">Football Boots</Typography>
                    <Typography theme={muiTheme} variant='h4' color={'#82B1FF'} align="center" mb={2}>Recommendation</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{fontSize: 18, fontWeight: "bold"}}>No.</TableCell>
                                    <TableCell align='center' sx={{fontSize: 18, fontWeight: "bold"}}>Shoes Name</TableCell>
                                    <TableCell align='center' sx={{fontSize: 18, fontWeight: "bold"}}>Recommendation Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.number}
                                    sx={{'&:last-child td, &:last-child th': {border : 0} }}>
                                        <TableCell align='center' components="th" scope='row' sx={{fontSize: 14, fontWeight: "bold"}}>
                                            {row.number}
                                        </TableCell>
                                        <TableCell align='center' sx={{fontSize: 14, fontWeight: "bold"}}>{row.name}</TableCell>
                                        <TableCell align='center'>
                                            <Rating value={row.rating} readOnly/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack alignItems="center" mt={3}>
                        <Link to="/">
                            <Button theme={muiTheme} variant="contained" sx={{ borderRadius: 3, width: 140, height: 60 }}>
                                <ArrowBackIcon sx={{color: "#FFFFFF", width: 60, height: 40}}/>
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </BodyStack>
            <Footer />
        </div>
    );
};

export default Result;