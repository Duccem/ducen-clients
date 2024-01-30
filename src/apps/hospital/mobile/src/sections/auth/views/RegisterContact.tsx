import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { Back } from "../../shared/components/Back"
import { Button } from "../../shared/components/Button"
import { HelpBanner } from "../../shared/components/HelpBanner"
import { InputText } from "../../shared/components/InputText"

export function RegisterContact() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: 10,
          paddingHorizontal: '5%',
        }}>
          <Back/>
          <Text style={styles.title}>Ducen</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 10, paddingHorizontal: '5%' }}>
          <Text style={styles.subtitle}>Tu dirección</Text>
          <Text style={{ fontFamily: 'Nunito_500Medium' }}>Datos usados para tu contacto</Text>
        </View>
        <View style={{ width: '100%', gap: 25 }}>
          <InputText placeholder={'Phone'}/>
          <InputText placeholder={'Country'}/>
          <InputText placeholder={'City'}/>
          <InputText placeholder={'Street'}/>
          <InputText placeholder={'Zip Code'}/>
          <Button text='Siguiente' icon={<FontAwesomeIcon icon={faAngleRight} color={'#000'} size={30}/>} onPress={() => navigation.navigate('register-credentials' as never)}></Button>
        </View>
        <HelpBanner/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  title: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 25,
    fontFamily: 'Nunito_700Bold',
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 40,
  },
})
