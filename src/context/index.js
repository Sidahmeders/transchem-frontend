import { createContext, useState } from 'react'
import buildUsersManagement from './users-management'
import { getUserData } from '@utils'

const Context = createContext()

function ContextProvider(props) {
    // users management
    const LoggedInUserInfo = getUserData()
    const [roles, setRoles] = useState({
        all: [],
        selected: {},
        userAccess: LoggedInUserInfo.userRole
    })
    const [usersData, setUsersData] = useState([])
    
    const usersManagement = buildUsersManagement({ roles, setRoles, usersData, setUsersData })
    
    // other modules...

    const randomFunction = () => console.log('RANDOM! RANDOM!')

    return (
        <Context.Provider
            value={{
                LoggedInUserInfo,
                roles,
                usersData,
                usersManagement,
                randomFunction
            }}>
            {props.children}
        </Context.Provider>
    )
}

const ContextConsumer = Context

export { ContextProvider, ContextConsumer }
