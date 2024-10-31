import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react"; 
import NewsList from "./NewsList"; 
import { fetchNews } from "../../api/homeApi";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getNews = async () => {
      setLoading(true); 
      try {
        const articles = await fetchNews();
        setNews(articles);
      } catch (err) {
        console.error("Error fetching news:", err); 
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Latest News
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <NewsList articles={news} />
      )}
    </Container>
  );
};

export default News;