import uvicorn as uvicorn
from fastapi import FastAPI, File, HTTPException
from fastapi import BackgroundTasks, FastAPI, UploadFile, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import GPT
from DM_manager import DMManger
from GPT_manager import GPTManager
from user_manager import UserManager

user_manager = UserManager()
story_manager = DMManger(user_manager)
gpt_manager = GPTManager()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

response_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
}


######################## UTILITY FUNCTIONS ########################
@app.post("/test/connection/")
async def testConnection():
    response_data = "Connection with backend established successfully!"
    return JSONResponse(content=response_data, headers=response_headers)


@app.post("/authenticate/")
async def authenticate(request: Request):
    body = await request.json()
    result = user_manager.authenticate(body["username"], body["password"])
    return JSONResponse(content=result, headers=response_headers)


######################## STORY FUNCTIONS ########################

@app.post("/story_input/")
async def processSTORYInput(request: Request):
    body = await request.json()
    username = body["username"]
    input_str = body["message"]
    prompt = story_manager.createPrompt(username, input_str)
    response = GPT.ChatGPT_conversation(prompt)
    response = response.replace("DM: ", "")
    story_manager.registerResponse(username, response)
    return JSONResponse(content=response, headers=response_headers)


@app.post("/story_clear/")
async def storyClear(request: Request):
    body = await request.json()
    username = body["username"]
    story_manager.clearStory(username)
    return JSONResponse(content="Story cleared", headers=response_headers)


######################## GPT FUNCTIONS ########################

@app.post("/gpt_input/{input_str}")
async def processGPTInput(input_str: str):
    prompt = gpt_manager.createPrompt(input_str)
    response = GPT.ChatGPT_conversation(prompt)
    response = response.replace("Answer: ", "")
    gpt_manager.registerResponse(response)
    return JSONResponse(content=response, headers=response_headers)


@app.post("/gpt_clear/")
async def GPTclear():
    gpt_manager.clearGPT()
    return JSONResponse(content="GPT cleared", headers=response_headers)


######################## FILE FUNCTIONS ########################

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
