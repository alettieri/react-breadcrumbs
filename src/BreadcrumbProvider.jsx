import React, { createContext } from 'react'

const BreadcrumbContext = createContext({})

const useBreadcrumbProvider = () => {
  const [crumbs, setCrumbs] = React.useState(new Map())

  // newCrumbs = [[key, value]]
  const updateCrumbs = (...crumbsToAdd) => {
    const newCrumbs = new Map(crumbs)

    for (const [key, value] of crumbsToAdd) {
      newCrumbs.set(key, value)
    }

    const newCrumbValues = Array.from(newCrumbs.values())
    const currentCrumbValues = Array.from(crumbs.values())

    if (newCrumbValues.join('') !== currentCrumbValues.join('')) {
      setCrumbs(newCrumbs)
    }
  }

  const removeCrumbs = (...crumbsToRemove) => {
    const crumbsToKeep = Array.from(crumbs.entries()).filter(
      ([key]) => !crumbsToRemove.includes(key)
    )

    const updatedCrumbs = new Map(crumbsToKeep)

    setCrumbs(updatedCrumbs)
  }

  return {
    breadcrumbs: Array.from(crumbs),
    updateCrumbs,
    removeCrumbs
  }
}

function BreadcrumbProvider ({ children }) {
  const context = useBreadcrumbProvider()

  return (
    <BreadcrumbContext.Provider value={context}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export { useBreadcrumbProvider, BreadcrumbContext, BreadcrumbProvider }
