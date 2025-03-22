import { z } from 'zod';

const envSchema = z.object({
  VITEINITIALFREEPROMPTS: z.coerce.number().default(2),
  VITEPROMPTSPERCODE: z.coerce.number().default(3),
  VITESUPERCODE: z.string().default(""),
  VITEAZUREOPENAIENDPOINT: z.string().default(""),
  VITEAZUREOPENAIKEY: z.string().default(""),
  // Azure B2C Configuration
  AZURE_B2C_CLIENT_ID: z.string().default(""),
  AZURE_B2C_AUTHORITY: z.string().default(""),
  AZURE_B2C_KNOWN_AUTHORITY: z.string().default(""),
  AZURE_B2C_REDIRECT_URI: z.string().default("),
});

const env = envSchema.parse({
  VITEINITIALFREEPROMPTS: 2,
  VITEPROMPTSPERCODE: 3,
  VITESUPERCODE: "",
  VITEAZUREOPENAIENDPOINT: "",
  VITEAZUREOPENAIKEY: "",
  AZURE_B2C_CLIENT_ID: "",
  AZURE_B2C_AUTHORITY: "",
  AZURE_B2C_KNOWN_AUTHORITY: "",
  AZURE_B2C_REDIRECT_URI: "",
});

export const config = {
  initialFreePrompts: env.VITEINITIALFREEPROMPTS,
  promptsPerCode: env.VITEPROMPTSPERCODE,
  superCode: env.VITESUPERCODE,
  openai: {
    endpoint: env.VITEAZUREOPENAIENDPOINT,
    apiKey: env.VITEAZUREOPENAIKEY,
  },
  azure: {
    b2c: {
      clientId: env.AZURE_B2C_CLIENT_ID,
      authority: env.AZURE_B2C_AUTHORITY,
      knownAuthority: env.AZURE_B2C_KNOWN_AUTHORITY,
      redirectUri: env.AZURE_B2C_REDIRECT_URI,
    }
  }
} as const;