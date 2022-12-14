import { useState } from "react";
import { Link } from 'react-router-dom';
import { InputBase, Checkbox, Button, InputAdornment, IconButton, Box, FormHelperText, Typography, Stack, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomBody = styled(Stack)({
    justifyContent: "center",
    width: "350px",
    margin: "0 auto",
});

const theme = createTheme({
    palette:{
      primary:{
        main: "#82B1FF",
        },
    },
});

const SignUp = () => {
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    const [values1, setValues1] = useState({
        repassword: "",
        showRePassword: false,
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [repasswordError, setRePasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleClickShowRePassword = () => {
        setValues1({
        ...values1,
        showRePassword: !values1.showRePassword,
        });
    };

    const handleAgree1 = (event) => {
        setChecked1(event.target.checked);
    };

    const handleAgree2 = (event) => {
        setChecked2(event.target.checked);
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setValues1({ ...values1, [prop]: event.target.value });
    };

    const onhandlePost = async (data) => {
        const { email, password, name } = data;
        const postData = { email, password, name };
        await axios
        .post("/check", postData)
        .then(function (response) {
            console.log(response, "Success!");
        })
        .catch(function (err) {
            console.log(err);
            console.log(postData);
            setRegisterError("??????????????? ?????????????????????!");
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            email: data.get("email"),
            name: data.get("name"),
            password: data.get("password"),
            repassword: data.get("repassword"),
        };
        const { email, name, password, repassword } = joinData;

        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email))
            setEmailError("????????? ????????? ??????????????????.");
        else setEmailError("");

        const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password))
            setPasswordError("??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????.");
        else setPasswordError("");

        if (password !== repassword) setRePasswordError('??????????????? ???????????? ????????????.');
        else setRePasswordError('');

        const nameRegex = /^[???-???a-zA-Z]+$/;
        if (!nameRegex.test(name) || name.length < 1) 
            setNameError('????????? ????????? ??????????????????.');
        else setNameError('');

        if (!checked1) alert("?????? ????????? ??????????????????.");
        if (!checked2) alert("???????????? ?????? ??? ????????? ??????????????????.");

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            password === repassword &&
            nameRegex.test(name) &&
            checked1 && checked2
        ) {
            onhandlePost(joinData);
        }
    };

    return (
        <div>
            <Header />
            <CustomBody>
                <Box sx={{ mt: 12, mb: 28 }}>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <InputBase
                            required
                            placeholder="????????? ??????"
                            id="email"
                            name="email"
                            type="email"
                            error={emailError !== "" || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                pl: 2,
                                mt: 2,
                            }}
                        />
                        <FormHelperText sx={{ color: "#E53935" }} >{emailError}</FormHelperText>
                        <InputBase
                            required
                            placeholder="????????????"
                            id="password"
                            name="password"
                            error={passwordError !== "" || false}
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                pl: 2,
                                mt: 2,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} size="small">
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText sx={{ color: "#E53935" }} >{passwordError}</FormHelperText>
                        <InputBase
                            required
                            placeholder="???????????? ??????"
                            id="repassword"
                            name="repassword"
                            error={repasswordError !== "" || false}
                            type={values1.showRePassword ? "text" : "password"}
                            value={values1.repassword}
                            onChange={handleChange("repassword")}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                pl: 2,
                                mt: 2,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton onClick={handleClickShowRePassword} size="small">
                                    {values1.showRePassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText sx={{ color: "#E53935" }} >{repasswordError}</FormHelperText>
                        <InputBase
                            required
                            placeholder="??????"
                            id="name"
                            name="name"
                            error={nameError !== '' || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                pl: 2,
                                mt: 2,
                            }}
                        />
                        <FormHelperText sx={{ color: "#E53935" }} >{nameError}</FormHelperText>
                        <Typography sx={{ fontSize: 14 }}>
                            <Checkbox onChange={handleAgree1} color="default" sx={{ "& .MuiSvgIcon-root": { fontSize: 32 }, color: "#82B1FF" }} />
                            <Link to="/terms" style={{ color: "#000000" }}>
                                ???????????? ??????
                            </Link>
                            <span style={{color: "#E53935"}}>&nbsp;(??????)</span>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <Checkbox onChange={handleAgree2} color="default" sx={{ "& .MuiSvgIcon-root": { fontSize: 32 }, color: "#82B1FF" }} />
                            <Link to="/terms" style={{ color: "#000000" }}>
                                ???????????? ?????? ??? ????????????
                            </Link>
                            <span style={{color: "#E53935"}}>&nbsp;(??????)</span>
                        </Typography>
                        <Button
                            theme={theme}
                            color="primary"
                            type="submit"
                            variant="contained"
                            className="signup-btn"
                            sx={{
                                borderRadius: 2,
                                bgcolor: "#82B1FF",
                                textTransform: "none",
                                width: "100%",
                                boxShadow: 0,
                                height: 60,
                                color: "#FFFFFF",
                                fontSize: 18,
                                fontWeight: 999,
                                mt: 2,
                            }}
                        >
                            ????????????
                        </Button>
                        <FormHelperText sx={{ color: "#E53935" }} >{registerError}</FormHelperText>
                    </Box>
                </Box>
            </CustomBody>
            <Footer />
        </div>
    );
};
export default SignUp;