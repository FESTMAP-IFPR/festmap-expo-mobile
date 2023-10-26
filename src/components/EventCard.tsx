import { Text,  StyleSheet, View } from "react-native"
import { Card } from "react-native-paper"

export const EventCard = (props: {event: any}) => {
    return (
        <View>
            <Card style={styles.card} mode="outlined">
            <Card.Cover source={{ uri: 'https://picsum.photos/701' }} />
            <Card.Title 
            title={<Text style={{ color: 'white' }} > Title Event </Text>}/>
             <Card.Content>
                <Text style={{ color: 'white'}}>
                {props.event.name}
                Card do Evento
                </Text>
             </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
    textDecorationColor: 'white',
    marginVertical: 10,
    // height: 100,
    // width: '100%',
    // backgroundColor: '#f18484',
    // justifyContent: 'center' Centered vertically
    // alignItems: 'center', Centered horizontally
  },
})