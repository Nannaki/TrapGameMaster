import {Box, CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <>
            <Box
                sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}
            >
                <CircularProgress
                    size={50}
                    sx={{mt:20}}
                    color="secondary"
                />
            </Box>
        </>
    );
};

export default Loading;