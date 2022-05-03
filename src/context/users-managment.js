import axios from "axios"

export default function buildUsersManagement({ roles, setRoles, usersData, setUsersData }) {
  return Object.freeze({
    fetchRoles: async () => {
      const response = await axios.get('http://localhost:5000/api/access/roles')
      if (response.status !== 200) return null
      const { userAccess, rolesList } = response.data
      setRoles(() => ({
        ...roles,
        all: rolesList,
        userAccess
      }))
    },
    addNewRole: (newRole) => {
      setRoles(() => ({
        ...roles,
        all: [...roles.all, newRole]
      }))
    },
    updateRoles: (updatedRole) => {
      roles.all.forEach((role) => (role.id === updatedRole.id ? Object.assign(role, updatedRole) : null))
      setRoles(() => roles)
    },
    setSelectedRole: (selectedRole) => {
      setRoles(() => ({
        ...roles,
        selected: selectedRole
      }))
    },
    
    fetchUsers: async () => {
      const response = await axios.get('http://localhost:5000/api/users')
      if (response.status !== 200) return null
      setUsersData(() => response.data)
    },
    postNewUser: async (userInfo) => {
      const response = await axios.post('http://localhost:5000/api/auth/register', userInfo)
      if (response.status !== 200) return null
      setUsersData(() => ([...usersData, response.data]))
    }
  })
}