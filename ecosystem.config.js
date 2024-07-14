module.exports = {
  apps: [
    {
      name: "codesharebackend",
      script: "src/server.ts",
      interpreter: "./node_modules/.bin/ts-node",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
