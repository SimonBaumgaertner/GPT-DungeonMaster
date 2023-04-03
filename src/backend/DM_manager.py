
class DMManger:
    def __init__(self):
        self.conversation = \
            ["DM: Welcome adventurer! To begin, please tell me your character's name, race, class, and backstory. Let's embark on a quest like no other and see where this adventure takes us!"]

    def createPrompt(self, player_input):
        self.conversation.append("Player: " + player_input)
        prompt = "Imagine you are a Dungeon Master (DM) and this is the conversation you had with a player (Player): \n"
        for element in self.conversation:
            prompt = prompt + element + "\n"
        if len(self.conversation) == 2:
            prompt = prompt + "Only answer like the DM would to start the player of with an intro to the campaign."
        else:
            prompt = prompt + "Only answer like the DM would to continue the conversation."
        return prompt

    def registerResponse(self, response):
        self.conversation.append("DM: " + response)
