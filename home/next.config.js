const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    transaction: `transaction@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  webpack(config, options) {
    config.experiments = { topLevelAwait: true, asyncWebAssembly: true, layers: true, };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        // dts: false,
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
