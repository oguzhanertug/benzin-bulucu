import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'expo-router'

const Giris = () => {
  const [email, setEmail] = useState("")
  const [sifre, setSifre] = useState("")
  const router = useRouter()

  async function girisYap() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: sifre,
    })

    if (error) {
      Alert.alert("Hata", error.message)
      return
    }

    router.push('/istasyonlar')
  }

  async function kayitOl() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: sifre,
    })

    if (error) {
      Alert.alert("Hata", error.message)
      return
    }

    Alert.alert("Başarılı", "Kayıt oldun! Şimdi giriş yapabilirsin.")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={sifre}
        onChangeText={setSifre}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={girisYap}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: '#3498db' }]} onPress={kayitOl}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>
    </View>
  )
}

export default Giris

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    width: 300,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})