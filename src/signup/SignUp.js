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
            setRegisterError("회원가입에 실패하였습니다!");
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
            setEmailError("이메일 주소를 확인해주세요.");
        else setEmailError("");

        const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password))
            setPasswordError("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.");
        else setPasswordError("");

        if (password !== repassword) setRePasswordError('비밀번호가 일치하지 않습니다.');
        else setRePasswordError('');

        const nameRegex = /^[가-힣a-zA-Z]+$/;
        if (!nameRegex.test(name) || name.length < 1) 
            setNameError('올바른 이름을 입력해주세요.');
        else setNameError('');

        if (!checked1) alert("이용 약관에 동의해주세요.");
        if (!checked2) alert("개인정보 수집 및 이용에 동의해주세요.");

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
                            placeholder="이메일 주소"
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
                            placeholder="비밀번호"
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
                            placeholder="비밀번호 확인"
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
                            placeholder="이름"
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
                                이용약관 동의
                            </Link>
                            <span style={{color: "#E53935"}}>&nbsp;(필수)</span>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <Checkbox onChange={handleAgree2} color="default" sx={{ "& .MuiSvgIcon-root": { fontSize: 32 }, color: "#82B1FF" }} />
                            <Link to="/terms" style={{ color: "#000000" }}>
                                개인정보 수집 및 이용동의
                            </Link>
                            <span style={{color: "#E53935"}}>&nbsp;(필수)</span>
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
                            가입하기
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