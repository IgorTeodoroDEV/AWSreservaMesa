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

            // Verificando se a resposta contém itens
            if (response.data.body) {
                const responseBody = JSON.parse(response.data.body);  // Parse a string JSON retornada
                if (responseBody.itens && responseBody.itens.length > 0) {
                    setItens(responseBody.itens);
                    setMessage('Itens carregados com sucesso.');
                } else {
                    setItens([]);
                    setMessage('Nenhum item encontrado para esta comanda.');
                }
            } else {
                setItens([]);
                setMessage('Nenhum item encontrado para esta comanda.');
            }
        } catch (error) {
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
                            {item.produto} - Quantidade: {item.quantidade}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsultarComanda;
