import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { BreadcrumbProvider } from './BreadcrumbProvider'
import Breadcrumbs from './Breadcrumbs'
import useBreadcrumb from './useBreadcrumb'

const PageOne = () => {
  useBreadcrumb(['page.one', 'Page One'])
  return <h1>Page One</h1>
}

const PageTwo = () => {
  useBreadcrumb(['page.two', 'Page Two'])
  return (
    <Switch>
      <Route path='/page2' exact>
        <h1>Page Two</h1>
      </Route>
      <Switch>
        <Route path='/page2/:id'>
          <PageTwoSub />
        </Route>
      </Switch>
    </Switch>
  )
}

const PageTwoSub = () => {
  useBreadcrumb(['page.two.sub', 'Page Two Sub'])
  return (<h1>Page Two Sub</h1>)
}

export default function App () {
  return (
    <BreadcrumbProvider>
      <main className='App'>
        <Breadcrumbs />
        <Router>
          <div>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/page1'>Go to Page 1</Link>
            <Link to='/page2'>Go to Page 2</Link>
            <Link to='/page2/super'>Go to Page 3</Link>
          </div>
          <Switch>
            <Route path='/' exact>
              Home
            </Route>
            <Route path='/page1'>
              <PageOne />
            </Route>
            <Route path='/page2'>
              <PageTwo />
            </Route>
          </Switch>
        </Router>
      </main>
    </BreadcrumbProvider>
  )
}
