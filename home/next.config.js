const NextFederationPlugin = require('@module-federation/nextjs-mf');

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    transaction: `transaction@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    statement: `statement@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  webpack(config, options) {
    config.externals = ['better-sqlite3', ...config.externals];
    config.experiments = { topLevelAwait: true, asyncWebAssembly: true, layers: true, };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
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
