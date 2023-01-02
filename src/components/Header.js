import { AppBar, Typography, createTheme, IconButton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Menu from './Menu';
import { Link } from "react-router-dom";

const muiTheme = createTheme({
    typography: {
        h5 : {
            fontFamily: [
                "'Alfa Slab One', cursive",
            ],
            fontSize: "24px",
        },
    },
});

const Header = () => {
    return (
        <AppBar sx={{
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
            backgroundColor: "#82B1FF"}}>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Menu />
                    <Link to="/" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
                        <Typography theme={muiTheme} variant='h5' m={2}><em>Futbolista</em></Typography>
                    </Link>
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                        <SearchIcon />
                    </IconButton>
                </Stack>
        </AppBar>
    );
};

export default Header;