# Igor Teodoro e Luan Garcia

---
# Sistema de Gerenciamento de Reservas e comandas para Restaurantes 🍴

Este é um sistema para gerenciar reservas e comandas em restaurantes, desenvolvido utilizando serviços da AWS. O sistema permite o controle de mesas, registro de itens consumidos e gerenciamento de reservas, tudo integrado por meio de APIs.

---

## 🛠️ Tecnologias Utilizadas

- **AWS Lambda**: Para executar funções serverless responsáveis pelo processamento das comandas e reservas.  
- **AWS API Gateway**: Exposição de endpoints REST para comunicação entre cliente e servidor.  
- **AWS Amplify**: Para hospedagem e gerenciamento do front-end.  
- **AWS DynamoDB**: Banco de dados NoSQL usado para armazenar informações sobre mesas, reservas e itens consumidos.

---

## 📦 Funcionalidades

1. **Gerenciamento de Comandas**    
   - Registro e atualização de itens consumidos por cada mesa.

2. **Sistema de Reservas**  
   - Reservas realizadas através de um formulário integrado com o **AWS API Gateway**.  
   - Validação de disponibilidade e confirmação de reserva em tempo real.

3. **API REST**  
   - Endpoints disponíveis para criar, consultar, atualizar e deletar reservas e comandas.  
   - Integração com o **AWS Lambda** para lógica de negócios.

4. **Front-end Hospedado com Amplify**  
   - Interface amigável para o usuário, permitindo gerenciar mesas e reservas de forma simples.
