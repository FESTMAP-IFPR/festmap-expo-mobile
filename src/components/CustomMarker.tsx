import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';

interface CustomMarkerProps {
    evento: {
        latitude: number;
        longitude: number;
        imagem: string;
        titulo: string;
        inicio: string;
        fim: string;
        categoria: string;
        contato: string;
        descricao: string;
        classificacao: string;
    };
}

const CustomMarker = ({ evento }: CustomMarkerProps) => {
    return (
        <Marker 
            coordinate={{ latitude: evento.latitude, longitude: evento.longitude }}
            image={{uri: "https://picsum.photos/150"}}
        >
            <Callout style={styles.callout}>
                <View style={styles.calloutContent}>
                    <Text style={styles.title}>{evento.titulo}</Text>
                    <Text style={styles.label}>Data de Início:</Text>
                    <Text style={styles.text}>{evento.inicio}</Text>
                    <Text style={styles.label}>Data de Fim:</Text>
                    <Text style={styles.text}>{evento.fim}</Text>
                    <Text style={styles.label}>Categoria:</Text>
                    <Text style={styles.text}>{evento.categoria}</Text>
                    <Text style={styles.label}>Contato:</Text>
                    <Text style={styles.text}>{evento.contato}</Text>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text style={styles.text}>{evento.descricao}</Text>
                    <Text style={styles.label}>Classificação:</Text>
                    <Text style={styles.text}>{evento.classificacao}</Text>
                </View>
            </Callout>
        </Marker>
    );
};

const styles = StyleSheet.create({
    callout: {
        width: 250,
    },
    calloutContent: {
        flex: 1,
        marginLeft: 10,  
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    text: {
        fontSize: 14,
    },
});

export default CustomMarker;
