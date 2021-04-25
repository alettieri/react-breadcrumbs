const { renderHook, act } = require('@testing-library/react-hooks')

const { useBreadcrumbProvider } = require('./BreadcrumbProvider')

test('should handle updating crumbs', () => {
  const { result } = renderHook(() => useBreadcrumbProvider())

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.addCrumb('first', { label: 'First Label' })
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([
    ['first', { label: 'First Label' }]
  ])

  act(() => {
    result.current.addCrumb('second', { label: 'Second Label' })
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', { label: 'Second Label' }],
    ['first', { label: 'First Label' }]
  ])

  // Avoid adding duplicates
  act(() => {
    result.current.addCrumb('second', { label: 'Second Label' })
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', { label: 'Second Label' }],
    ['first', { label: 'First Label' }]
  ])

  // But duplicate keys are okay to replace adding duplicates
  act(() => {
    result.current.addCrumb('second', { label: 'Second Label Replaced' })
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', { label: 'Second Label Replaced' }],
    ['first', { label: 'First Label' }]
  ])

  act(() => {
    result.current.removeCrumb('second')
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([
    ['first', { label: 'First Label' }]
  ])

  act(() => {
    result.current.removeCrumb('first')
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.addCrumb('first', { label: 'First' })
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([['first', { label: 'First' }]])

  act(() => {
    result.current.removeCrumb('first')
  })

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])
})

test('should render with urls', () => {
  const { result } = renderHook(() => useBreadcrumbProvider())

  expect(result.current.breadcrumbs).toHaveLength(0)
  expect(result.current.breadcrumbs).toEqual([])

  act(() => {
    result.current.addCrumb('first', { label: 'First Label', url: '/first' })
  })

  expect(result.current.breadcrumbs).toHaveLength(1)
  expect(result.current.breadcrumbs).toEqual([
    ['first', { label: 'First Label', url: '/first' }]
  ])

  act(() => {
    result.current.addCrumb('second', { label: 'Second Label', url: '/second' })
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', { label: 'Second Label', url: '/second' }],
    ['first', { label: 'First Label', url: '/first' }]
  ])

  act(() => {
    result.current.addCrumb('second', {
      label: 'Second Label',
      url: '/updated'
    })
  })

  expect(result.current.breadcrumbs).toHaveLength(2)
  expect(result.current.breadcrumbs).toEqual([
    ['second', { label: 'Second Label', url: '/updated' }],
    ['first', { label: 'First Label', url: '/first' }]
  ])
})
