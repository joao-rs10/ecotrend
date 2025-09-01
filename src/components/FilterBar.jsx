import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ filtroCategoria, setFiltroCategoria, filtroPreco, setFiltroPreco }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Categoria:</label>
        <select
          className="filter-select"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="roupas">Roupas e Acessórios</option>
          <option value="beleza">Beleza e Cuidados</option>
          <option value="casa">Itens para Casa</option>
          <option value="tecnologia">Tecnologia Verde</option>
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">
          Preço Máx: R$ {filtroPreco.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="300"
          value={filtroPreco}
          onChange={(e) => setFiltroPreco(Number(e.target.value))}
          className="filter-range"
        />
      </div>
    </div>
  );
};

export default FilterBar;