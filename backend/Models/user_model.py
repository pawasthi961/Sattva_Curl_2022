from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from bson.objectid import ObjectId
from bson.json_util import dumps
from config import *
import json


class User:

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return user ,200

    def signup(self):
        print(request.form)

        # Create the user object
        user = {
            "name": request.json['name'],
            "email": request.json['email'],
            "password": request.json['password']
        }

        # Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # Check for existing email address
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email address already in use"}), 400

        if db.users.insert_one(user):
            print(user)
            print(type(user))
            return self.start_session(json.loads(dumps(user)))

        return jsonify({"error": "Signup failed"}), 400

    def signout(self):
        print(session)
        session.clear()
        
        return redirect('/')

    def login(self):
        _email = request.json["email"]
        _password = request.json["password"]

        user = db.users.find_one({
            "email": _email
        })

        if user and pbkdf2_sha256.verify(_password, user['password']):

            return self.start_session(json.loads(dumps(user)))

        return jsonify({"error": "Invalid login credentials"}), 401
