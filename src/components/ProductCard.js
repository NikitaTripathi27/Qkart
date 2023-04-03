import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  
  return (
    
    <Card className="card">
      <CardMedia component="img" image={product.image} alt={product.name}/>
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          {product.name}
      </Typography>
      <Typography component="legend">${product.cost}</Typography>
      <Rating name="read-only" value={product.rating} readOnly />
      
      </CardContent>
      <CardActions>
        <Button size="small"
                fullWidth
                variant="contained"
                startIcon={<AddShoppingCartOutlined />}
                 onClick={handleAddToCart}>
                  ADD TO CART
        </Button>
        
      </CardActions>
    </Card>
  );
};

export default ProductCard;
