import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#ececec',
    width: '100%',
    paddingHorizontal: 20,
  },
  bubbleContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: '#d9f99d',
  },
  systemContainer: {
    backgroundColor: '#fff' ,
  },
  mainMessage: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionButton: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  horizontalDottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    borderStyle: 'dotted',  // 设置边框样式为虚线
    marginVertical: 10,      // 添加上下间距
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
