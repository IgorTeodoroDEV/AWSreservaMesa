import React, { useState } from 'react';
import api from '../api';  // Assumindo que o api está configurado para interagir com o backend

const ConsultarComanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [itens, setItens] = useState([]);
    const [message, setMessage] = useState('');

    const handleConsultarItens = async () => {
        try {
            // Usando GET para consultar os itens da comanda
            const response = await api.get(`/consultarComanda/${comandaID}`);

            // Verificando se a resposta contém o corpo
            if (response.data.body) {
                const responseBody = JSON.parse(response.data.body);  // Parse a string JSON retornada
                console.log(responseBody, 'opa');
                // Acessando comandaID, produto e quantidade
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
            setItens([]);
            setMessage('Erro ao consultar itens da comanda.');
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
