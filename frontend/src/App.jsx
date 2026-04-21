import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Collections from './pages/Collections'
import Stories from './pages/Stories'
import About from './pages/About'
import Categories from './pages/Categories'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import TermsAndPolicies from './pages/TermsAndPolicies'
import CategoryPage from './pages/CategoryPage'
import OpenSearch from './components/OpenSearch'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetails'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import AdminLayout from './pages/admin/AdminLayout'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/stories' element={<Stories />} />
        <Route path='/about' element={<About />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:category' element={<CategoryPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms-and-policies' element={<TermsAndPolicies />} />
        <Route path='/open-search' element={<OpenSearch />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/product/:id' element={<ProductDetails />} />

        {/* Protected User Routes */}
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='users' element={<AdminUsers />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
