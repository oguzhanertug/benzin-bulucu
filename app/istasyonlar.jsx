import { supabase } from '../lib/supabase'
import IstasyonKarti from '../components/IstasyonKarti'
import { StyleSheet, Text, View, FlatList, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

const istasyonlarData = [
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

function enUcuzuBul(liste) {
  if (liste.length === 0) return null
  let enUcuz = liste[0]
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].fiyat < enUcuz.fiyat) {
      enUcuz = liste[i]
    }
  }
  return enUcuz
}

const Istasyonlar = () => {
  const [yeniIsim, setYeniIsim] = useState("")
  const [liste, setListe] = useState(istasyonlarData)
  let enUcuz = enUcuzuBul(liste)

  useEffect(() => {
  istasyonlariGetir()
}, [])

async function istasyonlariGetir() {
  const { data, error } = await supabase
    .from('istasyonlar')
    .select('*')
  
  if (error) {
    console.log('Hata:', error)
    return
  }

  setListe(data)
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İstasyonlar</Text>

      <Text style={styles.enUcuzBaslik}>🏆 En Ucuz İstasyon</Text>
      {enUcuz && (
        <View style={styles.enUcuzKart}>
          <Text style={styles.kartIsim}>{enUcuz.isim}</Text>
          <Text>{enUcuz.adres}</Text>
          <Text>⛽ {enUcuz.fiyat} TL</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Yeni istasyon adı"
        value={yeniIsim}
        onChangeText={(text) => setYeniIsim(text)}
      />
      <Pressable style={styles.button} onPress={() => {
        const yeniIstasyon = {
          isim: yeniIsim,
          adres: "Yeni adres",
          fiyat: 35,
          konum: { lat: 0, lng: 0 }
        }
        setListe([...liste, yeniIstasyon])
        setYeniIsim("")
      }}>
        <Text style={styles.buttonText}>İstasyon Ekle</Text>
      </Pressable>

      {liste.length === 0 && (
        <Text style={{ color: '#999', marginVertical: 20 }}>
          Henüz istasyon yok.
        </Text>
      )}

      <FlatList
        data={liste}
        keyExtractor={(item) => item.isim}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
  <IstasyonKarti
    isim={item.isim}
    adres={item.adres}
    fiyat={item.fiyat}
    onSil={() => setListe(liste.filter((i) => i.isim !== item.isim))}
  />
)}
      />
    </View>
  )
}

export default Istasyonlar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})