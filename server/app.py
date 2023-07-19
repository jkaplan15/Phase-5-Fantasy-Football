#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, User, Draft, Player, Team, Draft_team_player, Prediction

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)

api = Api(app)

class Players(Resource):

#     @app.get('/check_session')
# def check_session():
#     user_id = session.get('user_id')
#     user = User.query.filter(User.id == user_id).first()
#     if user:
#         return user.to_dict(), 200
#     else:
#         return {"message": "Not logged in"}, 401

    def get(self):
        players = Player.query.all()

        response_body = [player.to_dict() for player in players]

        return make_response(jsonify(response_body), 200)

api.add_resource(Players, '/players')


class Predictions(Resource):

    def get(self):
        predictions = Prediction.query.all()
        response_body = [prediction.to_dict() for prediction in predictions]
        return make_response(jsonify(response_body), 200)
    
    def post(self):
        try:
            data = request.get_json()
            new_prediction = Prediction(
                name=data['name'], reason=data['reason'], image=data['image'])
            print(new_prediction)
            db.session.add(new_prediction)
            db.session.commit()
            response_body = new_prediction.to_dict()
            return make_response(jsonify(response_body), 201)
        except ValueError:
            return ValueError
    
api.add_resource(Predictions, '/predictions')

class PredictionsById(Resource):
    
    def get(self, id):
        predictions = Prediction.query.filter_by(id = id).first()
        response_body = predictions.to_dict()
        return make_response(jsonify(response_body), 200)
    
    def patch(self, id):
        predictions = Prediction.query.filter_by(id = id).first()
        if not predictions:
            response_body = {
                "error": "Prediction not found"
            }
            return make_response(jsonify(response_body), 404)
        try:
            data = request.get_json()
            for attr in data:
                setattr(predictions, attr, data[attr])
            db.session.add(predictions)
            db.session.commit()
            response_body = predictions.to_dict()
            return make_response(jsonify(response_body), 202)
        except ValueError:
            return {'error': 'validation errors'}, 400
    
    def delete(self, id):
        prediction = Prediction.query.get(id)
        db.session.delete(prediction)
        db.session.commit()
        return make_response(jsonify({'message': 'Prediction deleted'}), 204)

api.add_resource(PredictionsById, '/predictions/<int:id>')
        
if __name__ == '__main__':
    app.run(port=7777, debug=True)