//@Date: 01/10/2022
//@Author: Shipon islam

const router = require("express").Router();
//external import
const {
  registerUsers,
  getMe,
  userLogin,
  userUpdate,
} = require("../controlers/usersControler");
const { protect } = require("../middleware/authMiddleware");
const uploadFile = require("../middleware/uploadFile");

//@Desc:Register new user          @Route: user/register
//@Access: Public                  @Method: POST
router.post("/user/register", registerUsers);

//@Desc:get authenticate user       @Route: user/get/me
//@Access: Private                  @Method:GET
router.get("/user/get/me", protect, getMe);

//@Desc:login user                 @Route: user/login
//@Access: Public                  @Method: POST
router.post("/user/login", userLogin);
//@Desc:update user                 @Route: user/update
//@Access: Private                  @Method: POST
router.put("/user/update", protect, uploadFile("/images/avatar"), userUpdate);

module.exports = router;
