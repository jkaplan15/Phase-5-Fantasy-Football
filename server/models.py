from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ('-reviews',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    drafts = db.relationship('Draft', backref='user')


class Draft(db.Model, SerializerMixin):
    __tablename__ = 'drafts'

    id = db.Column(db.Integer, primary_key=True)
    rounds = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    draft_team_players = db.relationship('Draft_team_player', backref='draft')

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    rank_position = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    injury_risk = db.Column(db.String)

    draft_team_players = db.relationship('Draft_team_player', backref='player')

    serialize_rules = ('-draft_team_players',)



class Draft_team_player(db.Model, SerializerMixin):
    __tablename__ = 'draft_team_players'

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    draft_id = db.Column(db.Integer, db.ForeignKey('drafts.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)


class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    draft_team_players = db.relationship('Draft_team_player', backref = 'team')

class Prediction(db.Model, SerializerMixin):
    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    position = db.Column(db.String)
    rushyards = db.Column(db.Integer)
    receptions = db.Column(db.Integer)
    receivingyards = db.Column(db.Integer)
    finish = db.Column(db.Integer)
    reason = db.Column(db.String, nullable=False)
    expertanalysis = db.Column(db.String)



    
    







#     