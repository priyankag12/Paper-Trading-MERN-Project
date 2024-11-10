// export const closestStockValue = async (symbol) => {
//     try {
//         console.log(
//             "Closes stock value api key: ",
//             process.env.REACT_APP_API_KEY
//         );

//         const response = await fetch(
//             `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.REACT_APP_API_KEY}`
//         );

//         const data = await response.json();

//         console.log("CLOSEST STOCK VALUE RESPONSE", data);

//         if (!data["Time Series (5min)"]) {
//             // If the stock data is not available, return an error message
//             return { message: "Stock market closed" };
//         }

//         const currentTime = new Date();
//         const time24HoursAgo = new Date(
//             currentTime.getTime() - 24 * 60 * 60 * 1000
//         );

//         const fiveMinutesInMs = 5 * 60 * 1000;
//         let matchFound = null;

//         const timeSeries = data["Time Series (5min)"];
//         for (const timestamp in timeSeries) {
//             const dataTime = new Date(timestamp);
//             const timeDifference = Math.abs(time24HoursAgo - dataTime);

//             if (timeDifference <= fiveMinutesInMs) {
//                 matchFound = {
//                     timestamp,
//                     data: timeSeries[timestamp],
//                 };
//                 break;
//             }
//         }

//         // Return the matching stock data or a message if the market is closed
//         console.log("THIS IS RETURNING", matchFound.data);

//         return matchFound
//             ? matchFound.data
//             : { message: "Stock market is closed." };
//     } catch (error) {
//         // Return an error message in case of failure
//         return { message: "Error fetching stock data.", error: error.message };
//     }
// };

export const closestStockValue = async (symbol) => {
    try {
        console.log(
            "Closes stock value api key: ",
            process.env.REACT_APP_API_KEY
        );

        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.REACT_APP_API_KEY}`
        );

        const data = await response.json();

        console.log("CLOSEST STOCK VALUE RESPONSE", data);

        if (!data["Time Series (5min)"]) {
            return { message: "Stock market closed" };
        }

        const currentTime = new Date();
        const time24HoursAgo = new Date(
            currentTime.getTime() - 24 * 60 * 60 * 1000
        );

        const fiveMinutesInMs = 5 * 60 * 1000;
        let matchFound = null;
        let lastAvailable = null;

        const timeSeries = data["Time Series (5min)"];
        for (const timestamp in timeSeries) {
            const dataTime = new Date(timestamp);
            const timeDifference = Math.abs(time24HoursAgo - dataTime);

            // Update lastAvailable to the most recent timestamp if no match is found
            if (
                !lastAvailable ||
                dataTime > new Date(lastAvailable.timestamp)
            ) {
                lastAvailable = {
                    dataR: data,
                    timestamp,
                    data: timeSeries[timestamp],
                };
            }

            // If a match is found within 10 minutes, use it and break the loop
            if (timeDifference <= fiveMinutesInMs) {
                matchFound = {
                    dataR: data,
                    timestamp,
                    data: timeSeries[timestamp],
                };
                break;
            }
        }

        // Return the matching stock data if found, or the last available closing value otherwise
        console.log(
            "THIS IS RETURNING",
            matchFound ? matchFound.data : lastAvailable.data
        );

        return matchFound ? matchFound : lastAvailable;
    } catch (error) {
        return { message: "Error fetching stock data.", error: error.message };
    }
};
