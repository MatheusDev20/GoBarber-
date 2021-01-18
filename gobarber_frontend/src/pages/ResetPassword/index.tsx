import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/Toast';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}
const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords must match',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) {
          throw new Error();
        }
        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });
        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao tentar resetar sua senha tente novamente',
        });
      }
    },
    [addToast, history, location],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de senha"
            />

            <Button type="submit">Resetar</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
