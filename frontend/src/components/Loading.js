//Imports
import {Box, CircularProgress} from "@mui/material";

//Instanciation du composent
const Loading = () => {

    //JSX
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