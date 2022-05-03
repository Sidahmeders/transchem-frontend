import { createContext, useState } from 'react'
import buildUsersManagement from './users-managment'

const Context = createContext()

function ContextProvider(props) {
    // users managment
    const [roles, setRoles] = useState({
        all: [],
        selected: {},
        userAccess: {}
    })
    const [usersData, setUsersData] = useState([])

    const usersManagement = buildUsersManagement({ roles, setRoles, usersData, setUsersData })
    
    // other modules...

    const randomFunction = () => console.log('RANDOM! RANDOM!')

    return (
        <Context.Provider
            value={{
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
