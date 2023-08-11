const roleService = require("../services/roleService")

class RoleController {
    async getRoles(req,res,next){
        try {
            const roles = await roleService.getRoles()
            return res.json(roles)
        } catch (e) {
            next(e)
        }
    }
}
module.exports=new RoleController()