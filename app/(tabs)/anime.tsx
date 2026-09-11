import { View, Text, TouchableOpacity, Platform, Image, StyleSheet, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';


type Card = {
  id: number;
  name: string;
  image: any; // você pode usar ImageSourcePropType se preferir
  uuid: string;
  flipped: boolean;
  matched: boolean;
};
const characters: Omit<Card, 'uuid' | 'flipped' | 'matched'>[] = [
  { id: 1, name: '01', image: require('../../assets/images/anime/01.png') },
  { id: 2, name: '02', image: require('../../assets/images/anime/02.png') },
  { id: 3, name: '03', image: require('../../assets/images/anime/03.png') },
  { id: 4, name: '04', image: require('../../assets/images/anime/04.png') },
  { id: 5, name: '05', image: require('../../assets/images/anime/05.png') },
  { id: 6, name: '06', image: require('../../assets/images/anime/06.png') },
  { id: 7, name: '07', image: require('../../assets/images/anime/07.png') },
  { id: 8, name: '08', image: require('../../assets/images/anime/08.png') },
]


const generateDeck = (): Card[] => {
  const duplicated = [...characters, ...characters];
  return duplicated
    .map(card => ({
      ...card,
      uuid: Math.random().toString(),
      flipped: false,
      matched: false
    }))
    .sort(() => Math.random() - 0.5);
};

export default function AnimeScreen() {
  const [deck, setDeck] = useState<Card[]>(generateDeck());
  const [selected, setSelected] = useState<Card[]>([]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (first.id === second.id) {
        setDeck(prev =>
          prev.map(card =>
            card.id === first.id ? { ...card, matched: true } : card
          )
        );
        setSelected([]);
      } else {
        setTimeout(() => {
          setDeck(prev =>
            prev.map(card =>
              card.uuid === first.uuid || card.uuid === second.uuid
                ? { ...card, flipped: false }
                : card
            )
          );
          setSelected([]);
        }, 1000);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (deck.every(card => card.matched)) {
      Alert.alert("Parabéns!", "Você venceu o jogo!", [
        { text: "Reiniciar", onPress: () => restartGame() }
      ]);
    }
  }, [deck]);

  const flipCard = (card: Card) => {
    if (selected.length === 2 || card.flipped || card.matched) return;

    setDeck(prev =>
      prev.map(c =>
        c.uuid === card.uuid ? { ...c, flipped: true } : c
      )
    );
    setSelected(prev => [...prev, card]);
  };

  const restartGame = () => {
    setDeck(generateDeck());
    setSelected([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Jogo da Memória</Text>
      <View style={styles.board}>
        {deck.map(card => (
          <TouchableOpacity
            key={card.uuid}
            onPress={() => flipCard(card)}
            style={styles.card}
          >
            {card.flipped || card.matched ? (
              <Image source={card.image} style={styles.image} />
            ) : (
              <View style={styles.cardBack} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center',
  },
  title: {
    fontSize: 28, fontWeight: 'bold', marginVertical: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100, height: 100, margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'contain', // <-- Adicione isso aqui
  },
  cardBack: {
    backgroundColor: '#aaa',
    width: '100%', height: '100%', borderRadius: 8,
  }
});