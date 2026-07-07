from fastapi import FastAPI
app=FastAPI()
items=[]


@app.get("/")
def home():
    return {"message": "Bonjour FastAPI !"}

# NOUVEAU : Route "/about"
@app.get("/about")
def about():
    return {
        "name": "Mon Portfolio API",
        "version": "1.0.0",
        "description": "API pour mon portfolio"
    }


