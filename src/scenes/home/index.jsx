import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import featImg from "../../images/zt-pillars.jpg";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrafficIcon from "@mui/icons-material/Traffic";

const HomePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <Box m="20px">
        <Header title="HOME" subtitle="Welcome" />
        <Box height="75vh" display="flex" justifyContent="center">
            <Box
                width="900px"
                display="grid"
                gap="10px"
                gridTemplateColumns="repeat(2, 1fr)"
            >
                <Box
                    display='flex'
                    alignItems='center'
                    gridColumn='1 / 3'
                    justifyContent="center" 
                >
                    <img
                        style={{boxShadow: '0 0 10px 5px skyblue', width: '700px'}}
                        src={featImg}
                        alt="home page symbol"
                    />
                </Box>

                <Box
                    display='flex'
                    backgroundColor={colors.primary[400]}
                    justifyContent='center'
                    alignItems='center'
                >
                    <StatBox
                        title="12,361"
                        subtitle="Trust Score"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <AccountBalanceIcon
                                sx={{ color: colors.grey[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    display='flex'
                    backgroundColor={colors.primary[400]}
                    justifyContent='center'
                    alignItems='center'
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Received"
                        progress="0.40"
                        increase="+43%"
                        icon={
                            <TrafficIcon
                                sx={{ color: colors.grey[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

            </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
