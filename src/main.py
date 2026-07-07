from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Bonjour FastAPI !"}

@app.get("/about")
def about():
    return {"status": "En ligne", "info": "Ceci est un test propre"}