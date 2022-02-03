from flask import Flask
import pymongo
from flask_pymongo import PyMongo

app =  Flask(__name__)
app.secret_key = 'f64d9ec603a9747ea37e675c0b3b94b31ade976c'

# DATABASE

#Uncomment below to use Atlas database

# app.config["MONGO_URI"] = "mongodb+srv://Prakhar:RjPXNu9LxDCwVR3x@cluster0.22jzf.mongodb.net/sattva_db?retryWrites=true&w=majority"
# mongodb_client = PyMongo(app)
# db = mongodb_client.db

#Uncomment below to use Compass database

client = pymongo.MongoClient('localhost', 27017)
db = client.sattva_db



