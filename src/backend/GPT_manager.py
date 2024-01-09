class GPTManager:
    def __init__(self):
        self.conversation = \
            []

    def createPrompt(self, player_input):
        prompt = "Answer the last question considering the previous ones: \n"
        self.conversation.append("Question: " + player_input)
        if len(self.conversation) > 8:
            self.conversation.pop(0)
            self.conversation.pop(1)
        for element in self.conversation:
            prompt = prompt + element + "\n"
        return prompt

    def registerResponse(self, response):
        self.conversation.append("Answer: " + response)

    def clearGPT(self):
        self.conversation = []
