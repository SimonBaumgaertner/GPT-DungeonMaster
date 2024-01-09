import openai

API_KEY = "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"

openai.api_key = API_KEY


def generatePicture(picture_prompt):
    response = openai.Image.create(
        prompt=picture_prompt,
        n=4,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return image_url


print(generatePicture("portrait of powerfull wizard with a staff in a fantasy setting"))
