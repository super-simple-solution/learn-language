import { IMessage } from "react-native-gifted-chat"

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

export interface CustomMessageProps {
  currentMessage: IMessage & { quickReplies?: QuickReplies }
}
