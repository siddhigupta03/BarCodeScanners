import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state={
            hasCamPermission: null,
            scanned: false,
            scannedData: '',
            buttonS: 'normal'
        }
    }
    getCameraPermission = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCamPermission: status === 'granted',
            buttonS: 'clicked'
        })
    }
    handleBarCodeScanned = async({type, data}) =>{
        this.setState({
            scanned: true,
            scannedData:data,
            buttonS: 'normal'
        })
    }
    render() {

        const hasCamPermission = this.state.hasCamPermission;
        const scanned = this.state.scanned;
        const buttonS = this.state.buttonS;

        if(buttonS==='clicked' && hasCamPermission) {
            return(
                <View>
                    <BarCodeScanner onBarCodeScanned={scanned?undefined: this.handleBarCodeScanned}/>
                    <Image source={require('../assets/qr.png')}/>
                </View>
            )
        }
        else if(buttonS === 'normal') {
            return(
                <View style={styles.container}> 
                    <Text style={{textAlign:'center', fontSize:15}}>{hasCamPermission === true ? this.state.scannedData: 'Request Camera Permissions'}</Text>
                    
                    <Image source={require('../assets/scanner.jpg')}
                    style={styles.img}
                      />
                      <Text style={styles.text}>Bar Code Scanner</Text>
    
                      <TouchableOpacity style={styles.b} onPress={this.getCameraPermission}>
                          <Text>Scan Code</Text>
                      </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles= StyleSheet.create({
    container:{
        flex:-1
    },
    img:{
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        margin:30
    },
    text:{
        textDecorationLine:'underline',
        fontSize:20,
        padding:20,
        alignItems:'center'
    },
    b:{
        alignSelf:'center',
        padding:10,
        margin:20,
        borderWidth:2,
        borderRadius:100,
        fontWeight:'bold',
        backfaceVisibility:'visible',
        backgroundColor:'#33ff0a'
    }
})