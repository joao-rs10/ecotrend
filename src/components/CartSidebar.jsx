import React from 'react';
import '../styles/CartSidebar.css';

const CartSidebar = ({ carrinho, isCarrinhoAberto, setIsCarrinhoAberto, removerDoCarrinho, finalizarCompra, loading }) => {
  const total = carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2);
  
  return (
    <div className={`cart-sidebar ${isCarrinhoAberto ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="cart-header">
        <h3 className="cart-title">Seu Carrinho</h3>
        <button onClick={() => setIsCarrinhoAberto(false)} className="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="cart-content">
        {carrinho.length === 0 ? (
          <p className="cart-empty-message">O carrinho está vazio.</p>
        ) : (
          carrinho.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.imagem}
                alt={item.nome}
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://placehold.co/50x50/e0e0e0/555?text=Produto`;
                }}
              />
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.nome}</h4>
                <span className="cart-item-price">R$ {item.preco.toFixed(2)}</span>
              </div>
              <button
                onClick={() => removerDoCarrinho(item.id)}
                className="cart-item-remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-9H8m-4 0h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span>R$ {total}</span>
        </div>
        <button
          onClick={finalizarCompra}
          disabled={carrinho.length === 0 || loading}
          className={`checkout-button ${carrinho.length === 0 || loading ? 'disabled-button' : ''}`}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
