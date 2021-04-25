import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { BreadcrumbProvider } from '../BreadcrumbProvider'
import useBreadcrumb from '../useBreadcrumb'
import Breadcrumbs from './Breadcrumbs'

import './App.css'

const FirstPage = () => {
  useBreadcrumb('page.one', { label: 'Page One', url: '/page1' })
  return <h1>Page One</h1>
}

const SecondPage = () => {
  useBreadcrumb('page.two', { label: 'Secon Page', url: '/page2' })
  return (
    <Switch>
      <Route path='/page2' exact>
        <h1>Page Two</h1>
      </Route>
      <Switch>
        <Route path='/page2/:id'>
          <SubPage />
        </Route>
      </Switch>
    </Switch>
  )
}

const SubPage = () => {
  const [count, updateCount] = React.useState(100)

  useBreadcrumb('page.two.sub', { label: `The count is: ${count}` })

  const handleClick = () => {
    updateCount(currentCount => currentCount + 1)
  }

  return (
    <div>
      <h1>Sub Page</h1>
      <button onClick={handleClick}>Update Count</button>
    </div>
  )
}

export default function App () {
  return (
    <BreadcrumbProvider>
      <main className='App'>
        <Router>
          <nav>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/page1'>Go to Page 1</Link>
            <Link to='/page2'>Go to Page 2</Link>
            <Link to='/page2/super'>Go to Page 3</Link>
          </nav>
          <Breadcrumbs />
          <Switch>
            <Route path='/' exact>
              <h1>Home</h1>
            </Route>
            <Route path='/page1'>
              <FirstPage />
            </Route>
            <Route path='/page2'>
              <SecondPage />
            </Route>
          </Switch>
        </Router>
      </main>
    </BreadcrumbProvider>
  )
}
