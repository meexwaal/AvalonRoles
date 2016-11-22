from flask import Flask, render_template, request, redirect
from enum import Enum
import math, random

app = Flask(__name__)
class Roles(Enum):
    NORMAL_GOOD = 0
    MERLIN = 1
    PERCIVAL = 2
    GOOD_LANCELOT = 3
    NORMAL_BAD = 4
    MORDRED = 5
    MORGANA = 6
    OBERON = 7
    SNAPE = 8
    BAD_LANCELOT = 9

gameData = {}

# Landing page
@app.route('/')
def get_index():
    return render_template('index.html')

# Comes in from main page
@app.route('/num_players')
def show_num_players():
    return render_template('num_players.html')
# Renders page to get number of players

# Gets number of players from num_players.html
@app.route('/setNumPlayers', methods = ['POST'])
def get_num_players():
    gameData['numPlayers'] = int(request.form['numPlayers'])
    return render_template('player_names.html',
                           numPlayers = int(gameData['numPlayers']))
# Renders page to get the names of the players

# Gets player names from player_names.html
@app.route('/setPlayerNames', methods = ['POST'])
def get_player_names():
    gameData['playerNames'] = request.form.getlist('name')
    return render_template('get_role_set.html',
                           NUMGOOD = num_good(gameData['numPlayers']),
                           NUMBAD = num_bad(gameData['numPlayers']))
# Renders page to get set of roles to use in this game

# Gets set of roles from get_role_set.html
@app.route('/redirectRoles', methods = ['POST'])
def set_roles():
    rset = request.form['submit']
    numGood = num_good(gameData['numPlayers'])
    numBad = num_bad(gameData['numPlayers'])

    if(rset == 'Custom'):
        return render_template('get_custom_roles.html',
                               NUMGOOD = numGood,
                               NUMBAD = numBad,
                               NUM_KNIGHTS = numGood - 2,
                               NUM_MERLIN = 1,
                               NUM_PERCIVAL = 1,
                               NUM_GOODL = 0,
                               NUM_SNAPE = 0,
                               NUM_MINIONS = (numBad - 3 if numBad >= 4 else 0),
                               NUM_MORDRED = 1,
                               NUM_MORGANA = 1,
                               NUM_OBERON = (1 if numBad >= 3 else 0),
                               NUM_BADL = 0)
    goodRoles = []
    badRoles = []
    if(rset == 'Bland'):
        goodRoles.extend([Roles.NORMAL_GOOD] * numGood)
        badRoles.extend([Roles.NORMAL_BAD] * numBad)
    elif(rset == 'Blind Spies'):
        goodRoles.extend([Roles.NORMAL_GOOD] * numGood)
        badRoles.extend([Roles.OBERON] * numBad)
    elif(rset == 'Party'):
        goodRoles.append(Roles.MERLIN)
        goodRoles.append(Roles.PERCIVAL)
        goodRoles.extend([Roles.NORMAL_GOOD] * (numGood - 2))
        badRoles.append(Roles.MORDRED)
        badRoles.append(Roles.MORGANA)
        if(numBad > 2):
            badRoles.append(Roles.OBERON)
        badRoles.extend([Roles.NORMAL_BAD] * (numBad - 3))
    elif(rset == 'Snape'):
        goodRoles.append(Roles.MERLIN)
        goodRoles.append(Roles.PERCIVAL)
        goodRoles.extend([Roles.NORMAL_GOOD] * (numGood - 2))
        badRoles.append(Roles.SNAPE)
        badRoles.append(Roles.MORDRED)
        if(numGood + 1 > 2):
            badRoles.append(Roles.MORGANA)
        if(numGood + 1 > 3):
            badRoles.append(Roles.OBERON)
        badRoles.extend([Roles.NORMAL_BAD] * (numGood + 1 - 4))
    elif(rset == 'Lancelot'):
        goodRoles.append(Roles.MERLIN)
        goodRoles.append(Roles.PERCIVAL)
        goodRoles.append(Roles.GOOD_LANCELOT)
        goodRoles.extend([Roles.NORMAL_GOOD] * (numGood - 3))
        badRoles.append(Roles.BAD_LANCELOT)
        badRoles.append(Roles.MORDRED)
        if(numBad > 2):
            badRoles.append(Roles.MORGANA)
        if(numBad > 3):
            badRoles.append(Roles.OBERON)
        badRoles.extend([Roles.NORMAL_BAD] * (numBad - 4))

    gameData['goodRoles'] = goodRoles
    gameData['badRoles'] = badRoles
    return redirect('/assignRoles')
# Routes to page to assign roles

# Comes in from get_custom_roles.html
@app.route('/setCustomRoles', methods = ['POST'])
def set_custom_roles():
    goodRoles = []
    badRoles = []
    goodRoles.extend([Roles.NORMAL_GOOD] * int(request.form['numKnights']))
    goodRoles.extend([Roles.MERLIN] * int(request.form['numMerlin']))
    goodRoles.extend([Roles.PERCIVAL] * int(request.form['numPercy']))
    goodRoles.extend([Roles.GOOD_LANCELOT] * int(request.form['numGoodLance']))
    badRoles.extend([Roles.NORMAL_BAD] * int(request.form['numMinions']))
    badRoles.extend([Roles.MORDRED] * int(request.form['numMordred']))
    badRoles.extend([Roles.MORGANA] * int(request.form['numMorgana']))
    badRoles.extend([Roles.BAD_LANCELOT] * int(request.form['numBadLance']))
    badRoles.extend([Roles.OBERON] * int(request.form['numOberon']))
    badRoles.extend([Roles.SNAPE] * int(request.form['numSnape']))
    if(len(goodRoles) < num_good(gameData['numPlayers']) or
       len(badRoles) < num_bad(gameData['numPlayers'])):
        return render_template('get_custom_roles.html',
                               MSG = "MISTAKE!",
                               NUMGOOD = num_good(gameData['numPlayers']),
                               NUMBAD = num_bad(gameData['numPlayers']),
                               NUM_KNIGHTS = int(request.form['numKnights']),
                               NUM_MERLIN = int(request.form['numMerlin']),
                               NUM_PERCIVAL = int(request.form['numPercy']),
                               NUM_GOODL = int(request.form['numGoodLance']),
                               NUM_SNAPE = int(request.form['numSnape']),
                               NUM_MINIONS = int(request.form['numMinions']),
                               NUM_MORDRED = int(request.form['numMordred']),
                               NUM_MORGANA = int(request.form['numMorgana']),
                               NUM_OBERON = int(request.form['numOberon']),
                               NUM_BADL = int(request.form['numBadLance']))

    gameData['goodRoles'] = goodRoles
    gameData['badRoles'] = badRoles
    return redirect('/assignRoles')
# Routes to page to assign roles

# Assigns roles
@app.route('/assignRoles')
def assign_roles():
    numGood = num_good(gameData['numPlayers'])
    numBad = num_bad(gameData['numPlayers'])
    assert(len(gameData['goodRoles']) >= numGood)
    assert(len(gameData['badRoles']) >= numBad)

    random.shuffle(gameData['goodRoles'])
    random.shuffle(gameData['badRoles'])
    gameRoles = gameData['goodRoles'][:numGood] + gameData['badRoles'][:numBad]
    random.shuffle(gameRoles)
    gameData['gameRoles'] = gameRoles
    return redirect('/pass_to/0/')
# Routes to page that says to pass to 0th player

# Comes from assignRoles ot showRole/<i-1>
@app.route('/pass_to/<int:i>/')
def show_to(i):
    if(i >= gameData['numPlayers']):
        return render_template('/done.html')
    return render_template('/pass_to.html',
                           INDEX = i, NAME = gameData['playerNames'][i])
# Renders page with instructions to pass to the ith player

# Comes from "pass to" page
@app.route('/showRole/<int:i>/')
def show_role(i):
    roles = gameData['gameRoles']
    names = gameData['playerNames']
    role = roles[i]
    name = gameData['playerNames'][i]
    nxt = i+1
    flav = get_flavor()
    public_spies = [names[j]
                    for j in range(0, gameData['numPlayers'])
                    if is_public_spy(roles[j])]

    # TODO: make role assingment amenable to multiple Morganas, Merlins, etc.
    # fix get_custom_roles maxs when you do

    if(role == Roles.NORMAL_GOOD):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "a Knight",
                               COLOR = "blue",
                               FLAVOR = flav)
    elif(role == Roles.MERLIN):
        merlin_spies = [names[j]
                        for j in range(0, gameData['numPlayers'])
                        if roles[j]
                        in [Roles.NORMAL_BAD, Roles.MORGANA, Roles.OBERON,
                            Roles.BAD_LANCELOT]]

        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Merlin",
                               COLOR = "blue",
                               SPIES = merlin_spies,
                               SNAPE = get_name(Roles.SNAPE, roles, names),
                               FLAVOR = flav)
    elif(role == Roles.PERCIVAL):
        percy = [get_name(Roles.MERLIN, roles, names),
                 get_name(Roles.MORGANA, roles, names)]
        random.shuffle(percy)
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Percival",
                               COLOR = "blue",
                               PERCY = percy,
                               FLAVOR = flav)
    elif(role == Roles.GOOD_LANCELOT):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Good Lancelot",
                               COLOR = "blue",
                               FLAVOR = flav)
    elif(role == Roles.NORMAL_BAD):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "a Minion",
                               COLOR = "red",
                               SPIES = public_spies,
                               BADL = get_name(Roles.BAD_LANCELOT,roles, names),
                               FLAVOR = flav)
    elif(role == Roles.MORDRED):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Mordred",
                               COLOR = "red",
                               SPIES = public_spies,
                               BADL = get_name(Roles.BAD_LANCELOT,roles, names),
                               FLAVOR = flav)
    elif(role == Roles.MORGANA):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Morgana",
                               COLOR = "red",
                               SPIES = public_spies,
                               BADL = get_name(Roles.BAD_LANCELOT,roles, names),
                               FLAVOR = flav)
    elif(role == Roles.OBERON):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Oberon",
                               COLOR = "red",
                               FLAVOR = flav)
    elif(role == Roles.BAD_LANCELOT):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Evil Lancelot",
                               COLOR = "red",
                               FLAVOR = flav)
    elif(role == Roles.SNAPE):
        return render_template('show_role.html',
                               NEXT = nxt,
                               NAME = name,
                               ROLE = "Snape",
                               COLOR = "blue",
                               SPIES = public_spies,
                               BADL = get_name(Roles.BAD_LANCELOT,roles, names),
                               MERLIN = get_name(Roles.MERLIN, roles, names),
                               FLAVOR = flav)
    else:
        return redirect('/')
# Renders role information page specific to what role they have

# Comes in from page asking how to start over
@app.route('/restart', methods = ['POST'])
def redirect_restart():
    option = request.form['submit']
    if(option == "Same Setup"):
        return redirect('/assignRoles')
    elif(option == "New Roles"):
        return render_template('get_role_set.html',
                               NUMGOOD = num_good(gameData['numPlayers']),
                               NUMBAD = num_bad(gameData['numPlayers']))
    elif(option == "New Players"):
        return redirect('/num_players')
    else:
        return redirect('/')
# Renders appropriate page

# -------- #

# Returns number of good or bad players in a game with num_players players
def num_good(num_players):
    return math.floor(num_players * 2 / 3)
def num_bad(num_players):
    return math.ceil(num_players / 3)

# Returns true if the role provided is a spy that the other spies can see
def is_public_spy(role):
    return role in [Roles.NORMAL_BAD, Roles.MORDRED, Roles.MORGANA, Roles.SNAPE]

# Returns the player name for the role provided
def get_name(role, roles, names):
    return (names[roles.index(role)] if role in roles else "")

# Provides random flavor text
def get_flavor():
    flavors = ["What do you call a sleeping cow? A bull-dozer",
               """Fun Science Fact: All jellyfish are immortal. Their jelly-like
               flesh repels all predators, including the spectre of death.""",
               """'Twas brillig, and the slithy toves did gyre and gimble in the
               wabe: All mimsy were the borogoves, and the mome raths outgrabe.
               """,
               """Remember: Whenever you have an extra half of a rotisserie
               chicken, lend it to a friend in need. When you find yourself in
               need further along the road, your friends will remember your
               generosity.""",
               """As the venerable Subra Suresh often reminds us, we are able to
               attend this wonderful institution because of Andrew Carnegie's
               dedication to the pursuit of knowledge. As he once wrote, \"My
               heart is in the twerk\".""",
               "MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMES"]
    return random.choice(flavors)

# Flask needs this and I don't understand python enough to question it
if __name__ == '__main__':
    app.run()
