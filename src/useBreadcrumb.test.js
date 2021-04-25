const { renderHook } = require('@testing-library/react-hooks')

const { BreadcrumbProvider } = require('./BreadcrumbProvider')
const { useBreadcrumb } = require('./useBreadcrumb')

test('it should update breadcrumbs', () => {
  const { result, rerender, unmount } = renderHook(({crumbs}) => useBreadcrumb(crumbs), {
    wrapper: BreadcrumbProvider,
    initialProps: {
      crumbs: ['first', 'First Label']
    }
  })

  expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])
 
  rerender({
    crumbs: ['first', 'First Label Rerendered']
  })

  expect(result.current.breadcrumbs).toEqual([['first', 'First Label Rerendered']])

  // unmount()

  // expect(result.current.breadcrumbs).toEqual([])
})
