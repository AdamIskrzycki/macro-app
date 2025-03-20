import React, { Component } from "react";
import { TextField, Button, Container, withStyles, Typography, Box } from "@material-ui/core";
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  addButton: {
    fontWeight: "500",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(2),
    width: "15%",
  },
  // container: {
  //   marginTop: theme.spacing(25),
  //   '@media (max-width: 1000px)': {
  //     marginTop: 'none'
  //   }
  // },

  textField: {
    width: "30%",
    margin: "3px",
    marginTop: theme.spacing(6),
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
  image: {
    maxWidth: "300px",
    maxHeight: "200px",
    marginTop: "50px",
  },
  fileInput: {
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10%",
  },
  inputLabel: {
    marginRight: "20px",
  },
  box: {
    marginTop: "30px",
    textAlign: "center",
  },
  close: {
    position: "absolute",
    marginTop: "20px",
    cursor: "pointer",
  },
});

class AdminPanelControls extends Component {
  state = {
    products: null,
    name: "",
    kcal: "",
    protein: "",
    carbs: "",
    fat: "",
    isInEditMode: false,
    imageUrl: "",
  };

  onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  setPlaceholderImage = () => {
    this.setState({ imageUrl: "/images/nophoto.jpg" });
  };

  // handleImageAsFile = (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, `/items/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   if (file === undefined) return;

  //   //const uploadTask = storage.ref(`/images/${file.name}`).put(file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapShot) => {
  //       console.log(snapShot);
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(file.name)
  //         .getDownloadURL()
  //         .then((fireBaseUrl) => {
  //           console.log("imageUrl", this.state.imageUrl);
  //           this.setState({ imageUrl: fireBaseUrl });
  //         });
  //     }
  //   );
  // };

  handleImageAsFile = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Ensure a file is selected

    const storage = getStorage(); // Get Firebase Storage instance
    const storageRef = ref(storage, `/macroapp-products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        // Upload completed, get the download URL
        const fireBaseUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", fireBaseUrl);
        this.setState({ imageUrl: fireBaseUrl });
      }
    );
};

  onButtonClick = () => {
    if (this.state.isInEditMode) {
      this.props.update(
        this.state.productId,
        this.state.name,
        this.state.kcal,
        this.state.protein,
        this.state.carbs,
        this.state.fat,
        this.state.imageUrl
      );
    } else {
      this.props.add(
        this.state.name,
        this.state.kcal,
        this.state.protein,
        this.state.carbs,
        this.state.fat,
        this.state.imageUrl
      );
    }
    console.log("clearing");
    this.setState({ name: "", kcal: "", protein: "", carbs: "", fat: "", imageUrl: "", isInEditMode: false });
    document.getElementById("focus").focus();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product && this.props.product) {
      this.setState({
        name: this.props.product.name,
        kcal: this.props.product.kcal,
        protein: this.props.product.protein,
        carbs: this.props.product.carbs,
        fat: this.props.product.fat,
        productId: this.props.product.id,
        isInEditMode: true,
      });
    }
  }

  // static componentDidUpdate(props, state) {
  //   if (
  //     props.product &&
  //     (!state.isInEditMode || state.productId !== props.product.id)
  //   ) {
  //     return {
  //       name: props.product.name,
  //       kcal: props.product.kcal,
  //       protein: props.product.protein,
  //       carbs: props.product.carbs,
  //       fat: props.product.fat,
  //       productId: props.product.id, // Store product ID
  //       isInEditMode: true,
  //     };
  //   }

  //   return null;
  // }

  render() {
    const { classes } = this.props;
    console.log(this.state);

    const inputProps = {
      step: "0.1",
      min: "0",
    };

    return (
      <React.Fragment>
        <Container className={classes.container}>
          <Typography variant="h5" align="center" color="textSecondary" paragraphvariant="h5" paragraph>
            Add or update a product
          </Typography>
          <TextField
            value={this.state.name}
            onChange={this.onInputChange}
            name="name"
            id="focus"
            label="Name"
            variant="outlined"
            className={classes.textField}
            autoFocus
          />
          <TextField
            value={this.state.kcal}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="kcal"
            type="number"
            label="Kcal"
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            value={this.state.protein}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="protein"
            type="number"
            label="Protein"
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            value={this.state.carbs}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="carbs"
            type="number"
            label="Carbs"
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            value={this.state.fat}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="fat"
            type="number"
            label="Fat"
            variant="outlined"
            className={classes.textField}
          />
          <Box className={classes.box}>
            <Typography variant="h6" color="textSecondary" className={classes.fileInput}>
              <label for="imageUpload" className={classes.inputLabel}>
                Add product image
              </label>
              <input id="imageUpload" type="file" onChange={this.handleImageAsFile} accept=".jpg, .jpeg, .png"></input>
            </Typography>
            <Button
              disabled={
                this.state.name === "" ||
                this.state.kcal === "" ||
                this.state.protein === "" ||
                this.state.carbs === "" ||
                this.state.fat === ""
              }
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={this.onButtonClick}
            >
              {this.state.isInEditMode ? "Save" : "Add"}
            </Button>
            <img src={this.state.imageUrl} className={classes.image} alt=""></img>
            <CloseIcon
              onClick={this.setPlaceholderImage}
              className={classes.close}
              visibility={this.state.imageUrl === "" ? "hidden" : "visible"}
            />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminPanelControls);
