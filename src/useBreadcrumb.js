import React from 'react'
import { BreadcrumbContext } from './BreadcrumbProvider'

const useBreadcrumb = (crumbs) => {
  const { breadcrumbs, addCrumb, removeCrumb } = React.useContext(
    BreadcrumbContext
  )

  React.useEffect(() => {
    addCrumb(crumbs)

    return () => {
      removeCrumb(crumbs)
    }
  }, [addCrumb, removeCrumb, crumbs])

  return {
    breadcrumbs
  }
}

export { useBreadcrumb }
export default useBreadcrumb
