import React, { useState } from 'react';
import api from '../api';

const ConsultarComanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [itens, setItens] = useState([]);
    const [message, setMessage] = useState('');

    const handleConsultarItens = async () => {
        if (!comandaID) {
            setMessage('Por favor, insira um ID de comanda válido.');
            return;
        }

        try {
            console.log(`Consultando comanda com ID: ${comandaID}`);
            const response = await api.get(`/consultarComanda/23`);
            console.log("Resposta completa da API:", response);

            // Verifica se há um body na resposta
            if (response.data.body) {
                const responseBody = JSON.parse(response.data.body); // Parse JSON
                console.log("Resposta processada:", responseBody);

                // Valida se há comandaID e itens no corpo da resposta
                if (responseBody.comandaID && responseBody.itens) {
                    setItens(responseBody.itens);
                    setMessage(`Comanda ID: ${responseBody.comandaID} - Itens carregados com sucesso.`);
                } else {
                    setItens([]);
                    setMessage('Nenhum item encontrado para esta comanda.');
                }
            } else {
                setItens([]);
                setMessage('Erro ao recuperar a comanda.');
            }
        } catch (error) {
            console.error("Erro durante a requisição:", error);

            if (error.response) {
                console.error("Erro do servidor:", error.response.data);
            } else if (error.request) {
                console.error("A requisição foi enviada, mas não houve resposta:", error.request);
            } else {
                console.error("Erro ao configurar a requisição:", error.message);
            }

            setMessage('Erro ao consultar itens da comanda.');
            setItens([]);
        }
    };

    return (
        <div>
            <h2>Consultar Itens da Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}
            />
            <button onClick={handleConsultarItens}>Consultar Itens</button>
            <p>{message}</p>
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
