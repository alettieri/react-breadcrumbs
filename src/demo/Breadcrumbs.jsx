import React from 'react'
import { Link } from 'react-router-dom'

import { useBreadcrumb } from '../useBreadcrumb'

const Crumb = ({ url, label }) => {
  if (!label) return null
  if (url) {
    return <Link to={url}>{label}</Link>
  }
  return <span>{label}</span>
}

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumb()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <div className='breadcrumbs'>
      <ul>
        {breadcrumbs.map(([key, crumb]) => (
          <li key={key}>
            <Crumb {...crumb} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
