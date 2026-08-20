export interface YolnomaPluginConfig {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
}

export function defineConfig(config: YolnomaPluginConfig): YolnomaPluginConfig {
  return config;
}

export default defineConfig({
  id: 'com.example.hello-plugin',
  name: 'Hello Plugin',
  version: '0.1.0',
  description: 'A Yolnoma desktop application plugin',
  author: {
    name: 'Yolnoma Developer',
  },
});
