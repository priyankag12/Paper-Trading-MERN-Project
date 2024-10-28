import React from "react";
import News from "../News/News";
import MarketOverview from "../TopGainersLosers/MarketOverview";
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
        <motion.div
      style={{ overflowX: "auto", maxWidth: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5 }}
    >
      <MarketOverview />
      <News />
    </motion.div>
    </>
  );
};

export default Home;
