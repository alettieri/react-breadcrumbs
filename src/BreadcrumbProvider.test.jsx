const { renderHook, act } = require('@testing-library/react-hooks')

const { useBreadcrumbProvider } = require('./BreadcrumbProvider')

test('should handle updating crumbs', () => {
  const { result } = renderHook(() => useBreadcrumbProvider())

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.updateCrumbs(['first', 'First Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])

  act(() => {
    result.current.updateCrumbs(['first.second', 'Second Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['first', 'First Label'],
    ['first.second', 'Second Label']
  ])

  // Avoid adding duplicates
  act(() => {
    result.current.updateCrumbs(['first.second', 'Second Label'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['first', 'First Label'],
    ['first.second', 'Second Label']
  ])

  // But duplicate keys are okay to replace adding duplicates
  act(() => {
    result.current.updateCrumbs(['first.second', 'Second Label Replaced'])
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['first', 'First Label'],
    ['first.second', 'Second Label Replaced']
  ])

  act(() => {
    result.current.removeCrumbs('first.second')
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([['first', 'First Label']])

  act(() => {
    result.current.removeCrumbs('first')
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.updateCrumbs(
      ['first', 'First'],
      ['second', 'Second'],
      ['third', 'Third']
    )
  })

  expect(result.current.breadcrumbs).toHaveLength(3)
  expect(result.current.breadcrumbs).toEqual([
    ['first', 'First'],
    ['second', 'Second'],
    ['third', 'Third']
  ])

  act(() => {
    result.current.removeCrumbs('first', 'second', 'third')
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])
})
