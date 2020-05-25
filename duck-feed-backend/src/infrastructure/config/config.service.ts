import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private static instance = null;
    private readonly env: EnvConfig;

    constructor(filePath: string) {
        const configs = dotenv.parse(fs.readFileSync(filePath));
        this.env = this.validateInput(configs);
    }

    static getInstance(): ConfigService {
        if (this.instance == null) {
            this.instance = new ConfigService(`${process.env.NODE_ENV || ''}.env`);
        }

        return this.instance;
    }

    getString(key: string): string {
        return this.env[key];
    }

    getNumber(key: string): number {
        return parseFloat(this.env[key]);
    }

    /**
     * Ensures all needed variables are set,
     * and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(env: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_ENV: Joi.string()
                .valid('local', 'staging', 'production')
                .default('local'),
            APP_PORT: Joi.number().default(4000),
            DB_CONNECTION: Joi.string(),
            DB_HOST: Joi.string(),
            DB_PORT: Joi.number(),
            DB_USERNAME: Joi.string().allow(''),
            DB_PASSWORD: Joi.string().allow(''),
            DB_DATABASE: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(env);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }
}

const config = ConfigService.getInstance();

export { config };
