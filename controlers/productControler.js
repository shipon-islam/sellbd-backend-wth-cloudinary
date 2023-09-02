//@Date: 01/10/2022
//@Author: Shipon islam
const fs = require("fs");
const productModel = require("../models/productModel");
const { cloudUpload, cloudRemove } = require("../utilites/cloudinary");
const { unlinkImage } = require("../utilites/UnlinkFile");

//@Desc: Adding New Product         @Route: product/add
//@Access: Private                  @Method: POST
const addProduct = async (req, res, next) => {
  try {
    if (
      req.files &&
      req.files.length > 0 &&
      req.files.length === 3 &&
      req.body
    ) {
      let images = [];
      for (file of req.files) {
        const { url, public_id } = await cloudUpload(file.path, "product");
        images.push({ url, public_id });
      }

      let product = await productModel.create({
        ...req.body,
        image: images,
      });

      res.status(201).send(product);
    } else {
      res.json({
        message: "three image required and all other info also required",
      });
    }
  } catch (error) {
    next(error);
  }
};

//@Desc: Update Existing Product   @Route: product/update
//@Access: Private                  @Method: PUT
const productUpdate = async (req, res, next) => {
  const id = req.params.id;
  // const user = req.user.id;

  let productObj;

  try {
    //checking file pass middleware
    if (req.files && req.files.length === 3 && req.body) {
      let images = [];
      for (file of req.files) {
        const { url, public_id } = await cloudUpload(file.path, "product");
        images.push({ url, public_id });
      }

      productObj = {
        ...req.body,
        image: images,
      };
    } else {
      productObj = {
        ...req.body,
      };
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, productObj);

    // delete existing photo from folder
    if (req.files && req.files.length === 3 && req.body && updatedProduct) {
      //remove images from localstorage
      unlinkImage(updatedProduct.image, "public/images/product");

      //remove images from cloudinary cloud storage
      for (image of updatedProduct.image) {
        await cloudRemove(image.public_id, "product");
      }
    }

    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
};

//@Desc: Delete Existing Product   @Route: product/delete
//@Access: private                 @Method: DELETE
const productDelete = async (req, res, next) => {
  try {
    const deleteProduct = await productModel.findByIdAndDelete(req.params.id);

    if (deleteProduct) {
      //remove images from localstorage
      unlinkImage(deleteProduct.image, "public/images/product");

      //remove images from cloudinary cloud storage
      for (image of deleteProduct.image) {
        await cloudRemove(image.public_id, "product");
      }
    }

    res.send(deleteProduct);
    // success code here
  } catch (err) {
    // error handling here
    console.error(err);
  }
};

//@Desc: Get All Product         @Route: product/get/all
//@Access: Public                 @Method: GET
const getAllProduct = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};
//@Desc: Get All Product         @Route: product?query=""
//@Access: Public                 @Method: GET
const getQueryProduct = async (req, res, next) => {
  try {
    const products = await productModel.find(req.query);
    res.send(products);
  } catch (error) {
    next(error);
  }
};
//@Desc: Get Product By Id         @Route: product/:id
//@Access: Public                 @Method: GET
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  productDelete,
  productUpdate,
  getAllProduct,
  getQueryProduct,
  getProductById,
};
