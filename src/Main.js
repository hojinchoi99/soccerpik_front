import { React, useState } from 'react';
import { Stack, Select, InputLabel, Typography, styled, TextField, Box, InputAdornment, createTheme, Button, FormHelperText, MenuItem, FormControl } from "@mui/material";
import MeasureImg from './assets/footPic.png';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const muiTheme = createTheme({
    palette: {
        primary: {
            main: "#82B1FF",
        },
        secondary: {
            main: "#82B1FF",
        },
    },
});

const FormField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#82B1FF',
        },
    },
});

const BodyStack = styled(Stack)({
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
});

const Main = () => {
    const[length, setLength] = useState("");
    const[width, setWidth] = useState("");
    const[height, setHeight] = useState("");
    const[lengthError, setLengthError] = useState(false);
    const[widthError, setWidthError] = useState(false);
    const[heightError, setHeightError] = useState(false);
    const[field, setField] = useState("");
    const[comment, setComment] = useState("");
    const[fieldError, setFieldError] = useState(false);
    const[commit, setCommit] = useState("");
    const intRegex = /^[0-9]+$/;
    const floatRegex = /^\d*[.]\d{1}$/;
    const navigate = useNavigate();

    const onhandlePost = async (joinData) => {
        console.log(joinData);
        await axios
        .post('http://127.0.0.1:5000/search', joinData)
        .then(function(response){
            console.log(response, 'Success');
            navigate('/result');
        })
        .catch(function(err){
            console.log(err);
        });
    };

    const handleChange = (e) => {
        setField(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const joinData = {
            length: data.get("length"),
            width: data.get("width"),
            height: data.get("height"),
            field: data.get("field"),
        };
        const { length, width, height, field } = joinData;

        if(length !== "" && (floatRegex.test(length) || intRegex.test(length))){
            setLength("");
            setLengthError(false);
        }
        else {
            setLength("Invalidate Value!");
            setLengthError(true);
        }

        if(width !== "" && (floatRegex.test(width) || intRegex.test(width))) {
            setWidth("");
            setWidthError(false);
        }
        else {
            setWidth("Invalidate Value!");
            setWidthError(true);
        }
        
        if(height !== "" && (floatRegex.test(height) || intRegex.test(height))) {
            setHeight("");
            setHeightError(false);
        }
        else {
            setHeight("Invalidate Value!");
            setHeightError(true);
        }

        if(field !== "") {
            setComment("");
            setFieldError(false);
        }
        else{
            setComment("Please Select Field!");
            setFieldError(true);
        }

        if((floatRegex.test(length) || intRegex.test(length)) && (floatRegex.test(width) || intRegex.test(width)) && (floatRegex.test(height) || intRegex.test(height))) {
            onhandlePost(joinData)
        }
        else setCommit("Invalidate Information Exist!");
    };

    return (
        <div>
            <Header />
            <BodyStack sx={{backgroundColor: "#F0F0F0"}}>
                <Box sx={{m: 9, pl: 4, pr: 4, pt: 2, pb: 4, backgroundColor: "#FFFFFF"}}>
                    <Stack alignItems="center" sx={{mb: 2}}>
                        <img src={MeasureImg} alt=""/>
                    </Stack>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <BodyStack spacing={2}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#82B1FF"}}>발 사이즈 입력하고 <br />구장을 선택하세요.</Typography>
                            <FormControl sx={{ m:1, width: 253}} error={fieldError}>
                                <InputLabel id="sel">구장 선택</InputLabel>
                                <Select
                                    labelId="sel"
                                    label="구장 선택"
                                    id="field"
                                    name="field"
                                    value={field}
                                    onChange={handleChange}
                                    autoWidth
                                >
                                    <MenuItem value="">선택</MenuItem>
                                    <MenuItem value={"FG"}>천연잔디구장(FG)</MenuItem>
                                    <MenuItem value={"SG"}>천연잔디구장(SG)</MenuItem>
                                    <MenuItem value={"AG"}>인조잔디구장(AG)</MenuItem>
                                    <MenuItem value={"TF"}>풋살구장(TF)</MenuItem>
                                    <MenuItem value={"IC"}>실내구장(IC)</MenuItem>
                                </Select>
                                <FormHelperText>{comment}</FormHelperText>
                            </FormControl>
                            <FormField error={lengthError} label="길이" variant='outlined' id="length" name="length" helperText={length} InputProps={{endAdornment: <InputAdornment position="start">cm</InputAdornment>}} />
                            <FormField error={widthError} label="폭" variant='outlined' id="width" name="width" helperText={width} InputProps={{endAdornment: <InputAdornment position="start">cm</InputAdornment>}} />
                            <FormField error={heightError} label="높이" variant='outlined' id="height" name="height" helperText={height} InputProps={{endAdornment: <InputAdornment position="start">cm</InputAdornment>}} />
                            <Button theme={muiTheme} variant='contained' type="submit" sx={{ width: "253px", p: 1.55, borderRadius: 4, fontSize: '18px', fontWeight: '800', color: "#FFFFFF"}}>나에게 맞는 축구화 찾기</Button>
                            <FormHelperText>{commit}</FormHelperText>
                        </BodyStack>
                    </Box>
                </Box>
            </BodyStack>
            <Footer />
        </div>
    );
};

export default Main;