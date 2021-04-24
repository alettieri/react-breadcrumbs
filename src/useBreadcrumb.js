import React from 'react'
import { BreadcrumbContext } from './BreadcrumbProvider'

const useBreadcrumb = (...newCrumbs) => {
  const { breadcrumbs, updateCrumbs, removeCrumbs } = React.useContext(
    BreadcrumbContext
  )

  React.useEffect(() => {
    updateCrumbs(newCrumbs)
    return () => {
      removeCrumbs(newCrumbs)
    }
  }, [updateCrumbs, removeCrumbs, newCrumbs])

  return {
    breadcrumbs
  }
}

export { useBreadcrumb }
export default useBreadcrumb