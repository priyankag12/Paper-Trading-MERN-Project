import React, { useEffect, useMemo, useState } from "react";
import { getOHCLV } from "../services/getOHLCV";
import { formatStockData } from "./utils/formatStockData";
import ReactApexCharts from "react-apexcharts";

const CandleStickGraph = ({ symbol }) => {
    const [stockData, setStockData] = useState({});
    useEffect(() => {
        getOHCLV(symbol).then((data) => setStockData(data));
    }, []);

    const seriesData = useMemo(() => formatStockData(stockData), [stockData]);
    console.log(seriesData);

    return (
        <ReactApexCharts
            series={[{ data: seriesData }]}
            options={{
                chart: {
                    type: "candlestick",
                    height: 350,
                },
                title: {
                    text: "CandleStick Chart",
                    align: "left",
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    tooltip: {
                        enabled: true,
                    },
                },
            }}
            type="candlestick"
            height={350}
        />
    );
};

export default CandleStickGraph;
