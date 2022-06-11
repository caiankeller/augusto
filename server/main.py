import os
import uuid
from Books import Books
from Database import Database
from langdetect import detect
from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route("/")
@app.route("/book", methods=["POST"])
async def book_add():
    current_dir = f"{os.getcwd()}"
    file = request.files["file"]

    # get filename and extension of the file
    last_dot = file.filename.rfind(".")
    extension = file.filename[last_dot:]
    filename = file.filename[:last_dot]

    books = Books()
    if(books.exist_book()):
        return jsonify({"message": "This book already exists"}), 400

    # move file to pdf books folder
    file.save(f"{current_dir}/pdf/{filename}{extension}")

    try:
        text = books.extract_text(f"{current_dir}/pdf/{filename}{extension}")
    except ValueError as er:
        return jsonify({"message": str(er)}), 400

    # move the converted pdf to text books folder
    with open(f"{current_dir}/txt/{filename}.txt", "w") as f:
        f.write(text)

    # TODO: slice some text from the book to minimize the time to detect it's language
    # use the title can be imprecise, but it's better than nothing
    detected_language = detect(text)

    languages = {
        "en": "English",
        "de": "German",
        "fr": "French",
        "es": "Spanish",
        "it": "Italian",
        "pt": "Portuguese",
        "ru": "Russian",
        "ja": "Japanese",
        "zh": "Chinese",
        "ko": "Korean"
    }

    detected_language = languages.get(detected_language, "Unknown")

    # create object to save in the database
    id = str(uuid.uuid4())
    to_save_book = {
        "id": id,
        "title": filename,
        "language": detected_language,
        # TODO: introduce some very cool things to put in the db, maybe book's path
    }

    # save the book in the database
    database = Database()
    database.dump_book(to_save_book)

    return jsonify(to_save_book), 200


@app.route("/books", methods=["GET"])
async def books_get():
    args = request.args
    args.to_dict()
    title = args.get("title")

    database = Database()
    books = database.get_books(title)
    return jsonify(books), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
