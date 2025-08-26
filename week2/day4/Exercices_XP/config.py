import psycopg2
def connect():
    return psycopg2.connect(
        dbname="restaurant",
        user="postgres",
        password="root",
        host="localhost",
        port="5432"
    )