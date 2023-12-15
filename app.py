from flask import Flask
from models import init_db
from routes import routes
from api import api  # Import the new blueprint

app = Flask(__name__)

app.register_blueprint(routes)
app.register_blueprint(api, url_prefix='/api')  # Register the new blueprint with a url_prefix

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=8080)  # Run the app with desired configurations




