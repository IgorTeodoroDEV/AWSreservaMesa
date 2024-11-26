// src/components/Comanda.js
import React, { useState } from 'react';
import api from '../api';

const Comanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [message, setMessage] = useState('');

    const handleConsultarComanda = async () => {
        try {
            const response = await api.post('/consultarComanda', {
                action: 'adicionarItem',
                comandaID: comandaID,
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao adicionar item.');
        }
    };

    return (
        <div>
            <h2>Adicionar Item à Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}
            />
            <button onClick={handleConsultarComanda}>Consultar Comanda</button>
            <p>{message}</p>
        </div>
    );
};

export default Comanda;
