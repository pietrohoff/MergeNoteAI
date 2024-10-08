const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
    try {
        const context = github.context;
        const { owner, repo } = context.repo;
        const prNumber = context.payload.pull_request.number;

        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

        // Obter detalhes do PR
        const { data: commits } = await octokit.rest.pulls.listCommits({
            owner,
            repo,
            pull_number: prNumber,
        });

        const { data: files } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber,
        });

        // Gerar lista de commits e arquivos alterados (nomes apenas)
        const commitMessages = commits.map(commit => `- ${commit.commit.message}`).join('\n');
        const changedFiles = files.map(file => file.filename).join(', ');

        // Preparar o texto para a IA gerar uma explicação resumida
        const inputText = `
        Dado os seguintes commits e arquivos alterados:

        Commits:
        ${commitMessages}

        Arquivos modificados:
        ${changedFiles}

        Gere um resumo das modificações no formato de uma frase explicativa sobre o que foi alterado.
        `;

        // Fazer a requisição para a API Hugging Face (sem chave)
        let aiGeneratedDescription = 'Descrição indisponível';
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/gpt2',
                {
                    inputs: inputText,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            aiGeneratedDescription = response.data[0]?.generated_text?.trim() || 'Descrição indisponível';
        } catch (error) {
            console.log('Erro ao obter resposta da IA:', error.message);
        }

        // Template da descrição final
        const newBody = `
                        ### Descrição Gerada pelo MergeNote com IA

                        **Resumo das Alterações:**

                        ${aiGeneratedDescription}

                        **Commits neste PR:**

                        ${commitMessages}

                        **Arquivos modificados:**

                        ${changedFiles}

                        *Esta descrição foi gerada automaticamente pelo [MergeNote](https://github.com/pietrohoff/MergeNote) utilizando IA.*
                        `;

        // Atualizar o PR com a nova descrição
        await octokit.rest.pulls.update({
            owner,
            repo,
            pull_number: prNumber,
            body: newBody,
        });

        console.log('Descrição do PR atualizada com sucesso pelo MergeNote com IA.');
    } catch (error) {
        core.setFailed(`Erro ao atualizar a descrição do PR: ${error.message}`);
    }
}

run();
