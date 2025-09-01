import React, { useState, useEffect } from 'react';
import produtosData from './data/produto.json';
import './App.css';
import './global.css';
import FilterBar from './components/FilterBar';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroPreco, setFiltroPreco] = useState(300);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProdutos(produtosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  useEffect(() => {
    try {
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinhoEcoTrend'));
      if (carrinhoSalvo) {
        setCarrinho(carrinhoSalvo);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('carrinhoEcoTrend', JSON.stringify(carrinho));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    setMensagem('Produto adicionado ao carrinho!');
    setTimeout(() => setMensagem(null), 2000);
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter(produto => produto.id !== produtoId));
  };

  const finalizarCompra = async () => {
    setLoading(true);
    setMensagem('Finalizando compra...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMensagem('Dados validados. Processando pagamento...');

      await new Promise(resolve => setTimeout(resolve, 2000));

      setCarrinho([]);
      setMensagem('🎉 Compra finalizada com sucesso! 🎉');

    } catch (error) {
      console.error('Error finishing checkout:', error);
      setMensagem('❌ Ocorreu um erro ao finalizar a compra.');
    } finally {
      setLoading(false);
      setTimeout(() => setMensagem(null), 4000);
    }
  };

  const produtosFiltrados = produtos.filter(produto => {
    const categoriaCorreta = filtroCategoria === 'todos' || produto.categoria === filtroCategoria;
    const precoCorreto = produto.preco <= filtroPreco;
    return categoriaCorreta && precoCorreto;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">EcoTrend</h1>
      </header>

      <main className="app-main">
        <div className="cart-header-block">
          <button
            className="cart-button"
            onClick={() => setIsCarrinhoAberto(true)}
          >
            🛒
            <span className="cart-count">
              {carrinho.length}
            </span>
          </button>
          <span className="cart-label">Carrinho</span>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-message">
              {mensagem ? mensagem : 'Carregando produtos...'}
            </p>
          </div>
        )}

        {mensagem && !loading && (
          <div className="app-message">
            {mensagem}
          </div>
        )}

        <FilterBar
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroPreco={filtroPreco}
          setFiltroPreco={setFiltroPreco}
        />
        <ProductList
          produtos={produtosFiltrados}
          loading={loading}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </main>

