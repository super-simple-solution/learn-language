import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { Languages, Star, Volume2, AudioLines, Play, GraduationCap, Lightbulb, MessageSquareDiff, Loader, SparkleIcon, ChevronDown, ChevronUp, Eye } from 'lucide-react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { styles } from './styles'
import { CustomMessageProps } from './interface'
import { chatList } from './const'
import { DottedLine } from './dottedLine'
import { EyeClosed } from 'phosphor-react-native'

const ActionButton = ({ icon: Icon }: { icon: any }) => (
  <TouchableOpacity>
    <Text style={styles.actionButton}>
      <Icon className="text-foreground" size={20} />
    </Text>
  </TouchableOpacity>
)

const CustomMessage: React.FC<CustomMessageProps> = ({ currentMessage }) => {
  const [isPoblish, setIsPoblish] = useState(false)
  const [isTip, setIsTip] = useState(false)
  const [isBlur, setIsBlur] = useState(true)

  const togglePoblish = () => setIsPoblish((prev) => !prev)
  const toggleTip = () => setIsTip((prev) => !prev)
  const toggleBlur = () => setIsBlur((prev) => !prev)

  return (
    <View style={styles.bubble}>
      <View style={[currentMessage.system ? styles.systemContainer : styles.userContainer, styles.bubbleContainer]}>
        {/* 1. Main message content */}
        <View style={styles.mainMessage} className={isBlur && currentMessage.system ? 'blur-sm' : ''}>
          <Text style={styles.messageText}>{currentMessage.text}</Text>
          <ActionButton icon={Volume2} />
        </View>

        {/* 2. Action buttons (translate, example, etc.) */}
        <View style={styles.actionButtonContainer}>
          <ActionButton icon={Languages} />
          {currentMessage.system ? (
            <View className='flex items-center flex-row gap-1'>
              <ActionButton icon={Star} />
              <Pressable onPress={toggleBlur} className='flex items-center flex-row gap-1'>
                {isBlur ? <Eye size={20} /> : <EyeClosed size={20} />}
              </Pressable>
              <Pressable onPress={toggleTip} className='flex items-center flex-row gap-1'>
                <Lightbulb size={20} fill={isTip ? "#84cc16" : "none"} stroke={isTip ? "#84cc16" : "#000"} />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={togglePoblish} className='flex items-center flex-row gap-1'>
              <SparkleIcon size={20} fill={"#84cc16"} stroke={"#84cc16"} />
              <Text>拓展润色</Text>
              {isPoblish ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </Pressable>
          )}
        </View>

        {isPoblish && (
          <View>
            <View className='my-5 overflow-hidden'>
              <DottedLine></DottedLine>
            </View>
            <View>555555</View>
          </View>
        )}

        {isTip && (
          <View>
            <View className='my-5 overflow-hidden'>
              <DottedLine></DottedLine>
            </View>
            <View className='flex-row justify-between items-center'>
              <View style={{ flex: 1 }}>
                <Text className='text-sm text-gray-500'>例句: Tailwind includes an expertly-crafted default color palette out-of-the-box that is a great starting point if you don’t have your own specific branding in mind.</Text>
              </View>
              <ActionButton icon={Volume2} />
            </View>
          </View>
        )}
      </View>
    </View >
  )
}

const RenderInputToolbar: React.FC<any> = (props) => {
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
            <AudioLines />
            <Text style={styles.sendText}>点击说话</Text>
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

export default function AudioChat() {
  const [messages, setMessages] = React.useState<IMessage[]>(chatList)

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
      renderMessage={(props) => <CustomMessage {...props} />}
      renderInputToolbar={(props) => <RenderInputToolbar {...props} />}
    // renderFooter={(props) => <CustomFooter {...props} />}
    />
  )
}
