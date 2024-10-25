import React from 'react';
import { Grid } from '@mui/material';
import NewsArticle from './NewsArticle'; 

const NewsList = ({ articles }) => {
    return (
      <Grid container spacing={2}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={6} key={index}>
            <NewsArticle article={article} />
          </Grid>
        ))}
      </Grid>
    );
  };

export default NewsList;