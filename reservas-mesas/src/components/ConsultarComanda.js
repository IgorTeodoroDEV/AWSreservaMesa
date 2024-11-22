import React, { useState } from 'react';
import axios from 'axios';

const ConsultarComanda = () => {
  const [comandaID, setComandaID] = useState('');
  const [itens, setItens] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Função que faz a requisição para a API e processa a resposta
  const handleConsultarItens = async () => {
    // Verificando se o comandaID foi informado
    if (!comandaID) {
      setMessage('Por favor, insira o ID da comanda.');
      return;
    }

    setLoading(true); // Ativar o carregamento
    setMessage('');

    try {
      // Fazendo a requisição GET para a API
      const response = await axios.get(`https://x9giuzuyq5.execute-api.us-east-1.amazonaws.com/prod/consultarComanda/${comandaID}`);

      // Verificando se a resposta contém o corpo com os dados da comanda
      if (response.data && response.data.body) {
        const responseBody = JSON.parse(response.data.body);  // Parsing da string JSON
        console.log(responseBody);  // Para depuração no console

        // Verificando se existem itens
        if (responseBody.itens && responseBody.itens.length > 0) {
          setItens(responseBody.itens);
          setMessage('Itens carregados com sucesso.');
        } else {
          setItens([]);
          setMessage('Nenhum item encontrado para esta comanda.');
        }
      } else {
        setItens([]);
        setMessage('Erro ao recuperar a comanda.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setItens([]);
      setMessage('Erro ao consultar itens da comanda.');
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  return (
    <div>
      <h2>Consultar Itens da Comanda</h2>

      {/* Campo para inserir o ID da comanda */}
      <input
        type="text"
        placeholder="ID da Comanda"
        value={comandaID}
        onChange={(e) => setComandaID(e.target.value)}
      />
      <button onClick={handleConsultarItens} disabled={loading}>
        {loading ? 'Carregando...' : 'Consultar Itens'}
      </button>

      {/* Mensagem de status */}
      <p>{message}</p>

      {/* Exibindo a lista de itens */}
      {itens.length > 0 && (
        <ul>
          {itens.map((item, index) => (
            <li key={index}>
              Produto: {item.produto} - Quantidade: {item.quantidade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultarComanda;
