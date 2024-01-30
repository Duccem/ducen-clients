import { Pressable, StyleSheet } from "react-native";
import { Facebook } from "./icons/facebook";
import { Google } from "./icons/google";
import { XIcon } from "./icons/x";

const icons: any  = {
  google: (size: number) =>  <Google size={size}/>,
  facebook: (size: number) => <Facebook size={size}/>,
  x: (size: number) => <XIcon size={size}/>
}

export function SocialButton({ icon }: { icon: string }) {
  const iconToUse: any = icons[icon] ? icons[icon] : icons['google']
  return (
    <Pressable style={({pressed}) => [
      styles.box,
      {
        borderColor: pressed ? '#000' : '#E5E5E5',
      }
    ]}>
      {iconToUse(30)}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})
