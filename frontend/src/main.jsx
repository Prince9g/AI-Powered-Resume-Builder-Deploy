import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'; // Import persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Signin from './components/Signin.jsx';
import App from './App.jsx';
import Builder from './components/Builder.jsx';
import Templates from './components/Templates.jsx';
import Homepage from './components/Homepage.jsx';
import Dashboard from './components/Dashboard.jsx';
import AI from './components/AI.jsx';
import MyResumes from './components/MyResumes.jsx';
import ResumeAIHelper from './components/ResumeAIHelper.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '*', element: <div>Page not found</div> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-in', element: <Signin /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
    children: [
      { path: 't1', element: <Templates /> },
      { path: 't1/build', element: <Builder /> },
      { path: 'ai', element: <ResumeAIHelper/> },
      {path: 'my-resumes', element: <MyResumes/> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Add PersistGate */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
