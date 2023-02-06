import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { BasketContext } from "../../store/BasketContext";
import { Modal } from "../UI/Modal";
import { BasketItem } from "./BasketItem";
import { TotalAmount } from "./TotalAmount";

export const Basket = ({ onClose }) => {
  const { items, updatedBasketItem, deleteBasketItem } =
    useContext(BasketContext);

  const decrementAmount = useCallback(
    (id, amount) => {
      if (amount > 1) {
        updatedBasketItem({ amount: amount - 1, id });
      } else {
        deleteBasketItem(id);
      }
    },
    [updatedBasketItem, deleteBasketItem]
  );

  const incrementAmount = useCallback(
    (id, amount) => {
      updatedBasketItem({ amount: amount + 1, id });
    },
    [updatedBasketItem]
  );

  const getTotalPrice = useCallback(() => {
    const sum = items.reduce(
      (sum, { amount, price }) => sum + amount * price,
      0
    );
    return sum;
  }, [items]);
  return (
    <Modal onClose={onClose}>
      <Content>
        {items.length ? (
          <FixedHeightContainer>
            {items.map((item) => {
              return (
                <BasketItem
                  key={item._id}
                  item={item}
                  decrementAmount={() => decrementAmount(item._id, item.amount)}
                  incrementAmount={() => incrementAmount(item._id, item.amount)}
                />
              );
            })}
          </FixedHeightContainer>
        ) : null}

        <TotalAmount
          price={getTotalPrice()}
          onClose={onClose}
          onOrder={() => {}}
        />
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
`;

const FixedHeightContainer = styled.div`
  max-height: 228px;
  overflow-y: scroll;
`;
