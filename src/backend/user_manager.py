import json


class UserManager:
    def __init__(self):
        self.user_list = []
        # read the JSON file
        with open('users.json') as f:
            data = json.load(f)

        # create an array of user objects
        for user in data['users']:
            self.user_list.append({
                'username': user['username'],
                'password': user['password'],
            })

    def authenticate(self, username, password):
        for user in self.user_list:
            if user['username'] == username and user['password'] == password:
                return True
        return False

    def getConversation(self, username):
        for user in self.user_list:
            if user['username'] == username:
                return user['conversation']
        return None

    def continueConversation(self, username, agent, message):
        for user in self.user_list:
            if user['username'] == username:
                user['conversation'].append({
                    'agent': agent,
                    'message': message
                })

