import os
from twilio.rest import Client
from datetime import datetime

account_sid = "AC7bf377a64795b6a35ad94cac1b1f904c"
auth_token = "c80e4dad73694db6d7894c40b98fb1b3"

client = Client(account_sid, auth_token)
client.messages.create (
    to = "+16473235711",
    from_ = "+16475594970",
    body = "Hello, friend how is your day going?"
)