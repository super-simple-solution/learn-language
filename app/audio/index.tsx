import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native'
import { Languages, Star, Volume2, AudioLines, Play, GraduationCap, Lightbulb, MessageSquareDiff, Loader, SparkleIcon, ChevronDown, ChevronUp, Eye, Check, ChevronRight, X } from 'lucide-react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { styles } from './styles'
import { CustomMessageProps } from './interface'
import { chatList } from './const'
import { DottedLine } from './dottedLine'
import { EyeClosed } from 'phosphor-react-native'
import OptimizationModalContent from './optimizationModalContent'

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
  const [modalVisible, setModalVisible] = useState(false)

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
            <View>
              <Text>555555</Text>
            </View>
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
      {
        !currentMessage.system && (
          <View className='flex-row justify-end'>
            <View className='flex-row items-center gap-2 border border-gray-200 rounded-full py-1 px-4 mt-[-10px]'>
              <View>
                <View className='flex-row gap-1 items-center'>
                  <Text className='text-lime-500 text-sm'>语法正确</Text>
                  <Check color={"#84cc16"} size={15} />
                </View>
                <Text className='text-gray-400 text-xs'>太棒了</Text>
              </View>
              <View className='w-[1px] h-4 bg-gray-200'></View>
              <View>
                <View className='flex-row gap-1 items-center'>
                  <Text className='text-lime-500 text-sm'>发音62</Text>
                </View>
                <View className='flex-row'>
                  <Text className='text-gray-400 text-xs'>优化发音</Text>
                  <ChevronRight color={"#9ca3af"} size={15} />
                </View>
              </View>
              <View className='w-[1px] h-4 bg-gray-200'></View>
              <Pressable onPress={() => setModalVisible(true)}>
                <View className='flex-row gap-1 items-center'>
                  <Text className='text-lime-500 text-sm'>地道s62</Text>
                </View>
                <View className='flex-row'>
                  <Text className='text-gray-400 text-xs'>优化表达</Text>
                  <ChevronRight color={"#9ca3af"} size={15} />
                </View>
              </Pressable>
            </View>
          </View>
        )
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <OptimizationModalContent setModalVisible={setModalVisible}></OptimizationModalContent>
      </Modal>
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
