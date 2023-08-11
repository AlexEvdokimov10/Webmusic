const Router=require("express")
const {check,validationResult}=require("express-validator")
const router=new Router()
const userController = require("../controllers/userController")
const authMiddleware=require('../middleware/auth.middleware')
const roleMiddleware=require('../middleware/role.middleware')

router.post("/registration",
    [check('email',"Uncorrect email").isEmail(),
        check('password','Password must be longer than 3 and shorter than 12')
            .isLength({min:6,max:12})],
    userController.registration
)
router.post("/login", userController.login)
router.get("/activate/:link",userController.activate);
router.get("/restorePasswd",userController.restorePassword);
router.get("/restorePasswd/:link",userController.restoreLinkPasswd);
router.get("/restoreEmail",userController.restoreByEmail);
router.get("/restoreEmail/:link",userController.restoreLinkEmail);
router.get("/auth",authMiddleware,userController.auth)
router.get("/adminPanel/users",roleMiddleware(["ADMIN"]),userController.getUsers)
router.get("/adminPanel/users/finds",roleMiddleware(["ADMIN"]),userController.findUsers)
router.get("/users/profile/:id",authMiddleware,userController.getUser)
router.get("/changeEmail/:link",userController.changeEmail);
router.patch("/changePassword/:link",userController.changePassword);
router.patch("/edit-data/:id",roleMiddleware(["ADMIN"]),userController.editUserProfile)
router.patch('/edit-user', authMiddleware, userController.editUser)
router.post('/avatar',authMiddleware, userController.addAvatar)
router.delete('/avatar',authMiddleware, userController.deleteAvatar)
router.delete("/deleteUser/:id",roleMiddleware(["ADMIN"]), userController.deleteUser )

module.exports=router
