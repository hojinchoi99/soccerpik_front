import { React, useState } from 'react';
import { Typography, IconButton, Modal, Box, Accordion, AccordionSummary, AccordionDetails, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    left: '0%',
    top: '0%',
    width: '85%',
    height: '100%',
    bgcolor: 'background.paper',
}

const LinkTextDecoration = {
    textDecoration: 'none',
    color: '#000000',
}

const Menu = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <IconButton
                size="large"
                color="inherit"
                onClick = {handleOpen}
            >
                <MenuIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Box sx={{backgroundColor: "#82B1FF" }}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                        >
                            <Typography sx={{fontSize: 14, pt: 4, color: "#FFFFFF"}}>
                                로그인 하면 더 많은
                            </Typography>
                            <Typography sx={{fontSize: 14, color: "#FFFFFF"}}>
                                축구화 정보를 제공받을 수 있어요.
                            </Typography>
                            <Link to="/signin" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
                                <Typography m={2} sx={{fontSize: 16, fontWeight: 999, pb: 2}}>로그인 ></Typography>
                            </Link>
                        </Stack>
                    </Box>
                    <Box sx={{p: 2.5, border: '1px solid #EEEEEE'}}>
                        <Link to="/" style={LinkTextDecoration}>
                                <Typography ml={0.5}>홈</Typography>    
                        </Link>
                    </Box>
                    <Accordion disableGutters elevation={0} sx={{p: 1, boxShadow: 2, border: '1px solid #EEEEEE'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>브랜드명</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2} mt={0}>나이키</Typography>
                            </Link>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2}>아디다스</Typography>
                            </Link>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2}>퓨마</Typography>
                            </Link>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters elevation={0} sx={{p: 1, boxShadow: 1, border: '1px solid #EEEEEE'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>더보기</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2} mt={0}>공지사항</Typography>
                            </Link>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2}>고객문의</Typography>
                            </Link>
                            <Link to="/" style={LinkTextDecoration}>
                                <Typography m={2}>약관 및 정책</Typography>
                            </Link>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Modal>
        </div>
    );
};

export default Menu;