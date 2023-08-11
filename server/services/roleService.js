const Role = require("../models/Role");
const Genre = require("../models/Genre");

class RoleService {
    async getRoles() {
        const roles = await Role.find({})
        return roles
    }

    async findRoleByValue(user) {
        console.log(user)
        const genres = await Role.find({value: {$in: user.value}})

        const rolesArray = []

        genres.map((role) => {
            rolesArray.push(role.value)
        })

        return rolesArray
    }

    async createRole(name) {
        const role = new Role({
            value: name
        })
        await role.save()
        return role
    }
}

module.exports = new RoleService()