import React, { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Languages, Star, Volume2, AudioLines, Play, GraduationCap, Lightbulb, MessageSquareDiff, Loader } from 'lucide-react-native'
import { GiftedChat } from 'react-native-gifted-chat'

interface Reply {
  title: string
  value: string
  messageId?: number | string
}

interface QuickReplies {
  type: 'radio' | 'checkbox'
  values: Reply[]
  keepIt?: boolean
}

const CustomMessage = (props: any) => {
  const { currentMessage } = props

  return (
    <View style={styles.bubbleContainer}>
      {/* 1. Main message content */}
      <View style={styles.mainMessage}>
        <Text style={styles.messageText}>{currentMessage.text}</Text>
      </View>

      {/* 2. Action buttons (translate, example, etc.) */}
      <View className="flex-row justify-end">
        <TouchableOpacity>
          <Text style={styles.actionButton}>
            <Languages className="text-foreground" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionButton}>
            <Star className="text-foreground" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionButton}>
            <Volume2 className="text-foreground" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. Additional example content */}
      <View style={styles.exampleContainer}>
        {
          currentMessage.quickReplies?.values.map((reply: Reply, index: number) => (
            <TouchableOpacity>
              <Text key={index} className="text-blue-400">例句: {reply.title}: {reply.value}</Text>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity>
          <Text style={styles.actionButton}>
            <Volume2 className="text-foreground" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const RenderInputToolbar = (props: any) => {
  return (
    <View style={styles.sendContainer}>
      {/* Top row with language selector and other options */}
      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.optionButton}>
          <Lightbulb />
          <Text>选场景</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <MessageSquareDiff />
          <Text>换话题</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <GraduationCap />
          <Text>词汇难度</Text>
        </TouchableOpacity>
      </View>

      {/* Main send button (green button) */}
      <View style={styles.sendRow}>
        <TouchableOpacity style={styles.sendButton}>
          <View>
            <AudioLines /><Text style={styles.sendText}>点击说话</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Play />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CustomFooter = (props: any) => {
  return <Loader {...props} />
}

export default function App() {
  const [messages, setMessages] = React.useState([
    {
      _id: 2,
      text: 'Yes, I eat apples every day. They are my favorite fruit!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'User',
      },
    },
    {
      _id: 1,
      system: true,
      text: 'Yum, peaches are delicious! Do you like to eat fruits every day?',
      example: 'Yes, I try to eat fruits every day for a healthy diet.',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: [
          {
            title: '😋 Yes',
            value: 'yes',
          },
          {
            title: '📷 Yes, let me show you with a picture!',
            value: 'yes_picture',
          },
          {
            title: '😞 Nope. What?',
            value: 'no',
          },
        ],
      },
      user: {
        _id: 1,
        name: 'System',
      },
    },
  ])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
      renderMessage={(props) => <CustomMessage {...props} />}
      renderInputToolbar={(props) => <RenderInputToolbar {...props} />}
      renderFooter={(props) => <CustomFooter {...props} />}
    />
  )
}

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  mainMessage: {
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  actionButton: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  exampleContainer: {
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleText: {
    fontSize: 14,
    color: '#555',
  },

  sendContainer: {
    padding: 10,
    backgroundColor: '#f0f4f7',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  sendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#a4eb34',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
  },
})
