import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const Post = ({ post }) => {
  const { title, body } = post;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
       
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
