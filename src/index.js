// src/index.js

const core = require('@actions/core');
const github = require('@actions/github');

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

        // Template da descrição
        const newBody = `
                        ### Descrição Gerada pelo MergeNote

                        **Commits neste PR:**

                        ${commitMessages}

                        **Arquivos modificados:**

                        ${changedFiles}

                        *Esta descrição foi gerada automaticamente pelo [MergeNote](https://github.com/pietrohoff/MergeNote).*
                        `;

        // Atualizar o PR com a nova descrição
        await octokit.rest.pulls.update({
            owner,
            repo,
            pull_number: prNumber,
            body: newBody,
        });

        console.log('Descrição do PR atualizada com sucesso pelo MergeNote.');
    } catch (error) {
        core.setFailed(`Erro ao atualizar a descrição do PR: ${error.message}`);
    }
}

run();
