import sqlite3

class User:
    def __init__(self, username: str, password: str, score: int = 0):
        self.username = username
        self.password = password
        self.score = score

    def to_dict(self):
        return {
            'username': self.username,
            'score': self.score,
        }

# Alter your init_db function to add soul_points column
def init_db():
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS users (
                    username TEXT PRIMARY KEY,
                    password TEXT NOT NULL,
                    score INT DEFAULT 0,
                    soul_points INT DEFAULT 0,
                    purchased_apps TEXT DEFAULT ''
                    );""")
    conn.commit()
    conn.close()