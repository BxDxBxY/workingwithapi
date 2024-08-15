import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Students from "./components/Students.js";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store.js";
import Posts from "./components/Posts.js";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  // defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="students" element={<Students />} />
            <Route path="jsonplaceholder" element={<Posts />} />
          </Route>
        </Routes>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
