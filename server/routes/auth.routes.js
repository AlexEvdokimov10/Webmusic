const Router=require("express")
const {check,validationResult}=require("express-validator")
const router=new Router()
const userController = require("../controllers/userController")
const authMiddleware=require('../middleware/auth.middleware')

router.post("/registration",
    [check('email',"Uncorrect email").isEmail(),
        check('password','Password must be longer than 3 and shorter than 12')
            .isLength({min:6,max:12})],
    userController.registration
)
router.post("/login", userController.login)
router.get("/auth",authMiddleware,userController.auth)
router.patch('/edit-user', authMiddleware, userController.editUser)
router.post('/avatar',authMiddleware, userController.addAvatar)
router.delete('/avatar',authMiddleware, userController.deleteAvatar)

module.exports=router
