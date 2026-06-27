import { createBrowserRouter } from 'react-router-dom'

import { routes } from './paths'
import { CapturePage } from '../../pages/CapturePage'
import { GalleryPage } from '../../pages/GalleryPage'
import { HomePage } from '../../pages/HomePage'
import { PromptReviewPage } from '../../pages/PromptReviewPage'
import { ResultPage } from '../../pages/ResultPage'

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.capture,
    element: <CapturePage />,
  },
  {
    path: routes.promptReview,
    element: <PromptReviewPage />,
  },
  {
    path: routes.result,
    element: <ResultPage />,
  },
  {
    path: routes.gallery,
    element: <GalleryPage />,
  },
])
