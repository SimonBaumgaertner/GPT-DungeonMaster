import openai

API_KEY = "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"

openai.api_key = API_KEY

model_id = 'gpt-3.5-turbo'


def ChatGPT_conversation(prompt):
    conversation = [{'role': 'system', 'content': prompt}]
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=conversation
    )
    api_usage = response['usage']
    print('Total token consumed: {0}'.format(api_usage['total_tokens']))
    conversation.append({'role': response.choices[0].message.role, 'content': response.choices[0].message.content})
    return conversation[1]["content"]
