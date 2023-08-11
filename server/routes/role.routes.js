const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleController = require("../controllers/roleController");
const roleMiddleware = require("../middleware/role.middleware");

router.get("",roleMiddleware(["ADMIN"]),roleController.getRoles)

module.exports=router