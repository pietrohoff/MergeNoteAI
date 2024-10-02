
# 🤖 MergeNoteAI - Automatize as Descrições dos seus Pull Requests

**MergeNote** é uma GitHub Action poderosa que automatiza a geração de descrições para os seus Pull Requests, garantindo que todas as informações relevantes das alterações sejam incluídas de forma consistente e padronizada. Economize tempo e melhore a qualidade das revisões de código com descrições detalhadas geradas automaticamente.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/seu-usuario/MergeNote)](https://github.com/seu-usuario/MergeNote/issues)
[![GitHub stars](https://img.shields.io/github/stars/seu-usuario/MergeNote)](https://github.com/seu-usuario/MergeNote/stargazers)

## Índice

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Personalização](#personalização)
- [Exemplo de Descrição Gerada](#exemplo-de-descrição-gerada)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

- 📝 **Geração Automática de Descrições**: Cria descrições de PR com base nas mensagens de commit e nos arquivos modificados.
- 🎯 **Padronização**: Garante que todas as descrições sigam um padrão definido, facilitando a compreensão das alterações.
- ⚙️ **Personalização**: Permite personalizar o template da descrição de acordo com as necessidades do seu projeto.
- 🚀 **Fácil Integração**: Simples de configurar e integrar em qualquer repositório GitHub.

## Pré-requisitos

- Conta no [GitHub](https://github.com/).
- Repositório no GitHub onde a ação será utilizada.
- Conhecimento básico de Git e GitHub Actions (não é obrigatório).

## Instalação

1. **Faça o fork ou clone deste repositório:**

   ```bash
   git clone https://github.com/seu-usuario/MergeNote.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd MergeNote
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

## Configuração

Nenhuma configuração adicional é necessária para o uso básico. A GitHub Action está pronta para ser utilizada.

## Uso

Para utilizar o **MergeNote** no seu repositório, siga os passos abaixo:

1. **Copie o workflow para o seu repositório:**

   - Crie a pasta `.github/workflows/` no seu repositório (se ainda não existir).
   - Copie o arquivo [`merge-note.yml`](.github/workflows/merge-note.yml) para a pasta `.github/workflows/` do seu repositório.

2. **Faça commit e push das alterações:**

   ```bash
   git add .github/workflows/merge-note.yml
   git commit -m "Adiciona ação MergeNote para descrição automática de PR"
   git push origin main
   ```

3. **Ação em funcionamento:**

   - Agora, sempre que um novo Pull Request for aberto, reaberto ou atualizado, a ação será executada.
   - A descrição do PR será gerada ou atualizada automaticamente com base nos commits e arquivos modificados.

## Personalização

### Template da Descrição

Você pode personalizar o template da descrição editando o arquivo `src/index.js`, onde o conteúdo da descrição é gerado.

Exemplo de personalização:

```javascript
// src/index.js

// ... código anterior permanece o mesmo ...

// Template da descrição personalizado
const newBody = `
## 🚀 Atualização do Pull Request

### 📋 Resumo dos Commits:

${commitMessages}

### 🗂 Arquivos Modificados:

${changedFiles}

---

*Descrição gerada automaticamente pelo [MergeNote](https://github.com/seu-usuario/MergeNote).*
`;

// ... restante do código ...
```

### Eventos de Gatilho

Se desejar que a ação seja executada em outros eventos além de `pull_request`, edite o arquivo de workflow `.github/workflows/merge-note.yml`.

Exemplo:

```yaml
on:
  pull_request:
    types: [opened, reopened, synchronize]
  push:
    branches:
      - main
```

## Exemplo de Descrição Gerada

Abaixo está um exemplo de como a descrição do Pull Request será gerada pelo **MergeNote**:

---

### Descrição Gerada pelo MergeNote

**Commits neste PR:**

- Adiciona nova funcionalidade X
- Corrige bug Y
- Atualiza documentação do módulo Z

**Arquivos modificados:**

- src/funcionalidadeX.js
- src/moduloY.js
- docs/moduloZ.md

*Esta descrição foi gerada automaticamente pelo [MergeNote](https://github.com/seu-usuario/MergeNote).*

---

## Contribuição

Contribuições são o coração da comunidade open-source! Se você tem sugestões, melhorias, relatórios de bugs ou deseja adicionar novas funcionalidades, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

Consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para obter detalhes sobre o nosso código de conduta e o processo de envio de pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

### ⭐️ Não esqueça de dar uma estrela no repositório se este projeto foi útil para você!

---

**Divirta-se usando o MergeNote e feliz codificação!**
