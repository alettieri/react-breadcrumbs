const { renderHook } = require('@testing-library/react-hooks')

const { BreadcrumbProvider } = require('./BreadcrumbProvider')
const { useBreadcrumb } = require('./useBreadcrumb')

test('it should update breadcrumbs', () => {
  const { result, rerender } = renderHook(
    ({ key, crumb }) => useBreadcrumb(key, crumb),
    {
      wrapper: BreadcrumbProvider,
      initialProps: {
        key: 'first',
        crumb: { label: 'First Label', url: '/first' }
      }
    }
  )

  expect(result.current.breadcrumbs).toEqual([
    ['first', { label: 'First Label', url: '/first' }]
  ])

  rerender({
    key: 'first',
    crumb: { label: 'First Label Rerendered' }
  })

  expect(result.current.breadcrumbs).toEqual([
    ['first', { label: 'First Label Rerendered' }]
  ])
})
