import React from 'react';
import { Button, View, Image } from 'react-native';

const Chat = () => {
  return (
    <View>
      <View className="flex-1 bg-gray-100">

        {/* 面试问题部分 */}
        <View className="bg-white p-4 rounded-lg flex">
          <View className="text-base">
            Hello, I’m your interviewer now. Could you please introduce yourself briefly first?
          </View>
          <Image source={require('@/assets/chat/voice.svg')} />
        </View>

        {/* 语音图标 */}
        <View className="flex-row justify-end items-center mt-2">
          {/* <Image
            source={{ uri: 'your-audio-icon-uri-here' }}
            className="w-6 h-6"
          /> */}
        </View>

        {/* 用户回答部分 */}
        <View className="bg-green-100 p-4 rounded-lg mt-4">
          <View className="text-lg text-black">front end</View>
        </View>

        {/* AI 图标和操作 */}
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row">
            {/* <Image
              source={{ uri: 'your-ai-icon-uri-here' }}
              className="w-6 h-6"
            /> */}
            <View className="text-sm text-black ml-2">拓展润色</View>
          </View>
          <Button title="AI" onPress={() => console.log('AI Pressed')} />
        </View>

        {/* 系统反馈部分 */}
        <View className="flex-row justify-between items-center mt-4">
          <View>
            <View className="text-sm text-green-600">语法正确 ✅</View>
            <View className="text-sm text-yellow-600">地道100分 🌟</View>
          </View>
          <View className="text-sm text-gray-500">更多语境</View>
        </View>

        {/* 系统响应部分 */}
        <View className="bg-white p-4 rounded-lg mt-4">
          <View className="text-lg">
            "Front end" usually refers to the part of a website or application that users interact with directly. Like the design, layout, and user interface. Why do you mention "front end"?
          </View>
        </View>

        {/* 语音图标 */}
        <View className="flex-row justify-end items-center mt-2">
          {/* <Image
            source={{ uri: 'your-audio-icon-uri-here' }}
            className="w-6 h-6"
          /> */}
        </View>
      </View>
      <View className="flex justify-between items-center flex-row">
        <View className="text-gray-500">通话</View>
        <View className="text-gray-500">按住说话</View>
        <View className="text-gray-500">翻译</View>
      </View>
    </View>
  );
};

export default Chat;
