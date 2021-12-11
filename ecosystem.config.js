module.exports = {
  apps: [{
    name: '1EDU',
    script: 'yarn start',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
