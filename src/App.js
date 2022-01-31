import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import { LoadingOutlined } from '@ant-design/icons'
// import Home from './Home'
// import Header from './components/nav/Header'
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'
// import RegisterComplete from './pages/auth/RegisterComplete'
// import ForgotPassword from './pages/auth/ForgotPassword'
// import History from './pages/user/History'
// import UserRoute from './components/routes/UserRoute'
// import AdminRoute from './components/routes/AdminRoutes'
// import Password from './pages/user/Password'
// import Wishlist from './pages/user/Wishlist'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import CategoryUpdate from './pages/admin/category/CategoryUpdate'
// import SubCreate from './pages/admin/sub/SubCreate'
// import SubUpdate from './pages/admin/sub/subUpdate'
// import ProductCreate from './pages/admin/product/ProductCreate'
// import AllProducts from './pages/admin/product/AllProducts'
// import ProductUpdate from './pages/admin/product/ProductUpdate'
// import Product from './pages/Product'
// import CategoryHome from './pages/category/CategoryHome'
// import SubHome from './pages/sub/SubHome'
// import Shop from './pages/Shop'
// import Cart from './pages/Cart'
// import SideDrawer from './components/drawer/SideDrawer'
// import Checkout from './pages/Checkout'
// import CreateCouponPage from './pages/admin/coupon/CreateCouponPage'
// import Payment from './pages/Payment/Payment'
// import Complete from './pages/Payment/Complete'

// using lazy
const Home = lazy(() => import('./Home'))
const Header = lazy(() => import('./components/nav/Header'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const AdminRoute = lazy(() => import('./components/routes/AdminRoutes'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
)
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
)
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'))
const SubUpdate = lazy(() => import('./pages/admin/sub/subUpdate'))
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const Product = lazy(() => import('./pages/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
)
const Payment = lazy(() => import('./pages/Payment/Payment'))
const Complete = lazy(() => import('./pages/Payment/Complete'))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        // backend
        currentUser(idTokenResult.token)
          .then((res) => {
            console.log('Data', res.data)
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            })
          })
          .catch((error) => {
            console.log(error)
            toast.error(error.response.data.err)
          })
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          __Venkatesh_pr
          <LoadingOutlined />
          ject__
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute
          exact
          path='/admin/products/:slug'
          component={ProductUpdate}
        />
        <AdminRoute exact path='/admin/coupon' component={CreateCouponPage} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
        <UserRoute exact path='/payment' component={Payment} />
        <UserRoute exact path='/payment/complete' component={Complete} />
      </Switch>
    </Suspense>
  )
}

export default App
