# Kanban de engenharia — CoreERP

## Colunas do quadro

| Coluna | Entrada | Saída |
|---|---|---|
| **Backlog** | Ideia ou bug registrado como issue. | Escopo, módulo e valor definidos. |
| **Pronto** | Critérios de aceite, dependências e plano de validação preenchidos. | Agente executor começa uma branch. |
| **Em andamento** | Implementação em branch curta; subagentes recebem tarefas independentes. | PR aberto e cartão ligado ao PR. |
| **Revisão** | PR com contexto, critérios de aceite e risco. | Revisor independente deixa parecer; bloqueios corrigidos. |
| **CI** | Revisão sem bloqueios; Actions executa os checks automáticos. | Todos os checks obrigatórios verdes. |
| **Merge** | CI passou e PR atualizado com a branch base. | Coordenador integra a mudança. |
| **Concluído** | PR mesclado, documentação atualizada e cartão ligado ao merge. | Fim. |

Mantenha o cartão em **Revisão** enquanto aguarda uma pessoa/agente revisor. Ele só passa a **CI** depois que a revisão termina sem bloqueios. Se a CI falhar, volte para **Em andamento**, corrija e percorra Revisão e CI novamente.

## Papéis no cartão

- **Coordenador:** planeja, divide, acompanha bloqueios e decide a integração.
- **Executor:** agente de domínio responsável pela alteração principal.
- **Subagentes:** QA, DevOps ou documentação, cada um com subtarefa e entrega definida.
- **Revisor:** agente diferente do executor, sempre que a tarefa exigir revisão independente.
- **CI:** automações do GitHub Actions; CI é um check técnico, não um agente.

Os papéis são anotados no corpo da issue/PR. Agentes não são contas GitHub e não devem ser registrados como assignees.

## Regras operacionais

- Limite WIP recomendado: duas issues por módulo em **Em andamento**.
- Divida o trabalho em cartões menores quando agentes puderem atuar sem editar os mesmos arquivos.
- Todo PR deve referenciar uma issue, preencher o template e declarar o resultado da revisão.
- Só mover para **Merge** com revisão concluída e checks verdes.
- A regra WIP é uma convenção do time, não uma trava técnica automática.

## Criar a visualização no GitHub

Os templates de issue e PR deste repositório já estruturam os cartões e papéis. Para a visualização arrastável, crie um projeto GitHub chamado **CoreERP — Engenharia** com uma view Board agrupada pelo campo **Status** e estas opções: Backlog, Pronto, Em andamento, Revisão, CI, Merge e Concluído. Adicione issues do repositório e conecte cada PR à sua issue.

O conector GitHub usado neste ambiente não disponibiliza a criação/edição de GitHub Projects. Por isso, o quadro visual precisa ser criado pela interface do GitHub; o fluxo, templates e CI ficam versionados neste repositório.
