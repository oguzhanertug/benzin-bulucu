import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import React from 'react'
const istasyonlar = [
  {
    isim: "A istasyonu",
    adres: "x mahallesi",
    fiyat: 40,
    konum: { lat: 40.323, lng: 41.200 }
  },
  {
    isim: "B istasyonu",
    adres: "y mahallesi",
    fiyat: 39,
    konum: { lat: 41.500, lng: 42.300 }
  },
  {
    isim: "C istasyonu",
    adres: "z mahallesi",
    fiyat: 38,
    konum: { lat: 43.200, lng: 44.500 }
  },
]
function enUcuzuBul(istasyonlar) {
  let enUcuz = istasyonlar[0]

  for (let i = 0; i < istasyonlar.length; i++) {
    if (istasyonlar[i].fiyat < enUcuz.fiyat) {
      enUcuz = istasyonlar[i]
    }
  }

  return enUcuz
}
const Home = () => {
  let enUcuz = enUcuzuBul(istasyonlar)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benzin Bulucu</Text>
      <Text style={styles.subtitle}>En ucuz istasyonu hemen bul</Text>
      <Text style={styles.enUcuzBaslik}>🏆 En Ucuz İstasyon</Text>
<View style={styles.enUcuzKart}>
  <Text style={styles.kartIsim}>{enUcuz.isim}</Text>
  <Text>{enUcuz.adres}</Text>
  <Text>⛽ {enUcuz.fiyat} TL</Text>
</View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Başla</Text>
      </Pressable>
      <FlatList
  data={istasyonlar}
  keyExtractor={(item) => item.isim}
  renderItem={({ item }) => (
    <View style={styles.kart}>
      <Text style={styles.kartIsim}>{item.isim}</Text>
      <Text>{item.adres}</Text>
      <Text>⛽ {item.fiyat} TL</Text>
    </View>
  )}
/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
enUcuzBaslik: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#2ecc71',
  marginBottom: 8,
},
enUcuzKart: {
  backgroundColor: '#d5f5e3',
  padding: 15,
  borderRadius: 10,
  width: 300,
  marginBottom: 20,
},
})