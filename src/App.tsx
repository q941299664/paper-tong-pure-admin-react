import { HashRouter } from 'react-router-dom'

import AuthRouter from '@/components/router/AuthRouter'
import Router from '@/router'

const App = () => {
  return (
    <>
      <HashRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </HashRouter>
    </>
  )
}

export default App
