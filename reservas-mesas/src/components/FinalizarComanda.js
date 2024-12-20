// src/components/FinalizarComanda.js
import React, { useState } from 'react';
import api from '../api';

const FinalizarComanda = () => {
    const [comandaID, setComandaID] = useState('');
    const [message, setMessage] = useState('');

    const handleFinalizarComanda = async () => {
        try {
            const response = await api.post('/finalizarComanda', {
                action: 'finalizarComanda',
                comandaID: comandaID,
            });
            setMessage(response.data.body);
        } catch (error) {
            setMessage('Erro ao finalizar comanda.');
        }
    };

    return (
        <div>
            <h2>Finalizar Comanda</h2>
            <input
                type="text"
                placeholder="ID da Comanda"
                value={comandaID}
                onChange={(e) => setComandaID(e.target.value)}
            />
            <button onClick={handleFinalizarComanda}>Finalizar</button>
            <p>{message}</p>
        </div>
    );
};

export default FinalizarComanda;
