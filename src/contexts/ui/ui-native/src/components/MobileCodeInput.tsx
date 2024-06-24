import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface MobileCodeInputProps {
  onChange: (value: string) => void;
  onBlur?: () => void;
  name: string;
  error?: string;
}

export const MobileCodeInput = ({ onChange, error, onBlur }: MobileCodeInputProps) => {
  const [value, setValue] = useState('')
  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View style={styles.root}>
      <CodeField
      {...codeFieldProps}
      value={value}
      onChangeText={(value) => {
        setValue(value);
        onChange ? onChange(value) : null;
      }}
      onBlur={onBlur}
      cellCount={4}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Fragment key={index}>
          <Text
            key={`value-${index}`}
            style={[styles.cell, error ? styles.errorCell : {}]}
            onLayout={getCellOnLayout(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </Fragment>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'row'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20, justifyContent: 'space-between', gap: 10, width: '90%', margin: 'auto'},
  cell: {
    width: 40,
    height: 40,
    borderRadius: 5,
    lineHeight: 38,
    fontSize: 24,
    backgroundColor: '#E0E0E0',
    textAlign: 'center',
  },
  errorCell: {
    borderWidth: 1,
    borderColor: '#DE2AC3',
  }
})

