const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    transaction: `transaction@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'statement',
        filename: 'static/chunks/remoteEntry.js',
        // dts: false,
        exposes: {
          './StatementComponent': './components/StatementComponent.js',
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
