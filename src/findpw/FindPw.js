import { InputBase, Button, Box, FormControl, Typography, Stack, createTheme, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
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

const FindPw = () => {
    const [emailError, setEmailError] = useState("");
    const [findError, setFindError] = useState("");

    const onhandlePost = async (data) => {
        const { email } = data;
        const postData = { email };
    
        await axios
            .post("/check", postData)
            .then(function (response) {
            console.log(response, "Success!");
        })
            .catch(function (err) {
            console.log(err);
            setFindError("비밀번호 재설정 실패!");
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData(e.currentTarget);
        const joinData = {
          email: data.get("email"),
        };
        const { email } = joinData;
    
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email))
            setEmailError("올바른 이메일 주소를 입력해주세요.");
        else setEmailError("");
    
        if (emailRegex.test(email)) {
          onhandlePost(joinData);
        }
    };

    return (
        <div>
            <Header />
            <CustomBody>
                <Box sx={{ mt: 12, mb: 54 }}>
                    <Typography sx={{ fontSize: 14}}>
                        회원가입 시 등록한 이메일 주소를 입력해 주세요.
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <FormControl component="fieldset" variant="standard" fullWidth>
                            <InputBase
                                placeholder="이메일 주소"
                                id="email"
                                name="email"
                                error={emailError !== "" || false}
                                sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                pl: 2,
                                mt: 1,
                                }}
                            />
                            <FormHelperText sx={{ color: "#E53935" }}>{emailError}</FormHelperText>
                            <Typography sx={{ my: 2, fontSize: 12, color: "#666" }}>
                                - 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "#666", mb: 4 }}>
                                - 소셜 계정 회원은 비밀번호 찾기가 불가능합니다.
                            </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                theme={theme}
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
                                }}
                            >
                                확인
                            </Button>
                            <FormHelperText sx={{color: "#E53935"}}>{findError}</FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
            </CustomBody>
            <Footer />
        </div>
    );
};
export default FindPw;
