import { Body, Controller, Post, Res } from '@nestjs/common';
import { AiService } from './ai.service';
import { Response } from 'express';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  askAi(@Body() body: any){
    return this.aiService.askAi(body.prompt)
  }

  @Post('stream')
  async streamAi(@Body() body: any, @Res() response: Response) {
    return this.aiService.streamAi(body.prompt, response);
  }
}
