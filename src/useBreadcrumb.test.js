const { renderHook, act } = require('@testing-library/react-hooks')

const { BreadcrumbProvider } = require('./BreadcrumbProvider')
const { useBreadcrumb } = require('./useBreadcrumb')

test('it should update breadcrumbs', async () => {
  const { result, waitFor } = renderHook(() => useBreadcrumb(['first', 'First Label']), {
    wrapper: BreadcrumbProvider
  })

  await waitFor(() => {
    expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])
  })

})