import { AppBar, Typography, createTheme } from "@mui/material";
import { Link } from "react-router-dom";

const muiTheme = createTheme({
    typography: {
        h4 : {
            fontFamily: [
                "'Alfa Slab One', cursive",
            ],
            fontSize: "32px",
        },
    },
});

const Header = () => {
    return (
        <AppBar sx={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
            backgroundColor: "#82B1FF"}}>
            <Link to="/" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
                <Typography theme={muiTheme} variant='h4' m={2}>
                        <em>Futbolista</em>
                </Typography>
            </Link>
        </AppBar>
    );
};

export default Header;