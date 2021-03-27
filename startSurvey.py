# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure

def startSurvey(): #put in the user phone number from DB, to send all users this msg. 

    account_sid = 'AC7bf377a64795b6a35ad94cac1b1f904c'
    auth_token = 'c80e4dad73694db6d7894c40b98fb1b3'
    client = Client(account_sid, auth_token)

    execution = client.studio \
                    .flows('FWff8af5db81e5653e6ddf312a26593dca') \
                    .executions \
                    .create(to='+16473235711', from_='+16475594970')
    print(execution.sid)

startSurvey()