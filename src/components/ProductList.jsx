import React from 'react';
import '../styles/ProductList.css';

const ProductList = ({ produtos, loading, adicionarAoCarrinho }) => {
  if (loading) {
    return null;
  }

  return (
    <section className="product-grid">
      {produtos.length > 0 ? (
        produtos.map(produto => (
          <div key={produto.id} className="product-card">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = https://placehold.co/400x300/e0e0e0/555?text=EcoTrend;
              }}
            />
            <div className="product-details">
              <h2 className="product-name">{produto.nome}</h2>
              <p className="product-description">{produto.descricao}</p>
            </div>
            <div className="product-footer">
              <span className="product-price">R$ {produto.preco.toFixed(2)}</span>
              <button
                className="add-to-cart-button"
                onClick={() => adicionarAoCarrinho(produto)}
              >
                ADICIONAR
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-products-message">
          Nenhum produto encontrado com os filtros selecionados.
        </p>
      )}
    </section>
  );
};

export default ProductList;
