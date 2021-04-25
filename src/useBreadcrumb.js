import React from 'react'
import { BreadcrumbContext } from './BreadcrumbProvider'

const useBreadcrumb = (key, crumb) => {
  const { breadcrumbs, addCrumb, removeCrumb } = React.useContext(
    BreadcrumbContext
  )

  React.useEffect(() => {
    addCrumb(key, crumb)

    return () => {
      removeCrumb(key)
    }
  }, [addCrumb, removeCrumb, key, crumb])

  return {
    breadcrumbs
  }
}

export { useBreadcrumb }
export default useBreadcrumb
