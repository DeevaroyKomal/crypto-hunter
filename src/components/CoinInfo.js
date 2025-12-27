import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress, Box } from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState(null);
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, currency)
        );
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
    }, [days, currency, coin.id]);

    if (!historicData) {
        return (
            <CircularProgress
                sx={{ color: "orchid", mt: 10 }}
                size={250}
                thickness={1}
            />
        );
    }

    return (
        <Box
            sx={{
                width: { xs: "100%", md: "75%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
                p: { xs: 2, md: 5 },
            }}
        >
            <Line
                data={{
                    labels: historicData.map((coin) => {
                        const date = new Date(coin[0]);
                        const time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes().toString().padStart(2, "0")} PM`
                                : `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                        {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "orchid",
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: { radius: 1 },
                    },
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    mt: 3,
                    justifyContent: "space-around",
                    width: "100%",
                }}
            >
                {chartDays.map((day) => (
                    <SelectButton
                        key={day.value}
                        selected={day.value === days}
                        onClick={() => setDays(day.value)}
                    >
                        {day.label}
                    </SelectButton>
                ))}
            </Box>
        </Box>
    );
};

export default CoinInfo;
