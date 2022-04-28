// import TotalUsersHeader from './TotalUsersHeader'
import UsersTable from './UsersTable'
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      {/* <TotalUsersHeader /> */}
      <h3>Users List</h3>
      <p className='mb-2'>
        some text to describe what our users will be doing and what rights and status they posess
      </p>
      <UsersTable />
    </div>
  )
}

export default UsersList
