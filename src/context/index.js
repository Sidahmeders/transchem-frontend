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

    const usersManagement = buildUsersManagement({ roles, setRoles })
    
    // other modules...

    const randomFunction = () => console.log('RANDOM! RANDOM!')

    return (
        <Context.Provider
            value={{
                roles,
                setRoles,
                usersManagement,
                randomFunction
            }}>
            {props.children}
        </Context.Provider>
    )
}

const ContextConsumer = Context

export { ContextProvider, ContextConsumer }
