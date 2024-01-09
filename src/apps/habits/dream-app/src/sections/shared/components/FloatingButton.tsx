import { Pressable } from "react-native"

export const FloatingButton = ({ children, onPress }: any) => {
  return (
    <Pressable onPress={onPress} 
      style={
        ({pressed}) => [
          {
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderStyle: 'solid'
          },
          {
            borderColor: pressed ? '#6C63FF' : '#fff',
          }
        ]
      }
    >
        {children}
    </Pressable>
  )
}