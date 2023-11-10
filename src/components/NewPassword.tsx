import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Clipboard } from 'react-native';

export const NewPassword = () => {
    const [frase, setFrase] = useState("");
    const [mostrarFrase, setMostrarFrase] = useState(false);

    const copiarFrase = async () => {
        await Clipboard.setString(frase);
        setMostrarFrase(false); // Esconde a frase após a cópia
    };

    const handleMostrarFrase = () => {
        const fraseExemplo = "Sua frase para copiar";
        setFrase(fraseExemplo);
        setMostrarFrase(true);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleMostrarFrase}>
                <Text>Abrir Frase</Text>
            </TouchableOpacity>

            {mostrarFrase && (
                <View style={{ backgroundColor: 'white', padding: 20, marginTop: 20 }}>
                    <Text>{frase}</Text>
                    <TouchableOpacity onPress={copiarFrase}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>Copiar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMostrarFrase(false)}>
                        <Text style={{ color: 'red', marginTop: 10 }}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
