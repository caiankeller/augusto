import requests
from Database import Database
import sys


class Translation():
    def __init__(self):
        database = Database()
        self.language = database.language

    def translate(self, text):
        api_root = "https://linguee-api-v2.herokuapp.com/api/v2"
        response = requests.get(
            f"{api_root}/translations", params={"query": "bacalhau", "src": "pt", "dst": "en"})
        return response
