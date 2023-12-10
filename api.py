from flask import Blueprint, request, jsonify
import sqlite3

# app.py

api = Blueprint('api', __name__)

def query_db(query: str, params: tuple = ()) -> list:
    """Query the SQLite database and return all the results."""
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(query, params)
    results = cursor.fetchall()
    conn.close()
    return results

def execute_db(query: str, params: tuple = ()):
    """Execute an action on the SQLite database."""
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    conn.close()



@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = query_db("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    if not user:
        return jsonify({"status": "error", "message": "Invalid username or password"})
    return jsonify({"status": "success"})

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    existing_user = query_db("SELECT * FROM users WHERE username = ?", (username,))
    if existing_user:
        return jsonify({"status": "error", "message": "Username already exists"})
    execute_db("INSERT INTO users (username, password, score) VALUES (?, ?, 0)", (username, password))
    return jsonify({"status": "success"})

@api.route('/get_count', methods=['GET'])
def get_count():
    """Fetch the current count value from the database for a specific user."""
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    user_score = query_db("SELECT score FROM users WHERE username = ?", (username,))
    if not user_score:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({"count": user_score[0][0]})

@api.route('/increment', methods=['POST'])
def increment_count():
    """Increment the count value in the database for a specific user."""
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    current_score = query_db("SELECT score FROM users WHERE username = ?", (username,))
    if not current_score:
        return jsonify({'error': 'User not found'}), 404

    new_score = current_score[0][0] + 1
    execute_db("UPDATE users SET score = ? WHERE username = ?", (new_score, username))
    return jsonify({"new_count": new_score})


@api.route('/get_user_info', methods=['GET'])
def get_user_info():
    """
    Fetch additional information and score about a specific user.
    Returns a JSON object containing the user's additional info and score.
    """
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    # Fetch all the non-password fields for the user from the database
    user_row = query_db("SELECT username, score, soul_points, purchased_apps FROM users WHERE username = ?", (username,))
    if not user_row:
        return jsonify({'error': 'User not found'}), 404

    user_data = user_row[0]

    # Create a dictionary to hold the user's data
    user_info = {
        'username': user_data['username'],
        'score': user_data['score'],
        'soul_points': user_data['soul_points'],
        'purchased_apps': user_data['purchased_apps'].split(',') if user_data['purchased_apps'] else []
    }

    return jsonify(user_info)


@api.route('/has_access', methods=['GET'])
def has_access():
    """
    Check if the user has access to a specific app.
    """
    username = request.args.get('username')
    app_name = request.args.get('app_name')

    if not username or not app_name:
        return jsonify({'error': 'Both username and app_name are required'}), 400

    result = query_db("SELECT purchased_apps FROM users WHERE username = ?", (username,))
    if not result:
        return jsonify({'error': 'User not found'}), 404

    purchased_apps = result[0][0].split(',')
    if app_name in purchased_apps:
        return jsonify({'has_access': True})
    else:
        return jsonify({'has_access': False})

# 2) Add soul_points to the user's data
# This could be part of other functions like register or game reward mechanisms.
# For demonstration, let's create a separate function
@api.route('/add_soul_points', methods=['POST'])
def add_soul_points():
    """
    Add soul points to a user's account.
    """
    data = request.get_json()
    username = data['username']
    points_to_add = data['points']

    current_points = query_db("SELECT soul_points FROM users WHERE username = ?", (username,))
    new_points = current_points[0][0] + points_to_add
    execute_db("UPDATE users SET soul_points = ? WHERE username = ?", (new_points, username))
    return jsonify({"total_soul_points": new_points})

@api.route('/soul_points', methods=['GET'])
def soul_points():
    username = request.args.get('username', None)

    if username is None:
        return jsonify({"error": "username is required"}), 400

    current_points_result = query_db("SELECT soul_points FROM users WHERE username = ?", (username,))

    if not current_points_result:
        return jsonify({"error": "User not found"}), 404

    current_points = current_points_result[0]['soul_points']

    return jsonify({"soul_points": current_points})


@api.route('/purchase_app', methods=['POST'])
def purchase_app():
    """
    Enable a user to purchase an application with soul points.
    """
    data = request.get_json()
    username = data['username']
    app_name = data['app_name']
    app_cost = data['app_cost']  # In soul points

    # Fetch the user's current purchased apps
    purchased_apps = query_db("SELECT purchased_apps FROM users WHERE username = ?", (username,))[0][0]

    # Check if the user has already purchased this app
    if purchased_apps:
        purchased_apps_list = purchased_apps.split(',')
        if app_name in purchased_apps_list:
            return jsonify({'status': 'failed', 'message': f'You have already purchased {app_name}'})

    # Check if user has enough soul points
    current_points = query_db("SELECT soul_points FROM users WHERE username = ?", (username,))[0][0]
    if current_points < app_cost:
        return jsonify({'status': 'failed', 'message': 'Insufficient soul points'})

    # Deduct soul points and add the app to purchased_apps
    new_points = current_points - app_cost
    execute_db("UPDATE users SET soul_points = ? WHERE username = ?", (new_points, username))

    new_purchased_apps = purchased_apps + "," + app_name if purchased_apps else app_name
    execute_db("UPDATE users SET purchased_apps = ? WHERE username = ?", (new_purchased_apps, username))

    return jsonify({'status': 'success', 'message': f'Successfully purchased {app_name}'})
