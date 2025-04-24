import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎴 MemoryPerson</Text>
      <Text style={styles.subtitle}>Escolha um modo de jogo</Text>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('/anime')}>
          <Image source={require('@/assets/images/anime.jpg')} style={styles.icon} />
          <Text style={styles.optionText}>Anime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/games')}>
          <Image source={require('@/assets/images/jogos.png')} style={styles.icon} />
          <Text style={styles.optionText}>Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/cartoons')}>
          <Image source={require('@/assets/images/desenhos.png')} style={styles.icon} />
          <Text style={styles.optionText}>Desenhos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fdf6f0', alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontSize: 32, fontWeight: 'bold', color: '#333',
  },
  subtitle: {
    fontSize: 18, marginBottom: 40, color: '#666',
  },
  options: {
    width: '90%', alignItems: 'center',
  },
  option: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  icon: {
    width: 150, height:100, marginBottom: 10, resizeMode: 'contain',
  },
  optionText: {
    fontSize: 20, fontWeight: '600',
  },
});
