module.exports = {
  apps : [{
    name: "app",
    script: "./src/main.ts",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
     name: 'app',
     script: 'app.js'
  }]
}