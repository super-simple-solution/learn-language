import { IMessage } from "react-native-gifted-chat";

export const chatList:IMessage[] = [{
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
  text: 'Yum, peaches are delicious! Do you like to eat fruits every day? Do you like to eat fruits every day? Do you like to eat fruits every day?',
  createdAt: new Date(),
  quickReplies: {
    type: 'radio',
    keepIt: true,
    values: [
      { title: '📷 Yes, let me show you with a picture picture  picture picture! let me show you with a picture picture  picture picture!', value: 'yes_picture' },
    ],
  },
  user: { _id: 1, name: 'System' },
}, {
  _id: 3,
  system: false,
  text: 'Yum, peaches are delicious! Do you like to eat fruits every day? Do you like to eat fruits every day? Do you like to eat fruits every day?',
  createdAt: new Date(),
  quickReplies: {
    type: 'radio',
    keepIt: true,
    values: [
      { title: '📷 Yes, let me show you with a picture picture  picture picture! let me show you with a picture picture  picture picture!', value: 'yes_picture' },
    ],
  },
  user: { _id: 1, name: 'System' },
}]
