#!/usr/bin/env python3

from app import app
from models import db, User, Draft, Player, Team, Draft_team_player, Prediction

with app.app_context():
    
    User.query.delete()
    Draft.query.delete()
    Player.query.delete()
    Team.query.delete()
    Draft_team_player.query.delete()
    Prediction.query.delete()

    users = []

    users.append(User(username="jkaplan1", email="jkap1@icloud.com", password="123"))
    users.append(User(username="jkaplan2", email="jkap2@icloud.com", password="123"))
    users.append(User(username="jkaplan3", email="jkap3@icloud.com", password="123"))

    drafts = []

    drafts.append(Draft(rounds=1, user_id=1))
    drafts.append(Draft(rounds=2, user_id=1))
    drafts.append(Draft(rounds=3, user_id=2))
    drafts.append(Draft(rounds=4, user_id=2))


    added_players = []

    players = [
        {"playerId":"1941","name":"Justin Jefferson","team":"MIN","position":"WR","rank":1,"rank_position":1,"injury_risk":"low"},{"playerId":"954","name":"Christian McCaffrey","team":"SF","position":"RB","rank":2,"rank_position":1,"injury_risk":"high"},{"playerId":"1907","name":"Jonathan Taylor","team":"IND","position":"RB","rank":3,"rank_position":2,"injury_risk":"medium"},{"playerId":"2366","name":"Ja'Marr Chase","team":"CIN","position":"WR","rank":4,"rank_position":2,"injury_risk":"low"},{"playerId":"341","name":"Travis Kelce","team":"KC","position":"TE","rank":5,"rank_position":1,"injury_risk":"medium"},{"playerId":"978","name":"Cooper Kupp","team":"LAR","position":"WR","rank":6,"rank_position":3,"injury_risk":"medium"},{"playerId":"1216","name":"Saquon Barkley","team":"NYG","position":"RB","rank":7,"rank_position":3,"injury_risk":"high"},{"playerId":"1148","name":"Austin Ekeler","team":"LAC","position":"RB","rank":8,"rank_position":4,"injury_risk":"high"},{"playerId":"848","name":"Tyreek Hill","team":"MIA","position":"WR","rank":9,"rank_position":4,"injury_risk":"medium"},{"playerId":"3145","name":"Bijan Robinson","team":"ATL","position":"RB","rank":10,"rank_position":5,"injury_risk":""},{"playerId":"1221","name":"Nick Chubb","team":"CLE","position":"RB","rank":11,"rank_position":6,"injury_risk":"medium"},{"playerId":"729","name":"Derrick Henry","team":"TEN","position":"RB","rank":12,"rank_position":7,"injury_risk":"high"},{"playerId":"451","name":"Davante Adams","team":"LV","position":"WR","rank":13,"rank_position":5,"injury_risk":"high"},{"playerId":"1533","name":"Josh Jacobs","team":"LV","position":"RB","rank":14,"rank_position":8,"injury_risk":"medium"},{"playerId":"1560","name":"A.J. Brown","team":"PHI","position":"WR","rank":15,"rank_position":6,"injury_risk":"low"},{"playerId":"594","name":"Stefon Diggs","team":"BUF","position":"WR","rank":16,"rank_position":7,"injury_risk":"low"},{"playerId":"1937","name":"CeeDee Lamb","team":"DAL","position":"WR","rank":17,"rank_position":8,"injury_risk":"low"},{"playerId":"2802","name":"Garrett Wilson","team":"NYJ","position":"WR","rank":18,"rank_position":9,"injury_risk":""},{"playerId":"945","name":"Patrick Mahomes","team":"KC","position":"QB","rank":19,"rank_position":1,"injury_risk":"medium"},{"playerId":"2338","name":"Travis Etienne","team":"JAC","position":"RB","rank":20,"rank_position":9,"injury_risk":"high"},{"playerId":"2372","name":"Amon-Ra St. Brown","team":"DET","position":"WR","rank":21,"rank_position":10,"injury_risk":"low"},{"playerId":"2369","name":"Jaylen Waddle","team":"MIA","position":"WR","rank":22,"rank_position":11,"injury_risk":"low"},{"playerId":"1205","name":"Josh Allen","team":"BUF","position":"QB","rank":23,"rank_position":2,"injury_risk":"high"},{"playerId":"2344","name":"Rhamondre Stevenson","team":"NE","position":"RB","rank":24,"rank_position":10,"injury_risk":"low"},{"playerId":"1545","name":"Tony Pollard","team":"DAL","position":"RB","rank":25,"rank_position":11,"injury_risk":"medium"},{"playerId":"2757","name":"Breece Hall","team":"NYJ","position":"RB","rank":26,"rank_position":12,"injury_risk":""},{"playerId":"1940","name":"Tee Higgins","team":"CIN","position":"WR","rank":27,"rank_position":12,"injury_risk":"high"},{"playerId":"1888","name":"Jalen Hurts","team":"PHI","position":"QB","rank":28,"rank_position":3,"injury_risk":"low"},{"playerId":"1268","name":"Mark Andrews","team":"BAL","position":"TE","rank":29,"rank_position":2,"injury_risk":"low"},{"playerId":"2367","name":"DeVonta Smith","team":"PHI","position":"WR","rank":30,"rank_position":13,"injury_risk":"high"},{"playerId":"2803","name":"Chris Olave","team":"NO","position":"WR","rank":31,"rank_position":14,"injury_risk":""},{"playerId":"2760","name":"Kenneth Walker","team":"SEA","position":"RB","rank":32,"rank_position":13,"injury_risk":""},{"playerId":"2339","name":"Najee Harris","team":"PIT","position":"RB","rank":33,"rank_position":14,"injury_risk":"medium"},{"playerId":"1558","name":"DK Metcalf","team":"SEA","position":"WR","rank":34,"rank_position":15,"injury_risk":"low"},{"playerId":"1589","name":"Deebo Samuel","team":"SF","position":"WR","rank":35,"rank_position":16,"injury_risk":"medium"},{"playerId":"586","name":"Amari Cooper","team":"CLE","position":"WR","rank":36,"rank_position":17,"injury_risk":"low"},{"playerId":"952","name":"Dalvin Cook","team":"MIN","position":"RB","rank":37,"rank_position":15,"injury_risk":"high"},{"playerId":"1882","name":"Joe Burrow","team":"CIN","position":"QB","rank":38,"rank_position":4,"injury_risk":"high"},{"playerId":"1209","name":"Lamar Jackson","team":"BAL","position":"QB","rank":39,"rank_position":5,"injury_risk":"low"},{"playerId":"1241","name":"D.J. Moore","team":"CHI","position":"WR","rank":40,"rank_position":18,"injury_risk":"low"},{"playerId":"1235","name":"Calvin Ridley","team":"JAC","position":"WR","rank":41,"rank_position":19,"injury_risk":"low"},{"playerId":"2766","name":"Dameon Pierce","team":"HOU","position":"RB","rank":42,"rank_position":16,"injury_risk":""},{"playerId":"2838","name":"Christian Watson","team":"GB","position":"WR","rank":43,"rank_position":20,"injury_risk":""},{"playerId":"1104","name":"Aaron Jones","team":"GB","position":"RB","rank":44,"rank_position":17,"injury_risk":"high"},{"playerId":"1905","name":"J.K. Dobbins","team":"BAL","position":"RB","rank":45,"rank_position":18,"injury_risk":"high"},{"playerId":"1088","name":"George Kittle","team":"SF","position":"TE","rank":46,"rank_position":3,"injury_risk":"high"},{"playerId":"2323","name":"Justin Fields","team":"CHI","position":"QB","rank":47,"rank_position":6,"injury_risk":"low"},{"playerId":"1938","name":"Jerry Jeudy","team":"DEN","position":"WR","rank":48,"rank_position":21,"injury_risk":"high"},{"playerId":"334","name":"Keenan Allen","team":"LAC","position":"WR","rank":49,"rank_position":22,"injury_risk":"high"},{"playerId":"3146","name":"Jahmyr Gibbs","team":"DET","position":"RB","rank":50,"rank_position":19,"injury_risk":""},{"playerId":"1591","name":"T.J. Hockenson","team":"MIN","position":"TE","rank":51,"rank_position":4,"injury_risk":"high"},{"playerId":"338","name":"DeAndre Hopkins","team":"ARI","position":"WR","rank":52,"rank_position":23,"injury_risk":"low"},{"playerId":"1539","name":"Miles Sanders","team":"CAR","position":"RB","rank":53,"rank_position":20,"injury_risk":"high"},{"playerId":"1565","name":"Terry McLaurin","team":"WAS","position":"WR","rank":54,"rank_position":24,"injury_risk":"medium"},{"playerId":"955","name":"Joe Mixon","team":"CIN","position":"RB","rank":55,"rank_position":21,"injury_risk":"high"},{"playerId":"1904","name":"Cam Akers","team":"LAR","position":"RB","rank":56,"rank_position":22,"injury_risk":"medium"},{"playerId":"1884","name":"Justin Herbert","team":"LAC","position":"QB","rank":57,"rank_position":7,"injury_risk":"medium"},{"playerId":"447","name":"Mike Evans","team":"TB","position":"WR","rank":58,"rank_position":25,"injury_risk":"low"},{"playerId":"2414","name":"Kyle Pitts","team":"ATL","position":"TE","rank":59,"rank_position":5,"injury_risk":"medium"},{"playerId":"595","name":"Tyler Lockett","team":"SEA","position":"WR","rank":60,"rank_position":26,"injury_risk":"low"},{"playerId":"2800","name":"Drake London","team":"ATL","position":"WR","rank":61,"rank_position":27,"injury_risk":""},{"playerId":"977","name":"Chris Godwin","team":"TB","position":"WR","rank":62,"rank_position":28,"injury_risk":"low"},{"playerId":"970","name":"Mike Williams","team":"LAC","position":"WR","rank":63,"rank_position":29,"injury_risk":"high"},{"playerId":"1271","name":"Dallas Goedert","team":"PHI","position":"TE","rank":64,"rank_position":6,"injury_risk":"medium"},{"playerId":"637","name":"Darren Waller","team":"NYG","position":"TE","rank":65,"rank_position":7,"injury_risk":"low"},{"playerId":"1239","name":"Christian Kirk","team":"JAC","position":"WR","rank":66,"rank_position":30,"injury_risk":"high"},{"playerId":"2798","name":"Isiah Pacheco","team":"KC","position":"RB","rank":67,"rank_position":23,"injury_risk":""},{"playerId":"1945","name":"Brandon Aiyuk","team":"SF","position":"WR","rank":68,"rank_position":31,"injury_risk":"low"},{"playerId":"967","name":"James Conner","team":"ARI","position":"RB","rank":69,"rank_position":24,"injury_risk":"high"},{"playerId":"2770","name":"Rachaad White","team":"TB","position":"RB","rank":70,"rank_position":25,"injury_risk":""},{"playerId":"1947","name":"Michael Pittman","team":"IND","position":"WR","rank":71,"rank_position":32,"injury_risk":"high"},{"playerId":"1531","name":"David Montgomery","team":"DET","position":"RB","rank":72,"rank_position":26,"injury_risk":"medium"},{"playerId":"2322","name":"Trevor Lawrence","team":"JAC","position":"QB","rank":73,"rank_position":8,"injury_risk":"low"},{"playerId":"2804","name":"Jahan Dotson","team":"WAS","position":"WR","rank":74,"rank_position":33,"injury_risk":""},{"playerId":"956","name":"Alvin Kamara","team":"NO","position":"RB","rank":75,"rank_position":27,"injury_risk":"medium"},{"playerId":"2341","name":"Javonte Williams","team":"DEN","position":"RB","rank":76,"rank_position":28,"injury_risk":"low"},{"playerId":"1561","name":"Marquise Brown","team":"ARI","position":"WR","rank":77,"rank_position":34,"injury_risk":"high"},{"playerId":"3170","name":"Jordan Addison","team":"MIN","position":"WR","rank":78,"rank_position":35,"injury_risk":""},{"playerId":"2801","name":"Treylon Burks","team":"TEN","position":"WR","rank":79,"rank_position":36,"injury_risk":""},{"playerId":"1654","name":"Diontae Johnson","team":"PIT","position":"WR","rank":80,"rank_position":37,"injury_risk":"high"},{"playerId":"3169","name":"Jaxon Smith-Njigba","team":"SEA","position":"WR","rank":81,"rank_position":38,"injury_risk":""},{"playerId":"2811","name":"George Pickens","team":"PIT","position":"WR","rank":82,"rank_position":39,"injury_risk":""},{"playerId":"1902","name":"D'Andre Swift","team":"PHI","position":"RB","rank":83,"rank_position":29,"injury_risk":"high"},{"playerId":"2416","name":"Pat Freiermuth","team":"PIT","position":"TE","rank":84,"rank_position":8,"injury_risk":"low"},{"playerId":"2764","name":"James Cook","team":"BUF","position":"RB","rank":85,"rank_position":30,"injury_risk":""},{"playerId":"942","name":"Deshaun Watson","team":"CLE","position":"QB","rank":86,"rank_position":9,"injury_risk":"medium"},{"playerId":"990","name":"Evan Engram","team":"JAC","position":"TE","rank":87,"rank_position":9,"injury_risk":"high"},{"playerId":"1950","name":"Gabriel Davis","team":"BUF","position":"WR","rank":88,"rank_position":40,"injury_risk":"low"},{"playerId":"725","name":"Dak Prescott","team":"DAL","position":"QB","rank":89,"rank_position":10,"injury_risk":"low"},{"playerId":"992","name":"David Njoku","team":"CLE","position":"TE","rank":90,"rank_position":10,"injury_risk":"high"},{"playerId":"450","name":"Brandin Cooks","team":"DAL","position":"WR","rank":91,"rank_position":41,"injury_risk":"low"},{"playerId":"1910","name":"AJ Dillon","team":"GB","position":"RB","rank":92,"rank_position":31,"injury_risk":"high"},{"playerId":"2356","name":"Khalil Herbert","team":"CHI","position":"RB","rank":93,"rank_position":32,"injury_risk":"low"},{"playerId":"1220","name":"Rashaad Penny","team":"PHI","position":"RB","rank":94,"rank_position":33,"injury_risk":"medium"},{"playerId":"2374","name":"Kadarius Toney","team":"KC","position":"WR","rank":95,"rank_position":42,"injury_risk":"high"},{"playerId":"1883","name":"Tua Tagovailoa","team":"MIA","position":"QB","rank":96,"rank_position":11,"injury_risk":"high"},{"playerId":"3172","name":"Quentin Johnston","team":"LAC","position":"WR","rank":97,"rank_position":43,"injury_risk":""},{"playerId":"230","name":"Kirk Cousins","team":"MIN","position":"QB","rank":98,"rank_position":12,"injury_risk":"low"},{"playerId":"748","name":"Michael Thomas","team":"NO","position":"WR","rank":99,"rank_position":44,"injury_risk":"high"},{"playerId":"1362","name":"Dalton Schultz","team":"HOU","position":"TE","rank":100,"rank_position":11,"injury_risk":"low"}]

    for player in players:
        p = Player(position=player['position'], name=player['name'], rank_position=player['rank_position'], rank=player['rank'], injury_risk=player['injury_risk'])
        added_players.append(p)

    teams = []

    teams.append(Team(name="team1"))
    teams.append(Team(name="team2"))
    teams.append(Team(name="team3"))

    draft_team_players = []

    draft_team_players.append(Draft_team_player(team_id=1, draft_id=2, player_id=3))
    draft_team_players.append(Draft_team_player(team_id=1, draft_id=3, player_id=3))
    draft_team_players.append(Draft_team_player(team_id=1, draft_id=4, player_id=3))

    added_predictions = []

    predictions = [
        {
      "id": 1,
      "name": "Austin Ekeler",
      "image": "https://library.sportingnews.com/styles/twitter_card_120x120/s3/2021-10/austin-ekeler-092020-getty-ftr_1p7eebhpmwduz1qk72izhdbs7x.jpg?itok=w-SJEjPY",
      "position": "RB",
      "rushyards": "915",
      "receptions": "107",
      "receivingyards": "722",
      "finish": "RB1",
      "reason": "will explain later",
      "expertanalysis": "https://www.rotoballer.com/who-is-the-no-1-overall-pick-for-2023-fantasy-football-austin-ekeler/1126330"
    },
    {
      "id": 2,
      "name": "Justin Jefferson",
      "image": "https://www.sharpfootballanalysis.com/wp-content/uploads/2022/01/DFS-ranks-value-week-18-2021-scaled.jpg",
      "position": "WR",
      "rushyards": "24",
      "receptions": "128",
      "receivingyards": "1809",
      "finish": "WR1",
      "reason": "will explain later",
      "expertanalysis": "https://www.rotoballer.com/who-is-the-no-1-overall-pick-for-2023-fantasy-football-justin-jefferson-fantasy-football-outlook/1126533"
    },
    {
      "id": 3,
      "name": "Saquon Barkley",
      "image": "https://cdn.vox-cdn.com/thumbor/P7imISR1ZeUEJ8L5cG1XUhGgiAg=/0x0:3000x1999/1200x800/filters:focal(1187x241:1667x721)/cdn.vox-cdn.com/uploads/chorus_image/image/72210689/1457727885.0.jpg",
      "position": "RB",
      "rushyards": "1312",
      "receptions": "57",
      "receivingyards": "338",
      "finish": "RB5",
      "reason": "will explain later",
      "expertanalysis": "https://www.rotoballer.com/who-is-the-no-1-overall-pick-for-2023-fantasy-football-saquon-barkley-fantasy-football-outlook/1126352"
    },
    {
      "id": 4,
      "name": "Cooper Kupp",
      "image": "https://library.sportingnews.com/2021-10/cooper-kupp-100621-getty-ftr_1n0zqf0b0i6581k44uuysl3b89.jpg",
      "position": "WR",
      "rushyards": "1007",
      "receptions": "39",
      "receivingyards": "371",
      "finish": "NA",
      "reason": "will explain later",
      "expertanalysis": "https://www.profootballnetwork.com/cooper-kupp-dynasty-profile-2023/"
    },
    {
      "id": 5,
      "name": "Christian McCaffrey",
      "image": "https://www.profootballnetwork.com/wp-content/uploads/2023/06/Christian-McCaffrey-Trade-Revisited-Who-Were-the-Real-Winners-and-Losers-from-San-Francisco-49ers-Carolina-Panthers-Trade-scaled.jpg",
      "position": "WR",
      "rushyards": "1139",
      "receptions": "85",
      "receivingyards": "741",
      "finish": "RB2",
      "reason": "will explain later",
      "expertanalysis": "https://www.rotoballer.com/who-is-the-no-1-overall-pick-for-2023-fantasy-football-should-christian-mccaffrey-be-drafted-first/1126606"
    },
    {
      "id": 8,
      "name": "Bijan Robinson",
      "image": "https://i.ytimg.com/vi/AHXWNM7-40c/maxresdefault.jpg",
      "position": "RB",
      "rushyards": "NA",
      "receptions": "NA",
      "receivingyards": "NA",
      "finish": "NA",
      "reason": "will explain later",
      "expertanalysis": "https://www.espn.in/fantasy/football/story/_/id/37474786/2023-fantasy-football-draft-rankings-bijan-robinson-atlanta-falcons"
    }
  ]

    for prediction in predictions:
        p = Prediction(name=prediction['name'], image=prediction['image'], position=prediction['position'], rushyards=prediction['rushyards'], receptions=prediction['receptions'], receivingyards=prediction['receivingyards'], finish=prediction['finish'], reason=prediction['reason'], expertanalysis=prediction['expertanalysis'] )
        added_predictions.append(p)





    
    
   


    


    db.session.add_all(users)
    db.session.add_all(drafts)
    db.session.add_all(added_players)
    db.session.add_all(teams)
    db.session.add_all(draft_team_players)
    db.session.add_all(added_predictions)



    # db.session.add_all(reviews)
    db.session.commit()
    print("🌱 Users, Drafts, Players, Teams, Draft_team_players, Predictions successfully seeded! 🌱")
