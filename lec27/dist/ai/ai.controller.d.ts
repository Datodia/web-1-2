import { AiService } from './ai.service';
import { Response } from 'express';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    askAi(body: any): Promise<{
        success: string;
        content: any;
    }>;
    streamAi(body: any, response: Response): Promise<void>;
}
