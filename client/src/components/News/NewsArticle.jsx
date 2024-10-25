import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../utils/formatDate"; 

const NewsArticle = ({ article }) => {
  return (
    <Card variant="outlined" sx={{ margin: "10px 0" }}>
      <CardContent sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }} 
            >
              {article.title}
            </a>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {formatDate(article.published_at)} 
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            {article.summary}
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: '25%', 
          }}
        >
          <img
            src={article.banner_image}
            alt={article.title}
            style={{
              width: "100%", 
              height: "auto",
              borderRadius: "4px",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsArticle;