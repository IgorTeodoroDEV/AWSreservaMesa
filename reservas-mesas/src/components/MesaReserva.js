// src/components/MesaReserva.js
import React, { useState } from 'react';
import api from '../api';

const MesaReserva = () => {
    const [mesaID, setMesaID] = useState('');
    const [message, setMessage] = useState('');

    const handleReserva = async () => {
        try {
            const response = await api.post('/reservarMesa', {
                action: 'reservarMesa',
                mesaID: mesaID,
            });
            setMessage(response.data.body);
            console.error(response);
        } catch (error) {
            setMessage('Erro ao reservar mesa.');
        }
    };

    return (
        <div>
            <h2>Reservar Mesa</h2>
            <input
                type="text"
                placeholder="ID da mesa"
                value={mesaID}
                onChange={(e) => setMesaID(e.target.value)}
            />
            <button onClick={handleReserva}>Reservar</button>
            <p>{message}Teste</p>
        </div>
    );
};

export default MesaReserva;
