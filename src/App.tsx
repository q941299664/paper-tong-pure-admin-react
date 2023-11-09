import { HashRouter } from 'react-router-dom'

import AuthRouter from '@/components/router/AuthRouter'
import Router from '@/router'

function App() {
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
