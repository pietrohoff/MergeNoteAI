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
        const { data: pr } = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: prNumber,
        });

        // Obter commits do PR
        const { data: commits } = await octokit.rest.pulls.listCommits({
            owner,
            repo,
            pull_number: prNumber,
        });

        // Obter arquivos modificados
        const { data: files } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber,
        });

        // Gerar lista de commits
        let commitMessages = commits.map(commit => `- ${commit.commit.message}`).join('\n');

        // Gerar lista de arquivos modificados
        let changedFiles = files.map(file => `- ${file.filename}`).join('\n');

        // Preparar o texto para a IA gerar a explicação
        const inputText = `
        Baseado nos seguintes commits e arquivos modificados:

        Commits:
        ${commitMessages}

        Arquivos modificados:
        ${changedFiles}

        Gere um resumo estruturado das modificações no seguinte formato:

        Resumo:
        [Breve resumo das modificações feitas no PR.]

        Problema Resolvido:
        [Explique o problema que foi resolvido com as modificações realizadas.]
        `;

        // Fazer a requisição para a API Hugging Face (sem chave)
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

        const aiGeneratedDescription = response.data[0].generated_text.trim();

        // Template da descrição
        const newBody = `
                        ### Descrição Gerada pelo MergeNote com IA

                        **Resumo:**

                        ${aiGeneratedDescription.split("Problema Resolvido:")[0].trim()}

                        **Problema Resolvido:**

                        ${aiGeneratedDescription.split("Problema Resolvido:")[1]?.trim() || 'Descrição indisponível'}

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
