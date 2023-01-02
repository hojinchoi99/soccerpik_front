import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterStack = styled(Stack)({
    flexDirection: "row",
    background: "#F0F0F0",
    color: "#838383",
    paddingBottom: 32,
    paddingTop: 32,
});

const Footer = () => {
    return (
        <FooterStack>
            <Stack sx={{ flex: 1 }} alignItems="center">
                <Stack
                sx={{ flex: 1, mt: 5 }}
                alignItems="center"
                spacing={2}
                direction="row">
                    <Typography variant="body1">About</Typography>
                    <Typography variant="body1">|</Typography>
                    <Typography variant="body1">Contact</Typography>
                    <Typography variant="body1">|</Typography>
                    <Typography variant="body1">Terms and Conditions</Typography>
                </Stack>
                <Typography variant="body2">
                    © 2023. Futbolista. all rights reserved.
                </Typography>
            </Stack>
        </FooterStack>
    );
};

export default Footer;