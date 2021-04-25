const { renderHook, act } = require('@testing-library/react-hooks')

const { useBreadcrumbProvider } = require('./BreadcrumbProvider')

test('should handle updating crumbs', () => {
  const { result } = renderHook(() => useBreadcrumbProvider())

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.addCrumb(['first', 'First Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])

  act(() => {
    result.current.addCrumb(['second', 'Second Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', 'Second Label'],
    ['first', 'First Label'],
  ])

  // Avoid adding duplicates
  act(() => {
    result.current.addCrumb(['second', 'Second Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', 'Second Label'],
    ['first', 'First Label'],
  ])

  // But duplicate keys are okay to replace adding duplicates
  act(() => {
    result.current.addCrumb(['second', 'Second Label Replaced'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', 'Second Label Replaced'],
    ['first', 'First Label'],
  ])

  act(() => {
    result.current.removeCrumb(['second'])
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])

  act(() => {
    result.current.removeCrumb(['first'])
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.addCrumb(
      ['first', 'First']
    )
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([
    ['first', 'First']
  ])

  act(() => {
    result.current.removeCrumb(['first'])
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])
})
