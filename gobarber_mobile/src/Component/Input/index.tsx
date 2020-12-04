import React, {
  useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);
  const {
    registerField, fieldName, defaultValue = '', error,
  } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, SetIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputFocus = useCallback(() => {
    SetIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    SetIsFocused(false);

    if (inputValueRef.current.value) {
      setIsFilled(true);
    }
  }, []);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />
      <TextInput
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        ref={inputElementRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholderTextColor="#807c79"
        {...rest}
      />
    </Container>
  );
};
export default forwardRef(Input);
