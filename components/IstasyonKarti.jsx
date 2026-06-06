import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const IstasyonKarti = ({ isim, adres, fiyat, onSil }) => {
  return (
    <View style={styles.kart}>
      <Text style={styles.kartIsim}>{isim}</Text>
      <Text>{adres}</Text>
      <Text>⛽ {fiyat} TL</Text>
      <Pressable onPress={onSil}>
        <Text style={{ color: 'red' }}>Sil</Text>
      </Pressable>
    </View>
  )
}

export default IstasyonKarti

const styles = StyleSheet.create({
  kart: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: 300,
  },
  kartIsim: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})