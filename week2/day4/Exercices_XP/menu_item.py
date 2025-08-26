from config import connect


class MenuItem:
    def __init__(self, name, price):
        self.item_name = name
        self.item_price = price

    def save(self):
        conn = connect()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id",
            (self.item_name, self.item_price)
        )
        conn.commit()
        cur.close()
        conn.close()
        print(f"{self.item_name} added successfully!")

    def delete(self):
        conn = connect()
        cur = conn.cursor()
        cur.execute("DELETE FROM Menu_Items WHERE item_name = %s", (self.item_name,))
        deleted = cur.rowcount
        conn.commit()
        cur.close()
        conn.close()
        return deleted > 0

    def update(self, new_name, new_price):
        conn = connect()
        cur = conn.cursor()
        cur.execute(
            "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s",
            (new_name, new_price, self.item_name)
        )
        updated = cur.rowcount
        conn.commit()
        cur.close()
        conn.close()
        return updated > 0
