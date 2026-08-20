# Política de Segurança

## Segredos

Nunca commitar senhas, chaves de API, tokens ou arquivos `.env`. Veja `.gitignore`. Se um segredo for commitado por engano, ele deve ser considerado comprometido mesmo após removido — rotacione a credencial, não apenas o arquivo.

## Reportando um problema

Abra uma issue privada ou avise diretamente um dos mantenedores do repositório — não abra uma issue pública descrevendo uma vulnerabilidade exploravel antes de haver uma correção.

## Pendências conhecidas

- `seed-admin.js` cria um usuário admin com credenciais fracas hardcoded (`admin@admin.com` / `12345678`). Recomenda-se: mover credenciais para variáveis de ambiente, usar senha forte gerada, e considerar remover este script do repositório após o uso inicial (ou movê-lo para fora do controle de versão).
- Branch protection em `main`/`homolog` ainda não configurada — requer acesso admin no repositório.
