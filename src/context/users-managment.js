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
      roles.all.forEach((role) => (role.id === updatedRole.id ? Object.assign(role, updatedRole) : role))
      setRoles(() => roles)
    },
    setSelectedRole: (selectedRole) => {
      setRoles(() => ({
        ...roles,
        selected: selectedRole
      }))
    },
    getRoleOptions: () => {
      return roles.all.map((role) => ({ id: role.id, label: role.name, value: role.name }))
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
    },
    putUser: async (userInfo) => {
      const response = await axios.put(`http://localhost:5000/api/users/${userInfo.id}`, userInfo)
      if (response.status !== 200) return null
      const updatedUser = response.data
      const newUsersData = usersData.map((user) => (user.id === updatedUser.id ? Object.assign(user, updatedUser) : user))
      setUsersData(() => newUsersData)
    }
  })
}