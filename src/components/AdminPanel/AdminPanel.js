import React, { Component } from "react";
import { collection, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
import AdminPanelControls from "./AdminPanelControls";
import ProductsInfo from "./ProductsInfo";
import classes from "./AdminPanel.module.css";

class AdminPanel extends Component {
  state = {
    products: null,
    product: undefined,
    productImageToKeep: ""
  };

  addNewProduct = async (name, kcal, protein, carbs, fat, image) => {
    try {
      await addDoc(collection(db, "products"), {
        name: name,
        kcal: +kcal,
        protein: +protein,
        carbs: +carbs,
        fat: +fat,
        image: image
      });
      this.getProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const updatedProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      this.setState({ products: updatedProducts });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      this.getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  editProduct = (product) => {
    this.setState({ product });
    this.setState({productImageToKeep: product.image})
  };

  updateProduct = async (id, name, kcal, protein, carbs, fat, image) => {
    try {
      const updatedProduct = {
        name: name,
        kcal: +kcal,
        protein: +protein,
        carbs: +carbs,
        fat: +fat
      };

      if (image !== "" && image !== this.state.productImageToKeep) {
        updatedProduct.image = image;
      } else {
        updatedProduct.image = this.state.productImageToKeep;
      }

      await setDoc(doc(db, "products", id), updatedProduct);
      this.getProducts();
      this.setState({ product: undefined });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.productsInfo}>
            <ProductsInfo 
              products={this.state.products} 
              delete={this.deleteProduct} 
              edit={this.editProduct} 
            />
          </div>
          <div className={classes.controls}>
            <AdminPanelControls 
              add={this.addNewProduct} 
              update={this.updateProduct} 
              product={this.state.product}
              productImageToKeep={this.productImageToKeep}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPanel;