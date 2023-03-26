import {Route,Routes} from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/layout/Layout";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<MenuPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
