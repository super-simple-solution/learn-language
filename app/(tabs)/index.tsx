import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native'
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS
} from 'expo-av'

import { Mic, Loader } from 'lucide-react-native'

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice'

enum Status {
  IDLE = 0,
  STARTED,
  PROCESSING,
  ENDED
}

const audioConfig = {
  shouldCorrectPitch: true,
  volume: 1.0,
  rate: 1.0,
}

export default function Index() {
  const [status, setStatus] = useState(Status.IDLE)
  const [results, setResults] = useState<string[]>([''])

  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState<Audio.Sound | null>(null)

  Voice.onSpeechStart = onSpeechStart
  Voice.onSpeechEnd = onSpeechEnd
  Voice.onSpeechError = onSpeechError
  Voice.onSpeechResults = onSpeechResults

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false
    })
  })

  useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound")
        setIsPlaying(false)
        sound.unloadAsync()
        setSound(null)
      }
      : undefined
  }, [sound])

  async function playSound() {
    const time = Date.now()
    console.log('Loading Sound', time)
    const { sound } = await Audio.Sound.createAsync({
      uri: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-US-Ava-Conversation_with_interjections-Audio.wav'
      // uri: 'https://lv-sycdn.kuwo.cn/33097b9f5beff5ff711fedd880deb694/66dfc7b1/resource/30106/trackmedia/M800001DZgUf2NfnXZ.mp3'
    }, { ...audioConfig })
    setSound(sound)

    console.log('Playing Sound', Date.now() - time)
    sound.playAsync().then((res) => {
      console.log(res, 'play end', Date.now() - time)
    })
    console.log('End Sound')
  }

  function reset() {
    setResults([''])
    setStatus(Status.IDLE)
  }

  function onSpeechStart() {
    console.log('onSpeechStart: ')
    setStatus(Status.STARTED)
  }

  function onSpeechEnd() {
    console.log('onSpeechEnd: ')
    setStatus(Status.ENDED)
  }

  function onSpeechError(e: SpeechErrorEvent) {
    console.log('onSpeechError: ', e)
    setStatus(Status.IDLE)
  }

  function onSpeechRecognized(e: SpeechRecognizedEvent) {
    console.log('SpeechRecognizedEvent: ', e)
    setStatus(Status.PROCESSING)
  }

  function onSpeechResults(e: SpeechResultsEvent) {
    if (!e.value) return
    console.log('onSpeechResults: ', e.value)
    setResults(e.value)
  }

  const _startRecognizing = async () => {
    if (!Voice.isAvailable() || status !== Status.IDLE) return
    reset()

    try {
      await Voice.start('en-US')
    } catch (e) {
      console.error(e)
    }
  }

  const _stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      console.error(e)
    }
    reset()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Status: ${status}`}</Text>
      <Text style={styles.stat}>Results:</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.stat}>
            {result}
          </Text>
        )
      })}
      <TouchableHighlight onPress={_startRecognizing}>
        {
          status === Status.IDLE ? <Mic fill="red" /> : <Loader fill="red" />
        }
      </TouchableHighlight>
      <Button title="Play" onPress={playSound} />
      <TouchableHighlight onPress={_stopRecognizing}>
        <Text style={styles.action}>Stop Recognizing</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_cancelRecognizing}>
        <Text style={styles.action}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={_destroyRecognizer}>
        <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
})
