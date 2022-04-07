from api.views import app, socketio

"""You can edit the routes in the views.py file"""

# Run app
if __name__ == "__main__":
    socketio.run(app, port=8888)
