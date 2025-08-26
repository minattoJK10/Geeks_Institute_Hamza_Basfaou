import psycopg2

def connect():
    return psycopg2.connect(
        dbname="auth_system",
        user="postgres",
        password="root",
        host="localhost",
        port="5432"
    )