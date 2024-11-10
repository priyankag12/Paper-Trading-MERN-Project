import React from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { formatDate } from "../../utils/formatDate"; 
import { motion } from "framer-motion";

const NewsArticle = ({ article, delay }) => {
  const theme = useTheme(); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay }} 
    >
      <Card 
        variant="outlined" 
        sx={{
          margin: "10px 0", 
          height: "120px", 
          borderColor: theme.palette.accent.main,
          transition: "transform 0.3s, box-shadow 0.3s", 
          "&:hover": {
            transform: "translateY(-5px)", 
            boxShadow: `0 4px 20px ${theme.palette.accent.main}`, 
          },
        }}
      >
        <CardContent sx={{ display: 'flex', flexGrow: 1, height: '100%', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                textOverflow: "ellipsis", 
                overflow: "hidden", 
                color: theme.palette.text.primary 
              }}
            >
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
              {formatDate(article.time_published)}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '20%', 
              overflow: 'hidden', 
              borderRadius: '4px' 
            }}
          >
            <img
              src={article.banner_image}
              alt={article.title}
              style={{
                width: "100%", 
                height: "auto", 
                maxHeight: "80px", 
                objectFit: "cover",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsArticle;