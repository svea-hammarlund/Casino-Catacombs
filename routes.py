from flask import Blueprint, render_template

routes = Blueprint('routes', __name__)




# Define the route for the Login URL
@routes.route('/')
def index():
    return render_template('index.html')







# Define the route for the store page
@routes.route('/store')
def store_page():
    return render_template('store.html')


# Define the route for the clicker counter game page
@routes.route('/countergame')
def countergame_page():
    return render_template('countergame.html')


# Define the route for the tic-tac-toe game page
@routes.route('/tictactoe')
def tictactoe_page():
    return render_template('tictactoe.html')


# Define the route for the login page
@routes.route('/login')
def login_page():
    return render_template('login.html')


# Define the route for the logout page
@routes.route('/logout')
def logout_page():
    return render_template('logout.html')

# Define the route for the connect4 game page
@routes.route('/connectfour')
def connect4_page():
    return render_template('connectfour.html')

# Define the route for the hangman game page
@routes.route('/hangman')
def hangman_page():
    return render_template('hangman.html')

@routes.route('/roulette')
def roulette_page():
    return render_template('roulette.html')

@routes.route('/bingo')
def bingo_page():
    return render_template('bingo.html')

@routes.route('/pacman')
def pacman_p():
    return render_template('pacman.html')

@routes.route('/blackjack')
def blackjack_page():
    return render_template('blackjack.html')

@routes.route('/idle')
def idle_page():
    return render_template('idle.html')

@routes.route('/slots')
def slots_page():
    return render_template('slots.html')
    
@routes.route('/casinocatacombs')
def casinocatacombs_page():
    return render_template('casinocatacombs.html')

@routes.route('/deathshop')
def deathshop_page():
    return render_template('deathshop.html')

@routes.route('/instructions')
def instructions_page():
    return render_template('instructions.html')