# AnimeFlow

Um Pomodoro inspirado na estética anime, desenvolvido com **Next.js**, que combina produtividade com cenários relaxantes, imagens, vídeos e músicas para criar um ambiente agradável de estudo ou trabalho.

## Funcionalidades

- Timer Pomodoro
  - Foco
  - Pausa Curta
  - Pausa Longa
- Alternância automática entre os ciclos
- Configuração da duração dos ciclos
- Cenários personalizados
- Suporte para:
  - Imagens
  - Vídeos
  - Vídeos do YouTube
- Upload de imagens e vídeos locais
- Remoção de mídias adicionadas
- Alarme ao finalizar um ciclo
- Modo tela cheia
- Configurações salvas automaticamente no navegador
- Interface responsiva

---

## Cenários Padrão

O projeto já possui alguns cenários inspirados em animes:

- Haikyuu!!
- My Hero Academia (Izuku Midoriya)
- The Apothecary Diaries (Maomao)
- Studio Ghibli

---

## Tecnologias

- Next.js 16
- React 19
- JavaScript
- CSS
- HTML5

---

## Estrutura do Projeto

```text
app/
 ├── api/
 │   └── media/
 ├── layout.tsx
 ├── page.tsx
 └── globals.css

components/
 └── pomodoro/

hooks/

lib/

public/
 └── media/
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/carlosqbarbosa/AnimeFlow.git
```

Entre na pasta:

```bash
cd AnimeFlow
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## Build de Produção

```bash
npm run build
```

Executar em produção:

```bash
npm run start
```

---

## Adicionando Novos Cenários

Você pode:

- adicionar imagens na pasta `public/media`;
- enviar imagens e vídeos diretamente pela interface;
- adicionar links de imagens;
- adicionar vídeos do YouTube.

---

## Objetivo

O AnimeFlow foi desenvolvido para tornar sessões de estudo e trabalho mais agradáveis, utilizando a técnica Pomodoro combinada com uma interface inspirada no universo anime.

---

## Melhorias Futuras

- [ ] Login de usuários
- [ ] Estatísticas de produtividade
- [ ] Histórico de sessões
- [ ] Playlists do Spotify
- [ ] Integração com YouTube Music
- [ ] Sons ambientes (chuva, cafeteria, floresta)
- [ ] Temas claros e escuros
- [ ] PWA para uso offline

---

## Autor

**Carlos Barbosa**

- GitHub: https://github.com/carlosqbarbosa
- LinkedIn: https://www.linkedin.com/in/carlosqbarbosa/

---

## Licença

Este projeto está licenciado sob a licença MIT.