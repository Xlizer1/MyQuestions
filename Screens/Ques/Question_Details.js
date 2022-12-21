import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header'
import { ScrollView } from 'react-native-gesture-handler';

export default function Question_Details({ route }) {
    const item = route.params.item;

    return (
    <ImageBackground source={require('../../assets/Bg.png')} style={"flex:1"}>
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.content}>
                <View style={styles.element}>
                    <Text style={styles.header}>السؤال :</Text>
                </View>
                <View style={styles.element}>
                    <Text style={{ textAlign: 'right', color: '#f5f5f5', fontSize: 16, fontWeight: 'bold' }}>{ item.title }</Text>
                </View>
                <View style={ styles.border }></View>
                <View style={styles.element}>
                    <Text style={styles.header}>الاجابة :</Text>
                </View>
                <View style={styles.element}>
                    <Text style={{ textAlign: 'right', color: '#f5f5f5' }}>{ item.answer }</Text>
                </View>
                <View style={ styles.border }></View>
                <View style={styles.element}>
                    {item.youtubeLink ?<TouchableOpacity style={ styles.button }><Text style={{ fontSize: 18, fontWeight: 'bold'}}>شاهد شرح السؤال</Text></TouchableOpacity> : <></>}
                </View>
            </ScrollView>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      alignItems:'center',
      paddingTop:50,
    },
    content: {
        padding: 30,
        width: '100%'
    },
    header:{
        textAlign: 'right',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f5f5f5',
        marginTop: 10,
    }, 
    element: {
      paddingBottom: 10,
      marginBottom: 10
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#f5f5f5',
        padding: 5,
        marginBottom: 20,
        borderStyle: 'dashed'
    },
    button:{
        backgroundColor: '#f5f5f5',
        width: 140,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    }
})