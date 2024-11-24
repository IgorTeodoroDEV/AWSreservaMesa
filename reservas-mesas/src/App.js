// src/App.js
import React from 'react';
import MesaReserva from './components/MesaReserva';
import Comanda from './components/Comanda';
import FinalizarComanda from './components/FinalizarComanda';
import ConsultarComanda from './components/ConsultarComanda'; // Importe o novo componente

function App() {
  return (
    <div className="App">
      <h1>Reservas e Comandas</h1>
      <MesaReserva />
      <Comanda />
      <FinalizarComanda />
      <ConsultarComanda /> {/* Adicione o componente ao layout */}
    </div>
  );
}

export default App;
