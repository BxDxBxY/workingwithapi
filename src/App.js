import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Students from "./components/Students.js";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store.js";
import Posts from "./components/Posts.js";
import { QueryClient, QueryClientProvider } from "react-query";
import Shop from "./components/shop/Shop.js";
import SigninPage from "./components/shop/Auth/Signin_page.js";
import Auth from "./components/shop/Auth/Auth.js";
import LoginPage from "./components/shop/Auth/LoginPage.js";
import UserCard from "./components/shop/User/UserCard.js";
import { PrivateRoute } from "./components/PrivateRoute";
import Products from "./components/shop/Products/Products.js";

const queryClient = new QueryClient({
  // defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});
const userRole = ["admin"];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/">
            <Route path="students" element={<Students />} />
            <Route path="jsonplaceholder" element={<Posts />} />

            <Route path="/auth" element={<Auth />}>
              <Route index path="login" element={<LoginPage />} />
              <Route path="signin" element={<SigninPage />} />
            </Route>
            <Route
              path="/onlineshop/*"
              element={
                <PrivateRoute
                  userRole={userRole}
                  allowedRoles={["user", "admin"]}
                >
                  <Routes>
                    <Route path="/" element={<Shop />}>
                      <Route path="user" element={<UserCard />} />
                      <Route path="products" element={<Products />} />
                    </Route>
                    <Route
                      path="*"
                      element={<p>There's nothing here: 404!</p>}
                    />
                  </Routes>
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/onlineshop"
              element={
                <PrivateRoute>
                  <Shop />
                </PrivateRoute>
              }
            >
              <Route path="user" element={<UserCard />} />
            </Route> */}
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

// private route
// redirect to
// yup validation
// .env config file language
