import { View } from "react-native"
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  dottedLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotted: {
    width: 5,          // 虚线点的宽度
    height: 1,        // 虚线点的高度
    backgroundColor: '#d9d9d9',
    marginHorizontal: 2, // 虚线点之间的间隔
  },
})

export const DottedLine = () => {
  return (
    <View style={styles.dottedLineContainer}>
      {Array.from({ length: 100 }).map((_, index) => (
        <View key={index} style={styles.dotted} />
      ))}
    </View>
  )
}
