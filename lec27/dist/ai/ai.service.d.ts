import { Response } from 'express';
export declare class AiService {
    private readonly systemPromp;
    private models;
    askAi(prompt: any): Promise<{
        success: string;
        content: any;
    }>;
    streamAi(prompt: string, response: Response): Promise<void>;
}
