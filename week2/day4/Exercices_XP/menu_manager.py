from config import connect


class MenuManager:

    @classmethod
    def get_by_name(cls, name):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Menu_Items WHERE item_name = %s", (name,))
        result = cur.fetchone()
        if result:
            return {"id": result[0], "name": result[1], "price": result[2]}
        cur.close()
        conn.close()
        
        return None

    @classmethod
    def all_items(cls):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Menu_Items")
        results = cur.fetchall()
        cur.close()
        conn.close()
        return [{"id": row[0], "name": row[1], "price": row[2]} for row in results]
