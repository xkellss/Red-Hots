import {Route,Routes} from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<MenuPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
