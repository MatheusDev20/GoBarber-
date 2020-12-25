# Recuperação de Senha.

**RF**
 - Usuário deve recuperar a senha informando o Email
 - Usuário deve receber um email com instruções para recuperação de senha
 - O Usuário deve poder resetar sua senha
**RNF**
 - Ultilizar o Mailtrap para testar envios em ambiente de Dev
 - Ultilizar o Amazon SES para envios em produção.
 - Envio de Emails deve acontecer em segundo plano ( Background Job )
**RN**
 - O Link enviado por email, deve expirar em algum tempo específico.
 - O Usuário precisa confirmar a nova senha (Digitar 2x)

# Atualização de Perfil
 **RF**
 - O Usuário deve ser capaz de atualizar o seu perfil dentro da plataforma
 **RN**
 - O Usuário não pode alterar seu email para um email existente
 - Para atualizar sua senha o usuário deve informar a senha antiga.
 - Para atualizar a senha deve confirmar a senha nova ( Digitar 2x )
 **RNF**
 ------------------------------------

# Agendamento de serviços.
**RF**
 - O Usuário deve poder listar todos os prestadores de serviço cadastrados na plataforma.
 - O Usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
 - Usuário deve poder listar os horários disponíveis em uma dia específico.
 - Usuário deve poder realizar um agendamento

 **RN**
 - Cada agendamento deve durar 1h exatamente.
 - Agendamentos disponíveis entre 8h as 18 (Primeiro horário as 8h ultimo as 17h)
 - O Usuário não pode agendar em um horário ja ocupado.
 - O Usuário não pode agendar em um horário que já passou ( antes das 8 ou depois das 18)
 - O Usuário um com horário com você mesmo.

 **RNF**
  - Listagem de prestadores deve ser armazenada em Cache.

# Painel do Prestador
   **RF**
   - Usuário deve poder listar seu agendamentos em um dia específico.
   - O Prestador deve receber uma notificação sempre que houver um novo agendamento.
   - O Prestador deve poder visualizar as notificações não lidas.

    **RN**
    - Status da Notificação.

    **RNF**
    - Agendamentos do dia armazenados em cache.
    - Notificações no Mongo.
    - Notificações enviadas em WebSocket tempo real.

