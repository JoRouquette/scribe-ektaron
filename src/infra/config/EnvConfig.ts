export interface EnvConfig {
  port: number;
  apiKey: string;
  contentRoot: string;
  nodeEnv: 'development' | 'test' | 'production';
}

export function loadEnvConfig(): EnvConfig {
  const port = Number(process.env.PORT ?? '3000');
  const apiKey = process.env.API_KEY;
  const contentRoot = process.env.CONTENT_ROOT;

  if (!apiKey) {
    throw new Error('Missing API_KEY environment variable');
  }

  if (!contentRoot) {
    throw new Error('Missing CONTENT_ROOT environment variable');
  }

  const nodeEnv =
    (process.env.NODE_ENV as EnvConfig['nodeEnv']) ?? 'development';

  return {
    port,
    apiKey,
    contentRoot,
    nodeEnv
  };
}
