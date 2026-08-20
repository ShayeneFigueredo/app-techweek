# Guia de Contribuição — App TechWeek

Fluxo de versionamento e ambientes usado neste projeto. Baseado no manual de boas práticas da equipe.

## Branches

| Branch | Papel | Regras |
|---|---|---|
| `main` | Produção | Nunca recebe commit direto. Só recebe merge vindo de `homolog`. |
| `homolog` | Homologação | Recebe merge de `develop`. Usada para testes integrados antes de ir pra produção. |
| `develop` | Desenvolvimento | Integra todas as features prontas. Base para criar `feature/*`. |
| `feature/nome-da-feature` | Funcionalidade específica | Criada a partir de `develop`. Ex.: `feature/cadastro-usuario`. |

**Fluxo:** `feature/*` → `develop` → `homolog` → `main`

## Passo a passo

```bash
git checkout develop
git checkout -b feature/nome-da-feature
# desenvolver, commitar, testar localmente
git push -u origin feature/nome-da-feature
# abrir PR: feature/nome-da-feature -> develop
```

Depois de testado em `develop`, abrir PR `develop -> homolog`. Depois de validado em `homolog`, abrir PR `homolog -> main`.

## Padrão de commits

```
[TIPO] - descrição curta e objetiva
```

| Código | Uso |
|---|---|
| `ADD` | Nova funcionalidade |
| `FIX` | Correção de bug |
| `UPD` | Melhoria ou ajuste |
| `DEL` | Remoção de código |
| `DOC` | Documentação |
| `CFG` | Configuração de ambiente/projeto |

Exemplos:
```
[ADD] - registro manual de refeição
[FIX] - ajuste no cálculo de calorias
[UPD] - melhoria na validação de formulário
[DOC] - documentação do fluxo de branches
[CFG] - configuração do ambiente de homologação
```

## Boas práticas essenciais

- Commits pequenos: um commit = uma mudança clara.
- Nunca versionar senhas, tokens, `.env`, builds ou pastas temporárias — veja `.gitignore`.
- Todos desenvolvem em `feature/*` e sobem livremente pra `develop`, com atenção para não sobrescrever o trabalho de outra pessoa.
- Alinhe com o time o uso de `develop`/`homolog` para não causar conflitos entre testes simultâneos.
- Todo PR precisa de revisão antes do merge.

## Board do fluxo

O andamento das tasks/issues é acompanhado no GitHub Project vinculado a este repositório, com as colunas: `Backlog → Em Desenvolvimento → Em Revisão (PR) → Homologação → Produção`.
