import React from "react";
import { Button, Card, Typography, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as actionCreators from '../../store/actions';
import { connect } from 'react-redux';
import { halveMacros } from "../../utils";

const useStyles = makeStyles(() => ({
  product: {
    display: "flex",
    width: '300px',
    margin: '20px',
    flexDirection: "column",
    '@media (max-width: 1200px)': {
      margin: '20px',
    }
  },
  productMedia: {
    paddingTop: "56.25%",
  },
  productContent: {
    flexGrow: 1,
    textAlign: "center",
  },
  productInfo: {
    fontSize: "16px",
  },
  buyButton: {
    margin: '0 auto'
  },
}));

const Product = (props) => {
  const classes = useStyles();

//   const productAddHalf = () => {

//     let halvedProduct = {}
//       for (let key in props.data) {
//         console.log(key, props.data[key])
//         if(typeof(props.data[key]) == 'number') {
//           props.data[key] /= 2
//         }
//       }

//       halvedProduct = props.data

//     props.onAddHalf(halvedProduct)   

//     // fix this so that it doesn't halve the properties indefinitely
// }

  return (
    <Card className={classes.product}>
      <CardMedia
        className={classes.productMedia}
        image={props.data.image ? props.data.image : "/images/nophoto.jpg"}
        title={props.data.name}
      />
      <CardContent className={classes.productContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.data.name}
        </Typography>
        <Typography>
            <>
              <p className={classes.productInfo}>{props.data.kcal + " kcal"}</p>
              <p className={classes.productInfo}>{props.data.protein + "g protein"}</p>
              <p className={classes.productInfo}>{props.data.carbs + "g carbs"}</p>
              <p className={classes.productInfo}>{props.data.fat + "g fat"}</p>
            </>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.buyButton}
          variant="outlined"
          size="medium"
          color="primary"
          align="center"
          onClick={() => props.onAddProduct(props.data)}
        >
          Add
        </Button>
        {/* <Button
          className={classes.buyButton}
          variant="outlined"
          size="medium"
          color="primary"
          align="center"
          //onClick={() => props.onAddHalf(props.data)}
          onClick={productAddHalf}
        >
          Add ½
        </Button> */}
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (product) => dispatch(actionCreators.add(product)),
    onAddHalf: (product) => dispatch(actionCreators.addHalf(product))
  }
}


export default connect(null, mapDispatchToProps)(Product);
