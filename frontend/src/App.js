import "./App.css";
import { useEffect } from "react";
import Loader from "./component/layout/Loader/Loader";
import Navbar from "./component/layout/Navbar/Navbar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {Suspense} from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";

import Products from "./component/Product/Products";
import { loadUser } from "./actions/userAction";
import store from "./store";
// import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";

const ProductDetails = React.lazy(() => import("./component/Product/ProductDetails"));
// const Search = React.lazy(() => import("./component/Product/Search"));
const LoginSignUp = React.lazy(() =>import("./component/User/LoginSignUp"));
const Profile = React.lazy(() =>import("./component/User/Profile"));
const UpdateProfile = React.lazy(() =>import("./component/User/UpdateProfile"));
const UpdatePassword = React.lazy(() =>import("./component/User/UpdatePassword"));
const ForgotPassword = React.lazy(() =>import("./component/User/ForgotPassword"));
const ResetPassword = React.lazy(() =>import("./component/User/ResetPassword"));

const Cart = React.lazy(() =>import("./component/Cart/Cart"));
const Shipping = React.lazy(() => import("./component/Cart/Shipping"));
const ConfirmOrder = React.lazy(() => import("./component/Cart/ConfirmOrder"));
const OrderSuccess = React.lazy(() => import("./component/Cart/OrderSuccess"));
const MyOrders = React.lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = React.lazy(() => import("./component/Order/OrderDetails"));

const Dashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const ProductList = React.lazy(() => import("./component/Admin/ProductList"));
const NewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const UpdateProduct = React.lazy(() =>import("./component/Admin/UpdateProduct"));
const OrderList = React.lazy(() => import("./component/Admin/OrderList"));
const ProcessOrder = React.lazy(() => import("./component/Admin/ProcessOrder"));
const UsersList = React.lazy(() => import("./component/Admin/UsersList"));
const UpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const ProductReviews = React.lazy(() =>import("./component/Admin/ProductReviews"));
const CouponList = React.lazy(() => import("./component/Admin/CouponList"));
const NewCoupon = React.lazy(() => import("./component/Admin/NewCoupon"));
const UpdateCoupon = React.lazy(() => import("./component/Admin/UpdateCoupon"));


const NotFound = React.lazy(() =>
  import("./component/layout/Not Found/NotFound")
);
const PaymentSuccess = React.lazy(() =>
  import("./component/Cart/PaymentSuccess")
  );
  
const Contact = React.lazy(() => import("./component/layout/Contact/Contact"));
const About = React.lazy(() => import("./component/layout/About/About"));
const Story = React.lazy(() => import("./component/layout/Story/Story"));
const Craft = React.lazy(() => import("./component/layout/Craft/Craft"));
const Return = React.lazy(() => import("./component/layout/Policies/Return/Return"));
const Privacy = React.lazy(() => import("./component/layout/Policies/Privacy/Privacy"));
const Ship = React.lazy(() => import("./component/layout/Policies/Ship/Ship"));
const TnC = React.lazy(() => import("./component/layout/Policies/TnC/TnC"));


// import ProductDetails from "./component/Product/ProductDetails";
// import Search from "./component/Product/Search";
// import LoginSignUp from "./component/User/LoginSignUp";

// import Profile from "./component/User/Profile";
// import UpdateProfile from "./component/User/UpdateProfile";
// import UpdatePassword from "./component/User/UpdatePassword";
// import ForgotPassword from "./component/Us  er/ForgotPassword";
// import ResetPassword from "./component/User/ResetPassword.js";

// import Cart from "./component/Cart/Cart.js";
// import Shipping from "./component/Cart/Shipping.js";
// import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
// import OrderSuccess from "./component/Cart/OrderSuccess.js";
// import MyOrders from "./component/Order/MyOrders.js";
// import OrderDetails from "./component/Order/OrderDetails.js";

// import Dashboard from "./component/Admin/Dashboard.js";
// import ProductList from "./component/Admin/ProductList.js";
// import NewProduct from "./component/Admin/NewProduct.js";
// import UpdateProduct from "./component/Admin/UpdateProduct.js";
// import OrderList from "./component/Admin/OrderList.js";
// import ProcessOrder from "./component/Admin/ProcessOrder";
// import UsersList from "./component/Admin/UsersList";
// import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
// import CouponList from "./component/Admin/CouponList.js";
// import NewCoupon from "./component/Admin/NewCoupon";
// import UpdateCoupon from "./component/Admin/UpdateCoupon";

// import NotFound from "./component/layout/Not Found/NotFound";
// import PaymentSuccess from "./component/Cart/PaymentSuccess";

// import Contact from "./component/layout/Contact/Contact.js";
// import About from "./component/layout/About/About.js";
// import Return from "./component/layout/Policies/Return/Return";
// import Privacy from "./component/layout/Policies/Privacy/Privacy";
// import Ship from "./component/layout/Policies/Ship/Ship";
// import TnC from "./component/layout/Policies/TnC/TnC";

//removed .js from all of the above ones to make it look cool
//but if you have error, please add it

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("webfontloader").then((webfontloader) => {
        // Use webfontloader here or execute code that depends on it
        webfontloader.load({
          google: {
            families: ["Roboto Slab", "Droid Sans", "Chilanka"],
          },
        });
      });
    }
    store.dispatch(loadUser());
  }, []);

  //prevents right click and inspect, so don't uncomment
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Navbar />
      {/* <Header /> */}

      {/* {isAuthenticated && <UserOptions user={user} />} */}

      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />

          {/* <Route exact path="/search" component={Search} /> */}

          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/story" component={Story} />
          <Route exact path="/craft" component={Craft} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/return" component={Return} />
          <Route exact path="/ship" component={Ship} />
          <Route exact path="/tnc" component={TnC} />

          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          <Route exact path="/login" component={LoginSignUp} />

          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/products"
            component={ProductList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/product"
            component={NewProduct}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/orders"
            component={OrderList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/order/:id"
            component={ProcessOrder}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/users"
            component={UsersList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/user/:id"
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/reviews"
            component={ProductReviews}
          />

          <ProtectedRoute
            exact
            path="/paymentsuccess"
            component={PaymentSuccess}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/coupons"
            component={CouponList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/coupon"
            component={NewCoupon}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/coupon/:id"
            component={UpdateCoupon}
          />

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
