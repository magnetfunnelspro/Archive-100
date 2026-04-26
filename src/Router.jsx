import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// Components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Arrivals from "./pages/Arrivals";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

// User Pages
import Cart from "./pages/user/Cart";
import Search from "./pages/user/Search";
import Checkout from "./pages/user/Checkout";
import Wishlist from "./pages/user/Wishlist";
import Thanks from "./pages/user/Thanks";

// Legal Pages
import FAQs from "./pages/legal/FAQs";
import Terms from "./pages/legal/Terms";
import Policies from "./pages/legal/Policies";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="px-4 xl:px-16">
        <Navbar />
      </div>

      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/new" element={<Arrivals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<Product />} />

        {/* User Pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/thanks" element={<Thanks />} />

        {/* Legal Pages */}
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Policies />} />

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="px-4 xl:px-16">
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
