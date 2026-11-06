# CoreERP API

API REST do **CoreERP**, uma plataforma ERP modular pensada para empresas de diferentes segmentos. Este repositório contém o serviço de API e seus contratos; não representa um ERP exclusivo de um setor.

## Responsabilidade

A API recebe e valida cadastros operacionais, mantém os recursos em memória nesta primeira versão e expõe endpoints HTTP para o frontend e os demais módulos. Ela é a porta de entrada do produto; regras especializadas de negócio podem ser extraídas para serviços independentes conforme o ERP evoluir.

## Recursos iniciais

- Produtos: cadastro e consulta.
- Clientes: cadastro e consulta.
- Pedidos: cadastro vinculado a um cliente e consulta.
- Saúde: endpoint para verificar se o serviço está ativo.
- Respostas JSON consistentes e validação de entrada.

## Executar

Requer Node.js 20 ou superior.

```bash
npm start
```

Por padrão, escuta em `http://localhost:3000`. Os dados ficam em memória e são apagados ao reiniciar; use dados fictícios nesta versão.

## Testes locais

```bash
npm test
```

A suíte usa o runner nativo `node:test` e não exige dependências externas.

## Endpoints

| Método | Rota | Uso |
|---|---|---|
| GET | `/health` | Estado do serviço |
| GET | `/products` | Lista produtos |
| POST | `/products` | Cadastra produto |
| GET | `/customers` | Lista clientes |
| POST | `/customers` | Cadastra cliente |
| GET | `/orders` | Lista pedidos |
| POST | `/orders` | Cadastra pedido |

## Integração entre módulos

O frontend React consome esta API. O backend Java hospeda regras e relatórios de domínio. Os projetos de teste de API e Cypress validam contratos e jornadas ponta a ponta. Cada módulo terá seu próprio repositório e README, e o hub do produto explicará como executar o conjunto.

## Limites desta versão

Esta é uma base demonstrativa: armazenamento temporário em memória, sem autenticação, multiempresa ou persistência. Esses componentes precisam ser adicionados antes de qualquer uso com dados reais.

## Direitos de uso

Consulte `LICENSE`. O código é proprietário e não concede permissão de reutilização sem autorização do titular.
