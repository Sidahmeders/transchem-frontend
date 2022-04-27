import RoleCards from './RoleCards'

const Roles = () => {
  return (
    <>
      <h3>Roles List</h3>
      <p className='mb-2'>
        A role provides access to predefined menus and features depending on the assigned role to an administrator that
        can have access to what he needs.
      </p>
      <RoleCards />
    </>
  )
}

export default Roles
