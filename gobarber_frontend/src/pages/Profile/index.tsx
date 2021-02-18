import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/apiClient';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}
const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email Obrigatório')
            .email('Digite um email Válido'),
          password: Yup.string().min(6, 'Mínimo com 6 caracteres'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro Realizado',
          description: 'Pronto! Já é possível realizar seu Login',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro na realização do cadastro, por favor tente novamente',
        });
      }
    },
    [addToast, history],
  );
  console.log(user);
  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>
          <h1>Meu Perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />

          <Input icon={FiMail} name="email" placeholder="Email" />

          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            placeholder="Senha Atual"
            type="password"
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            placeholder="Confirmar Senha"
            type="password"
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Profile;
