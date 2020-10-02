# iFood Frontend Test

## 1) Aponte um domínio para localhost

Edite seu hosts e aponte para um domínio de teste

```bash
    127.0.0.1 dev.app.com.br
```

## 2) Crie um .env

Na variável REACT_APP_HOST coloque <seu_dominio>/login

```bash
    REACT_APP_SPOTIFY_APP_ID=<SEU_APP_ID>
    REACT_APP_HOST=http://dev.app.com.br/login
    REACT_APP_SPOTIFY_APP_SECRET=<SEU_APP_SECRET>
```

## 3) Exportar a variável PORT=80 no package.json no script start

coloque o valor da chave "start" de acordo com sua plataforma

```javascript
   {
       "start-windows": "set PORT=80 && react-scripts start",
       "start-mac": "PORT=80 && react-scripts start"
   }
```

## Instalando

```bash
    npm install
```

Ou

```bash
    yarn
```

## Rodando

```bash
    npm start
```

## Acessando

abra o navegador usando seu domínio configurado no hosts.
