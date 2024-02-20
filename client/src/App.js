import React, { useEffect } from "react";
import Header from "./components/Header";
import useTelegram from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";
import Form from "./pages/form";
import NotFound from "./components/NotFound";
import ProductList from "./pages/productList";
import ThemeProvider from "./theme";
import "./App.css";
import OrderList from "./pages/orderslist";

const App = () => {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <ThemeProvider>
      <div className='max-w-[380px]  bg-[#F9FAFB] mx-auto'>
        {/* <Header /> */}
        <Routes>
          <Route index element={<ProductList />} />
          <Route path='/form' element={<Form />} />
          <Route path='/order/list' element={<OrderList />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
