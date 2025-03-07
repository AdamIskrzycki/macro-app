import React from "react";
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: "pointer",
    margin: "5px",
  },
}));

const ProductsInfo = (props) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" align="center" color="textSecondary" paragraphvariant="h5" paragraph>
        Available products
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Kcal</TableCell>
              <TableCell align="center">Protein</TableCell>
              <TableCell align="center">Carbs</TableCell>
              <TableCell align="center">Fat</TableCell>
              <TableCell align="center">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.products &&
              props.products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="center">{product.kcal}</TableCell>
                  <TableCell align="center">{product.protein}</TableCell>
                  <TableCell align="center">{product.carbs}</TableCell>
                  <TableCell align="center">{product.fat}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <DeleteIcon onClick={() => props.delete(product.id)} className={classes.icon} />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <EditIcon
                        onClick={() => props.edit(product)}
                        className={classes.icon}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsInfo;
