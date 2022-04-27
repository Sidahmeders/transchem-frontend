import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    avatar: '10.jpg',
    site_name: "Korrie O'Crevy",
    company: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    installer: 'Krasnosilka',
    configured: '09/23/2016',
    status: 'active'
  },
  {
    id: 2,
    avatar: '1.jpg',
    site_name: 'Bailie Coulman',
    company: 'VP Quality Control',
    email: 'bcoulman1@yolasite.com',
    installer: 'Hinigaran',
    configured: '05/20/2018',
    status: 'active'
  },
  {
    id: 3,
    avatar: '9.jpg',
    site_name: 'Stella Ganderton',
    company: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    installer: 'Golcowa',
    configured: '03/24/2018',
    status: 'active'
  },
  {
    id: 4,
    avatar: '10.jpg',
    site_name: 'Dorolice Crossman',
    company: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp',
    installer: 'Paquera',
    configured: '12/03/2017',
    status: 'idle'
  },
  {
    id: 5,
    avatar: '',
    site_name: 'Harmonia Nisius',
    company: 'Senior Cost Accountant',
    email: 'hnisius4@gnu.org',
    installer: 'Lucan',
    configured: '08/25/2017',
    status: 'under-maintenance'
  },
  {
    id: 6,
    avatar: '',
    site_name: 'Genevra Honeywood',
    company: 'Geologist',
    email: 'ghoneywood5@narod.ru',
    installer: 'Maofan',
    configured: '06/01/2017',
    status: 'active'
  },
  {
    id: 7,
    avatar: '',
    site_name: 'Eileen Diehn',
    company: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    installer: 'Lampuyang',
    configured: '10/15/2017',
    status: 'idle'
  },
  {
    id: 8,
    avatar: '9.jpg',
    site_name: 'Richardo Aldren',
    company: 'Senior Sales Associate',
    email: 'raldren7@mtv.com',
    installer: 'Skoghall',
    configured: '11/05/2016',
    status: 'active'
  },
  {
    id: 9,
    avatar: '2.jpg',
    site_name: 'Allyson Moakler',
    company: 'Safety Technician',
    email: 'amoakler8@shareasale.com',
    installer: 'Mogilany',
    configured: '12/29/2018',
    status: 'active'
  },
  {
    id: 10,
    avatar: '9.jpg',
    site_name: 'Merline Penhalewick',
    company: 'Junior Executive',
    email: 'mpenhalewick9@php.net',
    installer: 'Kanuma',
    configured: '04/19/2019',
    status: 'active'
  },
  {
    id: 11,
    avatar: '',
    site_name: 'De Falloon',
    company: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    installer: 'Colima',
    configured: '06/12/2018',
    status: 'under-maintenance'
  },
  {
    id: 12,
    avatar: '',
    site_name: 'Cyrus Gornal',
    company: 'Senior Sales Associate',
    email: 'cgornalb@fda.gov',
    installer: 'Boro Utara',
    configured: '12/09/2017',
    status: 'active'
  },
  {
    id: 13,
    avatar: '',
    site_name: 'Tallou Balf',
    company: 'Staff Accountant',
    email: 'tbalfc@sina.com.cn',
    installer: 'Siliana',
    configured: '01/21/2016',
    status: 'active'
  },
  {
    id: 14,
    avatar: '',
    site_name: 'Othilia Extill',
    company: 'Associate Professor',
    email: 'oextilld@theatlantic.com',
    installer: 'Brzyska',
    configured: '02/01/2016',
    status: 'active'
  },
  {
    id: 15,
    avatar: '',
    site_name: 'Wilmar Bourton',
    company: 'Administrative Assistant',
    email: 'wbourtone@sakura.ne.jp',
    installer: 'Bích Động',
    configured: '04/25/2018',
    status: 'idle'
  },
  {
    id: 16,
    avatar: '4.jpg',
    site_name: 'Robinson Brazenor',
    company: 'General Manager',
    email: 'rbrazenorf@symantec.com',
    installer: 'Gendiwu',
    configured: '12/23/2017',
    status: 'under-maintenance'
  },
  {
    id: 17,
    avatar: '',
    site_name: 'Nadia Bettenson',
    company: 'Environmental Tech',
    email: 'nbettensong@joomla.org',
    installer: 'Chabařovice',
    configured: '07/11/2018',
    status: 'under-maintenance'
  },
  {
    id: 18,
    avatar: '',
    site_name: 'Titus Hayne',
    company: 'Web Designer',
    email: 'thayneh@kickstarter.com',
    installer: 'Yangon',
    configured: '05/25/2019',
    status: 'idle'
  }
]

mock.onGet('/api/datatables/initial-data').reply(() => {
  return [200, data]
})

mock.onGet('/api/datatables/data').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.site_name.toLowerCase().includes(queryLowered) ||
      item.company.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.age.toLowerCase().includes(queryLowered) ||
      item.salary.toLowerCase().includes(queryLowered) ||
      item.configured.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})
