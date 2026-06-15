import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

function mockAiOneri(istasyonAdi) {
  const oneriler = [
    {
      sarjSuresi: "30 dakika",
      oneri: `${istasyonAdi} yoğun saatlerde beklemeye değer, fiyatı uygun.`,
      uygunlukPuani: 8
    },
    {
      sarjSuresi: "45 dakika",
      oneri: `${istasyonAdi}'a giderken yakıt seviyeni kontrol et.`,
      uygunlukPuani: 6
    },
    {
      sarjSuresi: "20 dakika",
      oneri: `${istasyonAdi} hızlı şarj imkanı sunuyor.`,
      uygunlukPuani: 9
    },
  ]
  return oneriler[Math.floor(Math.random() * oneriler.length)]
}

const AiOneri = () => {
  const [oneri, setOneri] = useState(null)

  async function oneriAlVeKaydet() {
    const sonuc = mockAiOneri("A istasyonu")
    setOneri(sonuc)

    const { error } = await supabase
      .from('ai_oneriler')
      .insert({
        istasyon_adi: "A istasyonu",
        sarj_suresi: sonuc.sarjSuresi,
        oneri: sonuc.oneri,
        uygunluk_puani: sonuc.uygunlukPuani
      })

    if (error) {
      console.log('Hata:', error)
      Alert.alert("Hata", "Kaydedilemedi: " + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI Önerisi</Text>

      <Pressable style={styles.button} onPress={oneriAlVeKaydet}>
        <Text style={styles.buttonText}>Öneri Al</Text>
      </Pressable>

      {oneri && (
        <View style={styles.kart}>
          <Text style={styles.kartBaslik}>⏱️ Şarj Süresi: {oneri.sarjSuresi}</Text>
          <Text style={styles.kartBaslik}>⭐ Uygunluk: {oneri.uygunlukPuani}/10</Text>
          <Text style={{ marginTop: 8 }}>{oneri.oneri}</Text>
        </View>
      )}
    </View>
  )
}

export default AiOneri

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  kart: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  kartBaslik: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
})