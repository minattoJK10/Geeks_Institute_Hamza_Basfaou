import requests
import random
import psycopg2

# Database connection
def connect():
    return psycopg2.connect(
        dbname="countries_db",
        user="postgres",
        password="root",
        host="localhost",
        port="5432"
    )
# Fetch countries from API
def fetch_countries():
    url = "https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

# Insert country into DB
def insert_country(country):
    conn = connect()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO countries (name, capital, flag, subregion, population)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (name) DO NOTHING
    """, (
        country["name"]["common"],
        country.get("capital", ["Unknown"])[0] if country.get("capital") else "Unknown",
        country.get("flag", "🏳️"),
        country.get("subregion", "Unknown"),
        country.get("population", 0)
    ))
    conn.commit()
    cur.close()
    conn.close()

def main():
    countries = fetch_countries()
    random_countries = random.sample(countries, 10)

    for country in random_countries:
        insert_country(country)
        print(f"Inserted: {country['name']['common']}")

if __name__ == "__main__":
    main()