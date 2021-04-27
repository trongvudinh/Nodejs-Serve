const winston = require('winston');
require('winston-daily-rotate-file');
module.exports = winston.createLogger({
    level:'info',
    format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.json(),
      winston.format.printf(
        log => {
            if(log.stack)
                return  `{"timestamp":"${log.timestamp}","level":"${log.level}",message:${log.message},"stack" : ${log.stack}}`;
            else  return `{"timestamp":"${log.timestamp}","level":"${log.level}",message:${log.message}}`;
        },
      )
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'log/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            prepend: true,
            json: false,
        }),
    ],
  })