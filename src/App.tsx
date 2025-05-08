
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'

import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Register from "./pages/Register"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
 
  </QueryClientProvider>
);

export default App
