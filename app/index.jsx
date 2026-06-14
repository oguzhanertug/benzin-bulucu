import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benzin Bulucu</Text>
      <Text style={styles.subtitle}>En ucuz istasyonu hemen bul</Text>
      <Pressable style={styles.button} onPress={() => router.push('/giris')}>
        <Text style={styles.buttonText}>Başla</Text>
      </Pressable>
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
})