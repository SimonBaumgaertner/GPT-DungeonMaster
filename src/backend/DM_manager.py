class DMManger:
    def __init__(self, user_manager):
        self.user_manager = user_manager
        for user in self.user_manager.user_list:
            user["conversation"] = [{
                "agent": "DM",
                "message": "Welcome adventurer! To begin, please tell me your character's name, race, class, and backstory. Let's embark on a quest like no other and see where this adventure takes us!"
            }]

    def createPrompt(self, username, player_input):
        self.user_manager.continueConversation(username, username, player_input)
        prompt = "Imagine you are a Dungeon Master (DM) and this is the conversation you had with a player (Player): \n"
        for i, element in enumerate(self.user_manager.getConversation(username)):
            # if the conversation is longer then 10 lines, skip all conversation between the 4th message and the 8th last message in the prompt (keep it short)
            if len(self.user_manager.getConversation(username)) > 12 & i >= 4 & i < len(
                    self.user_manager.getConversation(username)) - 6:
                prompt = prompt + "...\n"
            else:
                prompt = prompt + element["agent"] + ": " + element["message"] + "\n"
        if len(self.user_manager.getConversation(username)) == 2:
            prompt = prompt + "Only answer like the DM would to start the player of with an intro to the campaign."

        else:
            prompt = prompt + "Only answer like the DM would to continue the conversation."
        return prompt

    def registerResponse(self, username, response):
        self.user_manager.continueConversation(username, "DM", response)

    def clearStory(self, username):
        self.user_manager.getUser(username)["conversation"] = [{
                "agent": "DM",
                "message": "Welcome adventurer! To begin, please tell me your character's name, race, class, and backstory. Let's embark on a quest like no other and see where this adventure takes us!"
            }]