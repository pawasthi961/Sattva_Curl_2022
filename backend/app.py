from email.mime import image
from flask import Flask, jsonify, request, session, redirect
from flask.scaffold import _matching_loader_thinks_module_is_package
from Models.user_model import User
from Models.data_model import Data
from functools import wraps
from Models.dashboard_stat_model import Dashboard
from config import *
import asyncio
# from NST import Network, utils
import os
from werkzeug.utils import secure_filename
from yolov5 import detect
from Models.upload_model import Upload

# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')

    return wrap


# Initial Route
@app.route("/", methods=["GET"])
def home():
    return jsonify("HELLO")


@app.route('/dashboard/')
@login_required
def dashboard():
    return jsonify('dashboard')

@app.route('/dashboard/data',methods=['GET'])
def dashboard_data():
    return Dashboard().get_dashboard_stats()


# Auth Routes
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()


@app.route('/user/signout')
def signout():
    return User().signout()


@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

# Data Routes

@app.route('/data/tweet_data', methods = ["GET"])
def all_tweet_data():
    return Data().get_all_tweet_data()

@app.route('/data/approved_images_data', methods = ["GET"])
def all_approved_images_data():
    return Data().get_all_approved_images_data()

@app.route('/data/nst_images_data', methods = ["GET"])
def all_nst_images_data():
    return Data().get_all_nst_images_data()

@app.route('/data/uploaded_images_data', methods = ["GET"])
def all_uploaded_images_data():
    return Data().get_uploaded_images_data()

@app.route('/data/rejected_images_data', methods = ["GET"])
def all_rejected_images_data():
    return Data().get_rejected_images_data()

#Uploaded Image

@app.route('/upload', methods = ['POST'])
def fileUpload():

    image_file = request.files['image']
    image_name = image_file.filename+"."+image_file.content_type.split("/")[1]
    image_description =  request.form['description'] if(request.form['description']) else ""
    target=os.path.join("Uploaded_images")
    if not os.path.isdir(target):
        os.mkdir(target)
    # print(image_file.content_type.split("/")[1])
    # filename = secure_filename(file.filename)
    Upload(image_name=image_name,image_description=image_description).main()
    destination="/".join([target, image_name])
    image_file.save(destination)
    session['uploadFilePath']=destination
    
    return jsonify(session['uploadFilePath'])




async def run_app():
    app.run(debug = True)

async def main():
    await asyncio.gather(run_app())

if __name__ == "__main__":
    # detect.run('bus_test2.jpg')
    app.run(debug=True)
    