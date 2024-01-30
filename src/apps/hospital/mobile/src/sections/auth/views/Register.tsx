import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Back } from "../../shared/components/Back"
import { Button } from "../../shared/components/Button"
import { InputDate } from "../../shared/components/InputDate"
import { InputSelect } from "../../shared/components/InputSelect"
import { InputText } from "../../shared/components/InputText"
import useForm from "../../shared/hooks/useForm"
import { required } from "../../shared/validators/required"
const genders = ['MALE', 'FEMALE', 'OTHER'];
export function Register() {
  const { registerMobile, handleSubmit } = useForm({
    fields: {
      email: {
        value: '',
        validators: {
          required: (v: string) => required(v),
        }
      },
      firstName: {
        value: '',
        validators: {
          required: (v: string) => required(v),
        }
      },
      lastName: {
        value: '',
        validators: {
          required: (v: string) => required(v),
        }
      },
      birthDate: {
        value: '',
        validators: {
          required: (v: string) => required(v),
        }
      },
      gender: {
        value: '',
      }
    }
  })
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: ''
  });

  const send = () => {
    handleSubmit((values) => {
      console.log(values)
    }, errors => console.log(errors))
    //navigation.navigate('register-contact' as never)
  }

  //const navigation = useNavigation();
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
          <Text style={styles.subtitle}>Tus datos principales</Text>
          <Text style={{ fontFamily: 'Nunito_500Medium' }}>Datos esenciales para saber quien eres.</Text>
        </View>
        <View style={{ width: '100%', gap: 30 }}>
          <InputText placeholder={'Email'} required {...registerMobile('email')}/>
          <InputText placeholder={'First name'} onChange={(value) => setUser({ ...user, firstName: value })}/>
          <InputText placeholder={'Last name'} onChange={(value) => setUser({ ...user, lastName: value })}/>
          <InputDate placeholder="Birth Date" mode="date" onChange={(value) => setUser({ ...user, birthDate: value })}/>
          <InputSelect placeholder="Gender" options={genders} onChange={(value) => setUser({ ...user, gender: value })}/>
          <Button text='Siguiente' icon={<FontAwesomeIcon icon={faAngleRight} color={'#000'} size={30}/>} onPress={send}></Button>
        </View>
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
