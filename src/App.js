import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
const Trade = React.lazy(() => import('./pages/Trade'));
const Home = React.lazy(() => import('./pages/Home'));


const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/trade" element={<Trade />} />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
