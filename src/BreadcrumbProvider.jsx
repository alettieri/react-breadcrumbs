import React from 'react'

const BreadcrumbContext = React.createContext({
  breadcrumbs: [],
  addCrumb: () => {},
  removeCrumb: () => {}
})

const useBreadcrumbProvider = () => {
  const [crumbs, setCrumbs] = React.useState(new Map())
  const breadcrumbs = React.useMemo(() => Array.from(crumbs), [crumbs])

  // Expect addCrumb to be called in the reverse order
  // Given that the react tree is parsed bottom up
  const addCrumb = React.useCallback(
    ([key, label] = []) => {
      
      if(!key) {
        return
      }

      setCrumbs((currentCrumbs) => {
        const currentLabel = currentCrumbs.get(key)
        
        if (label !== currentLabel) {
          const updatedCrumbs = new Map([[key], ...currentCrumbs])
          updatedCrumbs.set(key, label)
          return updatedCrumbs
        }
        return currentCrumbs
      })
    },
    [setCrumbs]
  )

  const removeCrumb = React.useCallback(
    ([key]) => {
      
      if(!key) {
        return
      }

      setCrumbs((currentCrumbs) => {
        if(currentCrumbs.has(key)) {
          const newCrumbs = new Map(currentCrumbs)
          newCrumbs.delete(key)
          return newCrumbs
        }
        return currentCrumbs
      })
    },
    [setCrumbs]
  )

  return {
    breadcrumbs,
    addCrumb,
    removeCrumb
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
