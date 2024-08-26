import {
  FileImage,
  Mic,
  Paperclip,
  X
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/app/data";
import { useWhisper } from '@chengsokdara/use-whisper'

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.OPENAI_API_TOKEN, // YOUR_OPEN_AI_TOKEN
    whisperConfig: {
      language: 'en',
    },
  })

  const handleMic = () => {
    startRecording()
    // const newMessage: Message = {
    //   id: message.length + 1,
    //   name: loggedInUserData.name,
    //   avatar: loggedInUserData.avatar,
    //   message: "12331231",
    // };
    // sendMessage(newMessage);
    // setMessage("");
  };
  const handleCancle = () => {}
  const handleFinish = () => {
    console.log(speaking, 36346436)
  }
  
  return (
    <div className="p-2 flex justify-between w-full items-center">
      <Link
        href="#"
        className={cn(
          "h-9 w-9",
          "bg-red-400 rounded-full text-white flex justify-center items-center"
        )}
        onClick={handleCancle}
      >
        <X size={20} className="text-muted-foreground" />
      </Link>
      <Link
        href="#"
        className={cn(
          "h-9 w-9",
          "text-white flex justify-center items-center bg-yellow-400 rounded-full",
        )}
        onClick={handleMic}
      >
        <Mic size={20} className="text-muted-foreground" />
      </Link>
      <Link
        href="#"
        className={cn(
          "h-9 w-9",
          "text-white flex justify-center items-center bg-green-400 rounded-full",
        )}
        onClick={handleFinish}
      >
        完成
      </Link>
    </div>
  );
}
