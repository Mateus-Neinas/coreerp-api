# Como trabalhar no CoreERP

## Pipeline Kanban

O quadro do projeto deve usar estas colunas, nesta ordem:

1. **Backlog** — ideias e bugs ainda sem refinamento.
2. **Pronto** — tarefa com critérios de aceite, módulo e dependências definidos.
3. **Em andamento** — implementação ativa. Limite: até duas tarefas por módulo ao mesmo tempo.
4. **Revisão** — alterações submetidas em PR, aguardando revisão independente.
5. **CI** — verificações automáticas executando ou aguardando correções.
6. **Merge** — revisão concluída e verificações verdes; coordenação integra a mudança.
7. **Concluído** — alteração integrada e documentação atualizada.

Cada issue é um cartão. Registre a coluna atual no projeto GitHub e preencha os papéis no cartão para que fique claro quem coordena, implementa e revisa.

## Papéis dos agentes

- **Agente coordenador:** entende o pedido, quebra o trabalho em cartões pequenos, define dependências, acompanha o Kanban e integra as entregas.
- **Agente de domínio:** implementa regras do módulo indicado (API, Java, React, banco, estoque, compras ou financeiro).
- **Subagente de QA:** analisa critérios de aceite, cobre cenários e revisa o comportamento.
- **Subagente de DevOps:** cuida de workflows, builds, ambiente e entrega.
- **Subagente de documentação:** atualiza README, exemplos e instruções para reproduzir a tarefa.
- **Revisor independente:** analisa o diff do PR procurando bugs, regressões, problemas de segurança e lacunas de teste. Sempre que possível, não é o mesmo agente que implementou.

Os agentes são papéis de execução, não contas do GitHub. Registre seus nomes ou funções no cartão e no PR; o agente coordenador continua responsável pela integração.

## Regras de passagem

- **Backlog → Pronto:** escopo definido, critérios de aceite claros e módulo proprietário identificado.
- **Pronto → Em andamento:** criar branch `feature/<resumo>` ou `fix/<resumo>`; dividir trabalho paralelo em subcartões sem editar os mesmos arquivos.
- **Em andamento → Revisão:** abrir PR com contexto, evidências, riscos e instruções de validação.
- **Revisão → CI:** resolver comentários e registrar a decisão do revisor. Revisão aprovada não substitui CI.
- **CI → Merge:** todos os checks obrigatórios passaram; coordenador confirma que a base está atualizada e integra.
- **Merge → Concluído:** confirmar merge, anotar SHA e fechar cartões relacionados.

Se houver bloqueio, registrar a causa no cartão e mover para **Pronto** apenas quando a dependência estiver resolvida. Não mover para **Concluído** com falha de CI ou comentário de revisão pendente.

## Critérios mínimos de pronto

- Escopo e critérios de aceite verificáveis.
- Testes automatizados pertinentes definidos.
- Atualização de documentação quando mudar execução, contrato ou comportamento.
- Revisão estática sem bloqueios conhecidos.
- CI verde antes do merge.

## Branches e commits

Use branches curtas com prefixos `feature/`, `fix/`, `test/`, `docs/` ou `ci/`. Prefira commits pequenos que descrevam a mudança (`feat(api): ...`, `fix(web): ...`, `test(e2e): ...`).

## Limites desta demonstração

O fluxo documenta como uma pequena equipe pode operar o portfólio. Os subagentes são instanciados por tarefa e não permanecem rodando em segundo plano. Deploy para produção deve ser configurado separadamente com ambiente, segredos e autorização apropriados.
