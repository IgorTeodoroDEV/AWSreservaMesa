// src/components/Comanda.js
import React, { useState } from 'react';
import api from '../api';

const Comanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [itens, setItens] = useState([]);
    const [message, setMessage] = useState('');

    const handleConsultarItens = async () => {
        try {
            const response = await api.post('/consultarComanda', {
                action: 'consultar_itens_comanda',
                comandaID: comandaID,
            });
            if (response.data && response.data.body) {
                const responseBody = JSON.parse(response.data.body);
                setItens(responseBody.itens || []);
                setMessage(`Itens encontrados para a comanda ${comandaID}`);
            } else {
                setItens([]);
                setMessage('Nenhum item encontrado ou resposta inválida.');
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

export default Comanda;
