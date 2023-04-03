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

manager = DMManger()
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app = FastAPI()

response_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
}


@app.get("/test/connection/")
async def testConnection():
    response_data = "Connection with backend established successfully!"
    return JSONResponse(content=response_data, headers=response_headers)


@app.get("/input/{input_str}")
async def processInput(input_str: str):
    prompt = manager.createPrompt(input_str)
    response = GPT.ChatGPT_conversation(prompt)
    manager.registerResponse(response)
    return JSONResponse(content=response, headers=response_headers)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
