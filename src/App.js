
import './App.css';
import Head from './components/Head';
import Home from './components/Home';
// import { Routes, Route } from 'react-router-dom';

import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";

import Login from './components/Login';
import SignUp from './components/SignUp';
import SideBar from './components/SideBar';
import DashBoard from './pages/Dashboard';
import LayoutPage from './pages/LayoutPage'
import Conversation from './pages/Conversation';
import Logout from './components/Logout';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import ForgetPassword from './components/ForgetPassword'
import ProtectedRoutes from './Services/ProtctedRoutes';

// function App() {
//   return (
//     <div className="App">
//       {/* {process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE} */}
//        <Routes>
//           <Route path='/' element={<Home />}/>
//           <Route path='/signup' element={<SignUp />}/>
//           <Route path='/login' element={<Login />}/>
//           <Route path='/sidebar' element={<SideBar />}/>
//           <Route path='/dashboard' element={<DashBoard />}/>
//           <Route path='/dashboardpage' element={<LayoutPage />} />
//           <Route path='/conversation' element={<Conversation />} />
//           <Route path='/forget-password' element={<ForgetPassword />} />
//           <Route path='/reset-password' element={<ResetPassword />}/>
//           <Route path='/logout' element={<Logout />}/>
          
//        </Routes>
//     </div>
//   );
// }

// const appRouter = createBrowserRouter([
//   {
//     path : '/',
//     element : <AppLayout />,
//     children : [
//       {
//         path : '/',
//         element : <BodyLayout/>,
//       },
//       {
//         path : '/about',
//         element : <About />,
//       },
//       {
//         path : '/contact',
//         element : <Contact />,
//       },
//       {
//         path : '/grocery',
//         element : <Suspense fallback={<h1>Loading .....</h1>}><Grocery /></Suspense>
//         ,
//       },
//       {
//         path : '/restaurant/:resId',
//         element : <RestaurantMenu />
//       },
//       {
//         path : '/cart',
//         element: <Cart/>
//       }
//     ],
//     errorElement : <Error />,
//   },
  
// ])

// Layout component for common structure
const MainLayout = () => (
  <>
    <header> {/* Add your common header here */}</header>
    <Outlet /> {/* Renders the child route elements */}
    <Footer /> {/* Add your common footer here */}
  </>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/signup", element: <SignUp /> },
//       { path: "/login", element: <Login /> },
//       { path: "/sidebar", element: <SideBar /> },
//       { path: "/dashboard", element: <DashBoard /> },
//       { path: "/dashboardpage", element: <LayoutPage /> },
//       { path: "/conversation", element: <Conversation /> },
//       { path: "/forget-password", element: <ForgetPassword /> },
//       { path: "/reset-password/:token", element: <ResetPassword /> },
//       { path: "/logout", element: <Logout /> },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  

  {
    path: "/",
   element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [

      { path: "/sidebar", element: <SideBar /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/dashboardpage", element: <LayoutPage /> },
      { path: "/conversation", element: <Conversation /> },
   
      { path: "/logout", element: <Logout /> },
    ],
  },
 
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
