// src/components/Comanda.js
import React, { useState } from 'react';
import api from '../api';

const Comanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [message, setMessage] = useState('');

    const handleConsultarComanda = async () => {
        try {
            const response = await api.post('/consultarComanda', {
                action: 'consultarItensComanda',
                comandaID: comandaID,
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao consultar comanda.');
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
            <button onClick={handleConsultarComanda}>consultarComanda</button>
            <p>{message}</p>
        </div>
    );
};

export default ConsultaComanda;
