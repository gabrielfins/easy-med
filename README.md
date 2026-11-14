# Easy Med

Aplicativo de **telemedicina** em React Native (Expo) que conecta pacientes e médicos para consultas por vídeo, agendamentos e controle de medicamentos.

Desenvolvido para o PCA (Projeto Curricular Articulatório) de 2022.2 — Unigranrio.

## Funcionalidades

- Cadastro, login e perfil separados para **pacientes** e **médicos**
- Busca de médicos por **especialidade**
- **Agendamento de consultas**: criar, confirmar e visualizar
- **Chamada de vídeo** entre paciente e médico (WebRTC)
- **Medicamentos:** cadastro, edição e listagem
- Histórico, notificações, configurações e ajuda

## Tecnologias

- React Native 0.69 + Expo 46, TypeScript
- React Native Paper e styled-components
- React Router Native
- Firebase (Auth, Firestore e Realtime Database)
- react-native-webrtc para as chamadas de vídeo

## Estrutura

```
easy-med/
├── App.tsx / Router.tsx
└── app/
    ├── components/   # Componentes de UI reutilizáveis
    ├── contexts/     # AuthContext, CallContext
    ├── guards/       # Proteção de rotas (auth / chamada)
    ├── hooks/        # use-auth, use-call, ...
    ├── layouts/
    ├── models/       # appointment, call, doctor, medicine, patient
    ├── pages/        # Telas (login, agendamentos, medicamentos, chamada, ...)
    └── services/     # Acesso ao Firebase e regras de negócio
```

## Como executar

Pré-requisitos: Node.js, npm/yarn e o app **Expo Go** (ou um emulador Android/iOS).

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz com as credenciais do **seu** projeto Firebase (lidas por `react-native-dotenv` em `app/services/firebase-service.ts`), por exemplo `API_KEY`, `AUTH_DOMAIN`, `DATABASE_URL`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID` e `APP_ID`.
3. Inicie o projeto:
   ```bash
   npm start          # Expo
   npm run android    # emulador/dispositivo Android
   npm run web        # versão web
   ```

> As chamadas de vídeo usam `react-native-webrtc`, que exige um *development build* (não funciona no Expo Go).
