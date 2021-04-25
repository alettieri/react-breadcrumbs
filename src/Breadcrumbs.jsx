import React from 'react'

import {useBreadcrumb} from './useBreadcrumb'

const Breadcrumbs = () => {
  const {breadcrumbs} = useBreadcrumb()

  if(breadcrumbs.length === 0) {
    return 'None'
  }

  return (
    <div>
      <h5>Crumbs</h5>
      {JSON.stringify(breadcrumbs)}
      <ul>
      {
        breadcrumbs.map(([key, label]) => <li key={key}>{label}</li>)
      }
      </ul>
    </div>
  )
}


export default Breadcrumbs