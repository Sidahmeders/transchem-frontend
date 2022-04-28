import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser } from '@store/user'
import { Slack, User, Settings, Database, Edit2, Edit, Trash2 } from 'react-feather'
import { Badge } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.fullName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    name: 'Plan',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  },
  {
    name: 'Billing',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.billing}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'More Actions',
    minWidth: '150px',
    cell: (row) => {
      return (
        <div className='d-flex'>
          <span className='ms-2'></span>
          <Edit size={15} onClick={() => row.setShow(true)} />
          <span className='ms-2'></span>
          <Trash2 size={15} />
        </div>
      )
    }
  }
]

// ** Expandable table component
export const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span style={{color:'#15d'}} className='fw-bold'>Company:</span> {data.company}
      </p>
      <p>
        <span style={{color:'#15d'}} className='fw-bold'>fullName:</span> {data.fullName}
      </p>
      <p className='m-0'>
        <span style={{color:'#15d'}} className='fw-bold'>Email:</span> {data.email}
      </p>
    </div>
  )
}