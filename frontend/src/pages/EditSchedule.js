import Header from "../components/Header";
import {Box} from "@mui/material";
import SchedulerTest from "../components/SchedulerTest";


const EditSchedule = () => {

    return (
        <>
            <Header />
            <Box
                sx={{mt: 15}}
            >
                <SchedulerTest/>
            </Box>
        </>
    );
};

export default EditSchedule;