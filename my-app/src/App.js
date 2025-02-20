import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CategoryList from "./pages/CategoryList";
import SubcategoryPage from "./pages/SubcategoryPage";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import Header from "./pages/Header"; // ✅ Import Header
import Footer from "./pages/Footer"; // ✅ Import Footer
import { AuthProvider } from "./AuthContext";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart"; // ✅ Import Cart
import SubSubcategories from "./pages/SubSubcategories";
import ProductDetails from "./pages/ProductDetails";
import { LanguageProvider } from "./Context/LanguageContext";
import LanguageContext from "./Context/LanguageContext";
import { useContext } from "react";
import PaymentPage from "./pages/PaymentPage";
import PaymentDetailPage from "./pages/PaymentDetailPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AboutUs from "./pages/AboutUs";
// import PaymentDetailPage from "../pages/PaymentDetailsPage";
function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* Routes without Header & Footer (Login, Register) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes with Header & Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/OrderDetails/:orderId" element={<OrderDetails />} />

                    {/* Category Routes */}
                    <Route path="/categorylist" element={<CategoryList />} />
                    <Route path="/products/category/:categoryName" element={<CategoryList />} />

                    {/* Cart Page */}
                    <Route path="/cart" element={<Cart />} />  {/* ✅ Added Cart here */}
                    <Route path="/placeorder" element={<Cart />} />  {/* ✅ Added Cart here */}
                    <Route path="/payment" element={<PaymentPage />} />  {/* ✅ Added Cart here */}
                    <Route path="/orderconfirmed" element={<OrderConfirmationPage/>} />  {/* ✅ Added Cart here */}
          
                    {/* Products */}
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/productlist" element={<ProductList />} /> 

                    {/* Subcategory & Additional Routes */}
                    <Route path="/subcategories/:categoryId" element={<SubcategoryPage />} />
                    <Route path="/subsubcategories/:subcategoryId" element={<SubSubcategories />} />

                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<AboutUs/>} />

                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
