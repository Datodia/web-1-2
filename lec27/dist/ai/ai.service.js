"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
let AiService = class AiService {
    systemPromp = `You are a world-class certified nutritionist and dietitian with expertise in clinical nutrition, weight management, and sports performance. Your goal is to provide the most effective, realistic, and evidence-based dietary advice tailored to the user's needs, goals, and health conditions.
When generating advice:
- Ask clarifying questions if the user input is vague.
- Always consider factors like age, sex, activity level, dietary restrictions, allergies, and medical conditions.
- Emphasize whole foods, balance, sustainability, and portion control over trendy or restrictive diets.
- Provide actionable steps and sample meal suggestions when relevant.
- Avoid pseudoscience, supplements without clear research, or extreme regimens.
- Encourage long-term habits and explain the “why” behind your recommendations.
- If a goal like "lose weight" or "gain muscle" is provided, give tailored caloric and macronutrient guidance.
- Be warm, professional, and motivational, but honest.

You are not just answering — you are coaching the user toward better lifelong eating habits.
`;
    models = [
        'google/gemini-2.0-flash-exp:free',
        'deepseek/deepseek-chat:free',
        'deepseek/deepseek-r1:free'
    ];
    async askAi(prompt) {
        for (let model of this.models) {
            try {
                const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "messages": [
                            {
                                "role": "system",
                                "content": this.systemPromp
                            },
                            {
                                "role": "user",
                                "content": prompt
                            }
                        ]
                    })
                });
                const data = await resp.json();
                console.log(data, "data");
                return { success: 'ok', content: data.choices[0].message.content };
            }
            catch (e) {
                console.log(e);
                continue;
            }
        }
        throw new common_1.BadRequestException('try again');
    }
    async streamAi(prompt, response) {
        response.setHeader('Content-Type', 'text/event-stream');
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Connection', 'keep-alive');
        let success = false;
        for (let model of this.models) {
            try {
                const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "messages": [
                            {
                                "role": "system",
                                "content": this.systemPromp
                            },
                            {
                                "role": "user",
                                "content": prompt
                            }
                        ],
                        "stream": true
                    })
                });
                if (!resp.body) {
                    continue;
                }
                const reader = resp.body.getReader();
                const decoder = new TextDecoder();
                success = true;
                while (true) {
                    const { done, value } = await reader.read();
                    if (done)
                        break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim() !== '');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') {
                                response.write('data: [DONE]\n\n');
                                break;
                            }
                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices[0]?.delta?.content || '';
                                if (content) {
                                    response.write(`data: ${JSON.stringify({ content })}\n\n`);
                                }
                            }
                            catch (e) {
                                console.error('Error parsing SSE data:', e);
                            }
                        }
                    }
                }
                break;
            }
            catch (e) {
                console.log(e);
                continue;
            }
        }
        if (!success) {
            response.write('data: ' + JSON.stringify({ error: 'Failed to get response from AI models' }) + '\n\n');
        }
        response.end();
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map