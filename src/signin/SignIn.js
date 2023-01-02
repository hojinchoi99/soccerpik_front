import { useState } from "react";
import { Link } from 'react-router-dom';
import { InputBase, Button, InputAdornment, IconButton, Box, FormHelperText, Typography, Stack, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KakaoLogo from '../assets/kakao_logo.png';
import NaverLogo from '../assets/naver_logo.png';
import FacebookLogo from '../assets/facebook_logo.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios";

const CustomBody = styled(Stack)({
    justifyContent: "center",
    width: "350px",
    margin: "0 auto",
});

const theme1 = createTheme({
  palette:{
    primary:{
      main: "#82B1FF",
    },
    secondary: {
      main: "#FCE51E",
    },
  },
});

const theme2 = createTheme({
  palette:{
    primary:{
      main: "#0800FF",
    },
    secondary: {
      main: "#00C83C",
    },
  },
});

const LinkTextDecoration = {
  textDecoration: 'none',
  color: '#000000',
  fontSize: 16,
  fontWeight: 999,
}

const SignIn = () => {
  const [email, setId] = useState("");
  const [password, setPw] = useState("");
  const [login, setLogin] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onhandlePost = async (data) => {
    const { email, password } = data;
    const postData = { email, password };

    await axios
      .post("/check", postData)
      .then(function (response) {
        console.log(response, "Success!");
      })
      .catch(function (err) {
        console.log(err);
        setLogin("로그인에 실패했습니다.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const { email, password } = joinData;

    if (email !== "") setId("");
    else setId("이메일을 입력해주세요.");

    if (password !== "") setPw("");
    else setPw("비밀번호를 입력해주세요.");

    if (password !== "" && email !== "") {
      onhandlePost(joinData);
    }
  };

  return (
    <div>
        <Header />
        <CustomBody>
            <Box sx={{ mt: 12, mb: 30 }}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <InputBase
                    required
                    placeholder="이메일 주소"
                    id="email"
                    name="email"
                    error={email !== "" || false}
                    sx={{
                        bgcolor: "#F4F4F4",
                        width: "100%",
                        height: 50,
                        borderRadius: 2,
                        pl: 2,
                        mt: 2,
                    }}
                />
                <FormHelperText sx={{ color: "#E53935" }} >{email}</FormHelperText>
                <InputBase
                    required
                    placeholder="비밀번호"
                    id="password"
                    name="password"
                    error={password !== "" || false}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    sx={{
                        bgcolor: "#F4F4F4",
                        width: "100%",
                        height: 50,
                        borderRadius: 2,
                        pl: 2,
                        mt: 1,
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} size="small">
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText sx={{ color: "#E53935" }} >{password}</FormHelperText>
                <Button
                    theme={theme1}
                    type="submit"
                    variant="contained"
                    color="primary"
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
                    로그인
                </Button>
                <FormHelperText sx={{ color: "#E53935" }} >{login}</FormHelperText>
              </Box>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
                pr={4}
                my={2}
              >
                <Link to="/findpw" style={LinkTextDecoration}>
                  <Typography>비밀번호 찾기</Typography>
                </Link>
                <Typography>|</Typography>
                <Link to="/signup" style={LinkTextDecoration}>
                  <Typography>회원가입</Typography>
                </Link>
              </Stack>
              <Button
                theme={theme1}
                variant="contained"
                color="secondary"
                sx={{
                    borderRadius: 2,
                    bgcolor: "#FCE51E",
                    textTransform: "none",
                    width: "100%",
                    boxShadow: 0,
                    height: 50,
                    color: "#000000",
                    fontSize: 16,
                    mb: 1,
                }}
              >
                <img src={KakaoLogo} alt="" style={{ height: "16px", width: "16px", marginRight: "6px"}} />카카오로 로그인
              </Button>
              <Button
                theme={theme2}
                variant="contained"
                color="primary"
                sx={{
                    borderRadius: 2,
                    bgcolor: "#0800FF",
                    textTransform: "none",
                    width: "100%",
                    boxShadow: 0,
                    height: 50,
                    color: "#FFFFFF",
                    fontSize: 16,
                    mb: 1,
                }}
              >
                <img src={FacebookLogo} alt="" style={{ height: "26px", width: "26px", marginRight: "6px"}} />Facebook으로 로그인
              </Button>
              <Button
                theme={theme2}
                variant="contained"
                color="secondary"
                sx={{
                    borderRadius: 2,
                    bgcolor: "#00C83C",
                    textTransform: "none",
                    width: "100%",
                    boxShadow: 0,
                    height: 50,
                    color: "#FFFFFF",
                    fontSize: 16,
                    mb: 1,
                }}
              >
                <img src={NaverLogo} alt="" style={{ height: "26px", width: "26px", marginRight: "6px"}} />네이버로 로그인
              </Button>
            </Box>
        </CustomBody>
        <Footer />
    </div>
  );
};

export default SignIn;