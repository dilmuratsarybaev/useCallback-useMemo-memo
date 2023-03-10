import { useCallback, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Basket } from "./components/basket/Basket";
import { Header } from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import BasketProvider from "./store/BasketContext";

function App() {
  const [isBasketVisible, setBasketVisible] = useState(false);

  const showBasketHandler = useCallback(() => {
    setBasketVisible((prevState) => !prevState);
  }, []);
  return (
    <BasketProvider>
      <div>
        <Header onShowBasket={showBasketHandler} />
        <Content>
          <Summary />
          <Meals />
          {isBasketVisible && <Basket onClose={showBasketHandler} />}
        </Content>
      </div>
    </BasketProvider>
  );
}

export default App;

const Content = styled.div``;
