import os
import json


class Database:
    def __init__(self):
        self.database_dir = f"{os.getcwd()}/books.json"
        with open(self.database_dir, "r+") as f:
            books = json.load(f)
        self.books = books["data"]

    def dump_book(self, book):
        with open(self.database_dir, "r+") as f:
            books = json.load(f)
            books["data"].append(book)
            f.seek(0)
            json.dump(books, f, indent=4)

    def get_books(self, title=None):
        if title is None:
            return self.books
        else:
            for book in self.books:
                if book["title"] == title:
                    text = self.__get_text(title)
                    return text

    def delete_book(self, title):
        for book in self.books["data"]:
            if book["title"] == title:
                self.books["data"].remove(book)
                with open(self.database_dir, "w") as f:
                    json.dump(self.books, f, indent=4)
                return True

    def __get_text(self, title):
        text = ""
        with open(f"{os.getcwd()}/txt/{title}.txt", "r") as f:
            text = f.read()
        words_per_quarter = int(len(text) / 4)
        text = list(map(''.join, zip(*[iter(text)] * words_per_quarter)))
        return text
