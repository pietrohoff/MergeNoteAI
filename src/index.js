const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const context = github.context;
        const { owner, repo } = context.repo;
        const prNumber = context.payload.pull_request.number;

        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

        // Teste: Atualizar o PR com uma descrição simples e fixa
        const newBody = `
            ### Descrição de Teste

            Esta é uma descrição de teste para verificar se o PR é atualizado com sucesso.
        `;

        // Atualizar o PR com a nova descrição de teste
        await octokit.rest.pulls.update({
            owner,
            repo,
            pull_number: prNumber,
            body: newBody,
        });

        console.log('Descrição de teste do PR atualizada com sucesso.');
    } catch (error) {
        core.setFailed(`Erro ao atualizar a descrição do PR: ${error.message}`);
    }
}

run();
