import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CenterScrollers = () => {
  return (
    <View style={styles.Container}>

      <TouchableOpacity style={styles.Coin}>
          <Image 
            source={require('../assets/images/ethereum.png')}
            style={{width: 35, height: 35}}
          />
          <View style={styles.CoinText}>
            <Text style={{color: '#fff', fontSize: 20}}>Ethereum</Text>
            <Text style={{color: '#fff'}}>0 ETH</Text>
          </View>

      </TouchableOpacity>


      <View style={styles.Coin}>
        <Image 
          source={require('../assets/images/bitcoin.png')}
          style={{width: 35, height: 35}}
        />
        <View style={styles.CoinText}>
          <Text style={{color: '#fff', fontSize: 20}}>Wrapped Bitcoin</Text>
          <Text style={{color: '#fff'}}>0 BTC</Text>
        </View>
      </View>

      <View style={styles.Coin}>
        <Image 
          source={require('../assets/images/polygon.png')}
          style={{width: 35, height: 35}}
        />
        <View style={styles.CoinText}>
          <Text style={{color: '#fff', fontSize: 20}}>Polygon</Text>
          <Text style={{color: '#fff'}}>0 MATIC</Text>
        </View>
      </View>

      <View style={styles.Coin}>
        <Image 
          source={require('../assets/images/ethereum.png')}
          style={{width: 35, height: 35}}
        />
        <View style={styles.CoinText}>
          <Text style={{color: '#fff', fontSize: 20}}>Ethereum</Text>
          <Text style={{color: '#fff'}}>0 ETH</Text>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', top: 20}}>
        <Text style={{color: '#fff', fontSize: 20}}>Manage Tokens</Text>
      </View>
    </View>
  )
}

export default CenterScrollers

const styles = StyleSheet.create({
  Container: {
    width: '100%',

  },
  Coin: {
    // display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'rgba(52, 52, 52, 3)',
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  CoinText: {
    marginLeft: 5,
  }
})