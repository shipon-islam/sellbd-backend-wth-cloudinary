//@Date: 01/10/2022
//@Author: Shipon islam

const router = require("express").Router();
//external import
const { protect } = require("../middleware/authMiddleware");
const uploadFile = require("../middleware/uploadFile");
const {
  addProduct,
  productUpdate,
  productDelete,
  getAllProduct,
  getQueryProduct,
  getProductById,
} = require("../controlers/productControler");

//@Desc: Adding New Product         @Route: api/product/add
//@Access: Private                  @Method: POST
router.post("/product", protect, uploadFile("/images/product"), addProduct);

//@Desc: Update Existing Product   @Route: api/product/update/:id
//@Access: Private                  @Method: PUT
router.put(
  "/product/:id",
  protect,
  uploadFile("/images/product"),
  productUpdate
);

//@Desc: Delete Existing Product   @Route: api/product/delete/:id
//@Access: private                 @Method: DELETE
router.delete("/product/:id", protect, productDelete);

//@Desc: Get All Product         @Route: api/product/get/all
//@Access: Public                 @Method: GET
router.get("/products", getQueryProduct);
//@Desc: Get All Product         @Route: api/product/get/all
//@Access: Public                 @Method: GET
router.get("/product/:id", getProductById);

module.exports = router;
