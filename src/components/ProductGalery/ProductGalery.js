import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { withStyles } from "@material-ui/core/styles";
import { db } from "../../firebase";
import Product from "./Product";
import Cart from "../MealPlan/MealPlan";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Dialog, DialogContent, DialogTitle, TextField, Button} from "@material-ui/core";
//import {FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";

const styles = (theme) => ({
  shopContainer: {
    margin: "40px",
    paddingLeft: "20px",
  },
  cartIcon: {
    position: "fixed",
    fontSize: "90px",
    top: "60px",
    "@media (max-width: 740px)": {
      top: "55px",
    },
    padding: "16px",
    cursor: "pointer",
  },
  productsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // "@media (max-width: 1200px)": {
      flexWrap: "wrap",
    //},
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  product: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  productMedia: {
    paddingTop: "56.25%",
  },
  productContent: {
    flexGrow: 1,
  },
  header: {
    marginTop: "30px",
    letterSpacing: "2px",
  },
  searchProducts: {
    display: "flex",
    paddingTop: "15px",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    borderRadius: "50px",
    "@media (max-width: 800px)": {
      width: "65%",
    },
  },
  searchButton: {
    marginLeft: "10px",
    marginRight: "70px",
    padding: "none",
    "@media (max-width: 800px)": {
      marginRight: "20px",
    }
  },
  searchContainer: {
    width: "90%",
    display: "flex",
    "@media (max-width: 800px)": {
      marginLeft: '40px'
    }
  },
  sortContainer: {
    width: "10%",
    "@media (max-width: 800px)": {
      width: "25%",
    }
  },
});

const ProductGalery = (props) => {
  const [products, setProducts] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //const [sortValue, setSortValue] = useState("");

  const toggleOpenCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const displayPrice = (price, discountedPrice) => {
    const { classes } = props;

    if (discountedPrice) {
      return (
        <>
          <span className={classes.regularPriceCrossed}>{"$" + price}</span>
          <span className={classes.discountedPrice}>{"$" + discountedPrice}</span>
        </>
      );
    } else return <span className={classes.regularPrice}>{"$" + price}</span>;
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value.toLowerCase().trim());
    if (e.target.value.length === 0) {
      setVisibleProducts(products);
    }
  };

  const filterProducts = () => {
    const filteredProducts = products.filter((el) => el.name === searchValue);
    setVisibleProducts(filteredProducts);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchValue !== "") {
      filterProducts();
    }
  };

  // const onSortChange = (e) => {
  //   setSortValue(e.target.value);
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(updatedProducts);
        setVisibleProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);



  // useEffect(() => {

  //   let sortedProducts = [];
  //   let copiedProducts = [];

  //   switch (sortValue) {
  //     case "latest":
  //       sortedProducts = [...products];
  //       setVisibleProducts(sortedProducts)
  //       console.log("latest: ", sortedProducts);
  //       break;
  //     case "newest":
  //       copiedProducts = [...products]
  //       sortedProducts = copiedProducts.reverse();
  //       setVisibleProducts(sortedProducts)
  //       console.log("newest: ", sortedProducts);
  //       break;
  //     case "az":
  //       copiedProducts = [...products]
  //       sortedProducts = copiedProducts.sort((a, b) => (a.name > b.name) ? 1: -1);
  //       setVisibleProducts(sortedProducts)
  //       console.log("az: ", sortedProducts);
  //       break;
  //     case "za":
  //       copiedProducts = [...products]
  //       sortedProducts = copiedProducts.sort((a, b) => (b.name > a.name) ? 1: -1);
  //       setVisibleProducts(sortedProducts)
  //       console.log("za: ", sortedProducts);
  //       break;
  //     case "priceAsc":
  //       copiedProducts = [...products]
  //       const productsWithBuyingPriceArrayAsc = copiedProducts.map((obj) => ({
  //         ...obj,
  //         buyingPrice: obj.discountedPrice !== 0 ? obj.discountedPrice : obj.price,
  //       }));
  //        sortedProducts = productsWithBuyingPriceArrayAsc.sort((a, b) => {
  //          return a.buyingPrice > b.buyingPrice ? 1: -1;
  //        })
  //       setVisibleProducts(sortedProducts)
  //       console.log("priceAsc: ", sortedProducts);
  //       break;
  //     case "priceDesc":
  //       copiedProducts = [...products]
  //       const productsWithBuyingPriceArrayDesc = copiedProducts.map((obj) => ({
  //         ...obj,
  //         buyingPrice: obj.discountedPrice !== 0 ? obj.discountedPrice : obj.price,
  //       }));
  //        sortedProducts = productsWithBuyingPriceArrayDesc.sort((a, b) => {
  //          return b.buyingPrice > a.buyingPrice ? 1: -1;
  //        })
  //       setVisibleProducts(sortedProducts)
  //       console.log("priceDesc: ", sortedProducts);
  //       break;
  //     default:
  //       sortedProducts = visibleProducts;
  //       setVisibleProducts(sortedProducts)
  //       console.log("default case");
  //       break;
  //   }
  // }, [sortValue])

  const isCartVisible = props.cartProducts.length > 0;

  return (
    <React.Fragment>
      {isCartVisible && <ShoppingCartIcon className={props.classes.cartIcon} onClick={toggleOpenCart} />}
      <div className={props.classes.searchProducts}>
        <div className={props.classes.searchContainer}>
          <TextField
            id="search"
            label="Search"
            fullWidth
            variant="outlined"
            onChange={onInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            className={props.classes.searchButton}
            size="small"
            color="primary"
            disabled={searchValue.length === 0}
            onClick={filterProducts}
            variant="outlined"
          >
            SEARCH
          </Button>
        </div>
        {/* <div className={props.classes.sortContainer}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortValue}
              onChange={onSortChange}
              label="Sort"
            >
              <MenuItem value={"latest"}>Latest</MenuItem>
              <MenuItem value={"newest"}>Newest</MenuItem>
              <MenuItem value={"az"}>Name A-Z</MenuItem>
              <MenuItem value={"za"}>Name Z-A</MenuItem>
              <MenuItem value={"priceAsc"}>Price ascending</MenuItem>
              <MenuItem value={"priceDesc"}>Price descending</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </div>
      <div className={props.classes.shopContainer}>
        <div className={props.classes.productsContainer}>
          {visibleProducts &&
            visibleProducts.map((product) => (
              <Product data={product} display={displayPrice} key={product.id} onBuy={props.onAddProduct} />
            ))}
        </div>
        <Dialog onClose={toggleOpenCart} aria-labelledby="customized-dialog-title" open={isCartOpen}>
          <DialogTitle align="center">
            {props.cartProducts.length > 0 ? "Meal Plan" : "Your Meal Plan is empty"}
          </DialogTitle>
          <DialogContent dividers>
            <Cart products={props.cartProducts} clicked={toggleOpenCart} />
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ProductGalery));