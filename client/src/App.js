import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import useTelegram from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";
import Form from "./pages/Form/Form";
import NotFound from "./components/NotFound";
import ProductList from "./pages/ProductList/ProductList";
import ThemeProvider from './theme';

const App = () => {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <ThemeProvider>
      <div className="max-w-[380px]  bg-[#F9FAFB] mx-auto" >
        <Header />
        <Routes>
          <Route index element={<ProductList />} />
          <Route path='form' element={<Form />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
