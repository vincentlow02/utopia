import { createBrowserRouter } from 'react-router-dom'

import { routes } from './paths'
import { UtopiaPage } from '../../pages/UtopiaPage'

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <UtopiaPage />,
  },
  {
    path: routes.utopia,
    element: <UtopiaPage />,
  },
])
