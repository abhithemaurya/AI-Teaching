import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
    {
      target: "pino/file",
      options: {
        destination: "./logs/app.log",
      },
    },
  ],
});

export const logger = pino(
  {
    level: "info",
  },
  transport
);