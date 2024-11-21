import React, { useState } from 'react';
import axios from 'axios';

// Certifique-se de que axios está instalado no seu projeto

const ConsultarComanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [itens, setItens] = useState([]);
    const [message, setMessage] = useState('');

    const handleConsultarItens = async () => {
        try {
            // Substitua o link abaixo pela URL do seu API Gateway
            const apiUrl = `https://x9giuzuyq5.execute-api.us-east-1.amazonaws.com/prod/consultarComanda?${comandaID}`;

            // Fazendo a requisição GET para o seu API Gateway
            const response = await axios.get(apiUrl);

            // Verificando se a resposta contém os itens
            if (response.data && response.data.itens) {
                setItens(response.data.itens);  // Atualiza os itens na tela
                setMessage('Itens carregados com sucesso.');
            } else {
                setItens([]);  // Nenhum item encontrado
                setMessage('Nenhum item encontrado para esta comanda.');
            }
        } catch (error) {
            // Em caso de erro
            console.error('Erro na consulta:', error);
            setMessage('Erro ao consultar itens da comanda. Verifique o ID informado.');
        }
    };

    return (
        <div>
            <h2>Consultar Itens da Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}  // Atualiza o comandaID conforme digitação
            />
            <button onClick={handleConsultarItens}>Consultar Itens</button>
            <p>{message}</p>
            {itens.length > 0 && (
                <ul>
                    {itens.map((item, index) => (
                        <li key={index}>
                            {item.produto} - Quantidade: {item.quantidade}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsultarComanda;