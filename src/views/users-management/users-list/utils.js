function convertArrayOfObjectsToCSV(store, array) {
  let result

  const columnDelimiter = ','
  const lineDelimiter = '\n'
  const keys = Object.keys(store.data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  array.forEach(item => {
    let ctr = 0
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter

      result += item[key]

      ctr++
    })
    result += lineDelimiter
  })

  return result
}

export function downloadCSV(store) {
  const link = document.createElement('a')
  let csv = convertArrayOfObjectsToCSV(store, store.data)
  if (csv === null) return

  const filename = 'export.csv'

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`
  }

  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', filename)
  link.click()
}