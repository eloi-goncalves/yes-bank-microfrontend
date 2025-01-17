# Configuração necessária para executar o microfrontend.


## 1 - Clonar o reposítório:
* git clone https://github.com/eloi-goncalves/yes-bank-microfrontend.git

## 2 - Entrar na pasta raiz do projeto cd yes-bank-microfrontend e executar o comando 'npm run serve' ou executar com o docker: 'docker-compose up --build'


# Explicação dos arquivos de configuração: `next.config.js`

* 1 - Importação do plugin:
```js
  const NextFederationPlugin = require('@module-federation/nextjs-mf');
```
Aqui, o plugin NextFederationPlugin está sendo importado. Esse plugin é utilizado para configurar o Module Federation no Next.js, uma técnica que permite que diferentes aplicações compartilhem partes do código entre si de maneira eficiente, criando uma arquitetura de micro-frontends.


* 2 - Função remotes:
```js
  const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    transaction: `transaction@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

```
A função remotes retorna um objeto que define onde os micro-frontends remotos podem ser encontrados. A URL apontada no remoteEntry.js indica onde o aplicativo remoto (neste caso, o microfrontend transaction) está sendo servido.

isServer: Este parâmetro é passado para determinar se a execução está ocorrendo no servidor (SSR) ou no cliente. Isso afeta o local onde os arquivos de recursos (como os arquivos JavaScript do micro-frontend) são carregados. Se for o servidor, o caminho será 'ssr', se for o cliente, será 'chunks'.
remoteEntry.js: Esse arquivo é o ponto de entrada de cada micro-frontend e é gerado pelo Webpack durante o processo de build.
A função cria o mapeamento entre o nome do micro-frontend (transaction) e o arquivo remoto específico que deve ser carregado, seja para o SSR ou para o lado do cliente.


* 3 - Configuração do Webpack:
```js
 module.exports = {
  webpack(config, options) {
    config.experiments = { topLevelAwait: true, asyncWebAssembly: true, layers: true, };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Nav': './components/nav.js',
          './home': './pages/index.js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: ['react', 'react-dom', 'next'],
        extraOptions: {
          exposePages: true,
        },
      }),
    );
    return config;
  },
};

```
Aqui, a configuração do Webpack é estendida para incluir o NextFederationPlugin e outras opções.

webpack(config, options): O método webpack é utilizado para modificar a configuração do Webpack. Ele recebe dois parâmetros:

config: A configuração atual do Webpack.
options: Um objeto que contém informações sobre o ambiente, como se está executando no servidor ou cliente (isServer), entre outros.
config.experiments: As opções de experiments permitem habilitar recursos experimentais do Webpack. Aqui são habilitados três recursos:

topLevelAwait: Permite o uso de await no nível superior dos módulos.
asyncWebAssembly: Habilita o suporte a WebAssembly de forma assíncrona.
layers: Permite usar camadas no Webpack, uma técnica para dividir o código de maneira mais eficiente.
config.plugins.push(): A linha adiciona o NextFederationPlugin à lista de plugins do Webpack. Esse plugin configura o comportamento de Module Federation no Next.js.


* 4 - Configuração do NextFederationPlugin:
```js
 new NextFederationPlugin({
  name: 'home',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './Nav': './components/nav.js',
    './home': './pages/index.js',
    './pages-map': './pages-map.js',
  },
  remotes: remotes(options.isServer),
  shared: ['react', 'react-dom', 'next'],
  extraOptions: {
    exposePages: true,
  },
});

```
Dentro do NextFederationPlugin, diversas configurações importantes são definidas:

name: 'home': O nome da aplicação atual, que é o "host" (ou seja, o aplicativo principal). Esse nome é usado para referenciar o micro-frontend em outras aplicações.

filename: 'static/chunks/remoteEntry.js': O arquivo onde o "entry point" remoto será gerado. Esse arquivo é usado por outras aplicações para integrar e consumir o micro-frontend exposto.

exposes: Define os módulos que a aplicação irá expor para outras aplicações. Ou seja, esses arquivos poderão ser consumidos por outras aplicações ou micro-frontends:

'./Nav': Expondo o componente Nav localizado em ./components/nav.js.
'./home': Expondo a página principal (index.js).
'./pages-map': Expondo o arquivo pages-map.js.
remotes: remotes(options.isServer): Indica quais micro-frontends remotos esta aplicação está consumindo. O método remotes retorna os endpoints de onde os micro-frontends serão carregados, dependendo se a execução está no servidor ou cliente.

shared: Define as dependências compartilhadas entre as aplicações. Essas dependências (como react, react-dom, e next) serão carregadas apenas uma vez, evitando duplicação e garantindo que as versões corretas sejam usadas.

extraOptions: { exposePages: true }: Uma opção adicional do plugin, que permite expor páginas como módulos, facilitando a reutilização delas entre micro-frontends.
