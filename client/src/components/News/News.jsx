import {
    Box,
    CircularProgress,
    Container,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react"; 
  import NewsList from "./NewsList"; 
  
  const News = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
  
    const hardcodedArticles = [
      {
        title: "Sample News Article Title 1",
        url: "https://www.example1.com",
        banner_image: "https://images.unsplash.com/photo-1613919517761-0d9e719d3244?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2tzfGVufDB8fDB8fHww",
        published_at: "20241023T115620",
        summary: "This is a summary of the sample news article 1."
      },
      {
        title: "Sample News Article Title 2",
        url: "https://www.example2.com",
        banner_image: "https://images.unsplash.com/photo-1613919517761-0d9e719d3244?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2tzfGVufDB8fDB8fHww",
        published_at: "20241022T115620",
        summary: "This is a summary of the sample news article 2."
      },
    ];
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Latest Stock Market News
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" variant="body1">
            Error fetching news: {error}
          </Typography>
        )}
        <NewsList articles={hardcodedArticles} />
      </Container>
    );
  };
  
  export default News;