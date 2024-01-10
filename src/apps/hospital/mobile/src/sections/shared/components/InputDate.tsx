import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from 'react-native-ui-datepicker';

export function InputDate({ placeholder, onChange = () => null, mode }: { placeholder: string, onChange?: (...args: any) => void, mode: 'date' | 'time' | 'datetime' }) {
  const [date, setDate] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.buttonBox}>
      <Pressable style={({pressed}) => [
        styles.button,
        {
          top: pressed ? -2 : -3,
          left: pressed ? -2 : -3,
        }
      ]} onPress={() => setOpen(!open)}>
        <Text style={styles.buttonText}>
          { date ? date?.toDateString() : placeholder }
        </Text>
      </Pressable>
      {open && (
        <View style={{
          position: 'relative',
          top:45,
          left:-3,
          width: '100%',
          zIndex: 2,
          backgroundColor: '#fff',
          borderColor: '#000',
          borderStyle: 'solid',
          borderWidth: 2,
          borderRadius: 5,
        }}>
          <DateTimePicker
          value={date}
          mode={mode}
          onValueChange={(selectedDate) => {
            setDate(new Date(selectedDate?.toString() || new Date()))
            setTimeout(() => setOpen(false), 300)
            onChange(selectedDate)
          }}
          selectedItemColor="#9747FF"
          selectedTextStyle={{
            color: '#fff',
            fontFamily: 'Nunito_700Bold',
            fontSize: 16,
          }}
          calendarTextStyle={{
            color: '#000',
            fontFamily: 'Nunito_700Bold',
            fontSize: 16,
          }}
        />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    height: 40,
    width: '100%',
    margin: 'auto',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    top: -3,
    left: -3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  buttonBox: {
    backgroundColor: '#000',
    height: 43,
    width: '90%',
    position: 'relative',
    borderRadius: 5,
    zIndex: 2,
    marginLeft: '5%',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  }
});
