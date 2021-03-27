import pyrebase

config = {
  "apiKey": "AIzaSyBpsvNpZBeLEMLsApvOSFQw1zjac5vTk9E",
  "authDomain": "moodbuddy-c5dae.firebaseapp.com",
  "projectId": "moodbuddy-c5dae",
  "storageBucket": "moodbuddy-c5dae.appspot.com",
  "messagingSenderId": "457194305402",
  "appId": "1:457194305402:web:ace2d25f8ad9f7595588c3",
  "measurementId": "G-NS0P4WJN5V"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
@app.route('/', methods=['GET', 'POST'])

def basic():
    if request.method == 'POST':
        email = request.form['name']
        password = request.form['pass']
        auth.sign_in_with_email_and_password(email, password)
    return 'Login is successful'

if __name__ == '__main__':
    app.run()