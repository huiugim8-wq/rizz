module.exports = {
  apps: [
    {
      name: 'rizz-homepage',
      cwd: '/opt/rizz/current',
      script: 'ops/aws/start.sh',
      interpreter: '/bin/bash',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1500M',
      kill_timeout: 15000,
      time: true,
      env: { NODE_ENV: 'production', PORT: '3000', HOSTNAME: '127.0.0.1' },
    },
  ],
};
