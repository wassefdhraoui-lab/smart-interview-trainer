import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const model = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning";

export async function evaluateAnswer(question, answer, category, difficulty) {
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.3,
    top_p: 0.95,
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content:
          "You are an experienced interview evaluator. Return only valid JSON. No markdown. No explanation outside JSON.",
      },
      {
        role: "user",
        content: `
Category: ${category}
Difficulty: ${difficulty}

Question:
${question}

Candidate Answer:
${answer}

Evaluate based on meaning, not only keywords.
donr be to strict, if the answer is partially correct, give partial credit. in the positive way always try to be supportive to the user add some emojies also when needed .
please also for wierd answers or ununderstoodble text, give strenghs tesxt nothing for this part and all sores should be 0. Also give a improved answer and feedback text for the candidate. 
Return exactly valid JSON:
{
  "overall_score": 85,
  "communication_score": 90,
  "technical_score": 82,
  "confidence_score": 80,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "missing_concepts": ["..."],
  "improved_answer": "...",
  "feedback": "..."
}
        `,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  return JSON.parse(
    content.replace(/```json/g, "").replace(/```/g, "").trim()
  );
}