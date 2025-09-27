# Plataforma ReUse! — FIAP <br>
Desenvolvido por: Evelin Julia Hashimoto e Rebecca Dias Martins

App mobile criado com **Expo + React Native** com o objetivo de facilitar a troca de objetos pessoais entre usuários, promovendo o reuso e a sustentabilidade.  


## 🎯 Escopo desta entrega
- Telas implementadas fielmente aos wireframes (com pequenos aprimoramentos de UX):
  - **Login** / **Cadastro** (fluxo inicial)
  - **Home**
  - **Publicar item**
  - **Gerenciar itens**
  - **Perfil do usuário** (com logout)
- Recursos nativos:
  - **Câmera** (tirar fotos na tela Publicar)
  - **Async Storage** (rascunho da Publicação, dados do Perfil e estado de “usuário logado”)
- Navegação:
  - **Auth Stack** (Login/Cadastro) → **Tabs** (Home, Publicar, Gerenciar, Perfil)

---

## 🧱 Stack
- **Expo** (React Native)
- **React Navigation** (Tabs + Stack)
- **TypeScript**
- **expo-image-picker** (câmera/galeria)
- **@react-native-async-storage/async-storage** (armazenamento local)

---

## 🚀 Como rodar (local)
Clone e instale:
```bash
git clone https://github.com/RebeccaDMartins/reuse-app.git
cd reuse-app
npm install
