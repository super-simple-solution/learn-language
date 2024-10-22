import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { X } from 'lucide-react-native'
import { DottedLine } from './dottedLine'
import { tipList } from './const'

interface OptimizationModalContentProps {
  setModalVisible: (visible: boolean) => void
}

const OptimizationModalContent: React.FC<OptimizationModalContentProps> = ({ setModalVisible }) => {
  return (
    <View className='w-screen flex-1 justify-end'>
      <View className='bg-zinc-100 rounded-t-3xl p-6 shadow'>
        <View className='flex-row justify-between items-center mb-5'>
          <Text className=''>发音逐词分析</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <View className='w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center'>
              <X size={12} color={"#000"} />
            </View>
          </Pressable>
        </View>

        <View className='bg-white p-2 rounded-xl'>
          <View className='flex-row items-center gap-4'>
            {tipList.map((item, index) => (
              <View className='flex-row items-center gap-1' key={index}>
                <View className='w-2 h-2 rounded-full border' style={{ borderColor: item.color }}></View>
                <Text className='text-gray-300 text-xs'>{item.text}</Text>
              </View>
            ))}
          </View>

          <View className='mt-4 text-slate-800'>
            It's good
          </View>

          <View className='mt-6 overflow-hidden'>
            <DottedLine />
          </View>
        </View>
      </View>
    </View>
  )
}

export default OptimizationModalContent
