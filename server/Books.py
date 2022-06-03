import os
import pdfplumber
import json
from Database import Database


class Books:
    def __init__(self):
        self.current_dir = f"{os.getcwd()}"

    def extract_text(self, file_path):
        try:
            """ converting pdf to text
            TODO: introduce a away to slice the chapters
            improve any time: i think it's took a light excessive amount of ram to run it
            """

            try:
                book = pdfplumber.open(file_path)
                pages = book.pages
            except:
                raise ValueError("Is it a pdf file?")

            text = ""
            for page in pages:
                text += page.extract_text()
            return text

        except:
            raise ValueError("There was a error while parsing this file.")

    def exist_book(title):
        database = Database()
        books = database.get_books(title)
        if books is None:
            return False

        if len(books) > 0:
            for book in books:
                if book["title"] == title:
                    return True
                else:
                    return False
