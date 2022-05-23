import os
import json
import uuid
import pdfplumber

from langdetect import detect
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/")
@app.route("/book", methods=["POST"])
async def book_add():
    current_dir = f"{os.getcwd()}"
    file = request.files["file"]

    # getting filename and extension
    last_dot = file.filename.rfind(".")
    extension = file.filename[last_dot:]
    filename = file.filename[:last_dot]

    # verify is there is a book with the same name as filename and aborting if yes
    with open(f"{current_dir}/books.json") as f:
        books = json.load(f)
    if len(books["data"]) > 0:
        for book in books["data"]:
            if book["title"] == filename:
                message = {"message": "Book already exists"}
                return jsonify(message), 400

    # moving file to pdf books folder
    file.save(f"{current_dir}/raw/{filename}{extension}")

    # converting pdf to text
    book = pdfplumber.open(f"{current_dir}/raw/{filename}{extension}")
    pages = book.pages
    title = book.metadata

    text = ""
    for page in pages:
        text += page.extract_text()

    with open(f"{current_dir}/text/{filename}.txt", "w") as f:
        f.write(text)

    detected_language = detect(text)

    id = str(uuid.uuid4())
    to_save_book = {
        "id": id,
        "title": filename,
        "language": detected_language,
        # it's all for now :D
    }

    with open(f"{current_dir}/books.json", "r+") as f:
        books = json.load(f)
        books["data"].append(to_save_book)
        f.seek(0)
        json.dump(books, f, indent=4)

    return "OK"


@app.route("/books", methods=["GET"])
async def books_get():
    current_dir = f"{os.getcwd()}"
    with open(f"{current_dir}/books.json") as f:
        books = json.load(f)

    return jsonify(books["data"])


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
