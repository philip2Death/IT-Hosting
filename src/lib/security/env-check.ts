// src/lib/security/env-check.ts
export function validateEnvVars(requiredVars: string[]) {
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`
        Missing critical environment variables: ${missingVars.join(', ')}
        Check your .env.local file and deployment settings
      `);
    }
  }
  