import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Box, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        const profit = coin.price_change_percentage_24h >= 0;

        return (
            <Box
                key={coin.id}
                component={Link}
                to={`/coins/${coin.id}`}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "white",
                    textDecoration: "none",
                }}
            >
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />

                <Typography variant="body2">
                    {coin.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "#0ecb81" : "red"
                        }}
                    >
                        {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </Typography>

                <Typography variant="h6">
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </Typography>
            </Box>
        );
    });

    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
    };

    return (
        <Box
            sx={{
                height: "50%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <AliceCarousel
                mouseTracking
                infinite
                autoPlay
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
            />
        </Box>
    );
};

export default Carousel;
