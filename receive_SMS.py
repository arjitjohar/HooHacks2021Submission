from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("Hi! /n Welcome to moodBuddy! /n Sign in by entering your username and password /n or /n make ")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)