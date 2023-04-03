import { Search, SentimentDissatisfied , AddShoppingCartOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";

import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart, { getTotalCartValue } from "./Cart"
import { generateCartItemsFrom } from "./Cart";
import { updateClassDeclaration } from "typescript";


// Definition of Data Structures used

/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product



/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

 const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const[productarray,setproductarray] = useState([]);
  const[cp,setcp] = useState(0);
  const[item,setitem] = useState("");
  const[debounceId,setdebounceId] = useState(0);
  const[sentiment ,setsentiment] =useState('false');
  const[cartitem , setcartitem] = useState([]);
  const [allProduct, setAllProduct] = useState([])
  

  const token = localStorage.getItem('token');
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  //  useEffect(()=>{
  //   performAPICall();
  // },[]);

  const performAPICall = async () => {
    setcp(1);
    try{
    const productinfo = await axios.get(`${config.endpoint}/products`);
    // console.log(productinfo.data.data.name);
    setcp(0);
    setproductarray(productinfo.data);
    setAllProduct(productinfo.data);
    
    // if(productinfo.status===200)
      
    
    
    return productinfo.data;
    }
    
    catch(error){
      // console.log(error);
      setcp(0);
    }
  };
  
 

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */

  const performSearch = async (text) => {
    
      if(item!==""){
      try{
      const searchitem =  await axios.get(`${config.endpoint}/products/search?value=${text}`);
      console.log(searchitem.data);
      console.log(searchitem.data);
      setproductarray(searchitem.data);
      setsentiment('false');
      }
      catch(error){
        setsentiment('true');
        if(error.response.status===404){
          setproductarray([]);
        }
        else{
          enqueueSnackbar(error.response.message,{variant:'error'})
        }
      }
    }   
  };

  // useEffect(()=>{
  //   performSearch(item);
  // },[item])

  // const handlechange = (e)=>{
  //   setitem(e.target.value);
  //   debounceSearch(e,500);
  // }

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
   
    if(debounceId)
      clearTimeout(debounceId);

    setitem(event.target.value);
    
    let timerId = setTimeout(()=>{
      performSearch(event.target.value);
    },debounceTimeout);

    setdebounceId(timerId);
  };

 


  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  // useEffect(()=>{
  // // fetchCart(localStorage.getItem("token"));
  // fetchCart(token);
  // },[]
  // );
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data

      const cartitem =await axios.get(`${config.endpoint}/cart`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setcartitem(cartitem.data);
      // console.log(cartitem.data);
      return cartitem.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };


  // useEffect(()=>{
    
  //   generateCartItemsFrom(cartitem , productarray);
  //   // getTotalCartValue();
  // },[cartitem , productarray])
  const updatecartitem =(cartitem ,productarray)=>{
    const updatedcart = generateCartItemsFrom(cartitem , productarray)
    setcartitem(updatedcart);
  }

    useEffect(()=>{
      const pageload = async()=>{
        const productData = await performAPICall();
        const fetchData = await fetchCart(token);
        const cartData = await generateCartItemsFrom(fetchData , productData);
        setcartitem(cartData);
      }
      pageload();
    },[]
    )
  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
   return items.find((ele)=> ele.productId === productId)
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
       console.log("add to cart")
      //  console.log(token);
      //  console.log(productId);
      if(!token){
        enqueueSnackbar('Login to add an item to the Cart',{variant:'error'})
      }

      if(options.preventDuplicate && isItemInCart(items,productId))
        enqueueSnackbar('Item already in cart. Use the cart sidebar to update quantity or remove item.',{variant:'warning'})
      try{
      const cartdata = await axios.post(`${config.endpoint}/cart`,{
        productId ,qty
      },{ headers :{
         Authorization : `Bearer ${token}` ,
      },
      })
      updatecartitem(cartdata.data , products );
      // setcartitem(cartdata.item);
    }
      catch(error){
        if(error.response)
          enqueueSnackbar(error.response.message ,{variant:'error'});
      
      else
        enqueueSnackbar('check if the backend server is running',{variant:'error'})
    };
   
  }

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <Stack direction="row"><TextField
        className="search-desktop"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        
        // onChange={(e)=>{setitem(e.target.value)
        //   debounceSearch(e,500)}}
        onChange={(e)=>debounceSearch(e,500)} 
      />
      </Stack>
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>debounceSearch(e,500)}
      />

       <Grid container spacing={1} >
       {/* md={localStorage.getItem('username')?9:12} */}
         <Grid item padding={1} xs={12} md={token?9:12}  className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India's <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
           <Grid container className="prodisplay" rowSpacing={2} spacing={2}>
       {cp!==0 && <Box className="circulate"> <CircularProgress/> <h3>Loading Products...</h3> </Box>}
      
       {sentiment ==='true' && <Box className='circulate'><SentimentDissatisfied/><span>No products found</span></Box>}
       { productarray.length !== 0  && (
            productarray.map((ele) => 
            (<Grid item xs={12} s={12} md={6} lg={3} key={ele._id}  >
              <ProductCard product={ele} handleAddToCart={async() =>{
               await addToCart(token , cartitem , allProduct , ele._id , 1 , { preventDuplicate:true } );
              }} />
              </Grid>)
            ))
       }
       </Grid>
       </Grid>
       {token && (<Grid item xs={12} md={3} bgcolor="#E9F5E1">
        <Cart products={allProduct} 
        items={cartitem}
        handleQuantity={addToCart}
        
        />
       </Grid>)}
       </Grid>
      <Footer />
    </div>
  );
 }
export default Products;
