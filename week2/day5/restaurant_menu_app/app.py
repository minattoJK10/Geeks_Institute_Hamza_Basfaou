import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "fallback-secret")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model
class MenuItem(db.Model):
    __tablename__ = 'menu_items'  # ← Ajoute cette ligne !
    item_id = db.Column(db.Integer, primary_key=True)
    name = db.Column('item_name', db.String(30))  # maps 'name' in model to 'item_name' in DB
    price = db.Column('item_price',db.Numeric(10,2))



# Routes
@app.route('/')
def menu():
    items = MenuItem.query.all()  # fetch all menu items from DB
    return render_template('menu.html', items=items)



@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        new_item = MenuItem(name=name, price=float(price))
        db.session.add(new_item)
        db.session.commit()
        return redirect(url_for('menu'))
    return render_template('add_item.html')

@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    item = MenuItem.query.get_or_404(item_id)
    if request.method == 'POST':
        item.name = request.form['name']
        item.price = float(request.form['price'])
        db.session.commit()
        return redirect(url_for('menu'))
    return render_template('update_item.html', item=item)

@app.route('/delete/<int:item_id>')
def delete_item(item_id):
    item = MenuItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return redirect(url_for('menu'))

if __name__ == '__main__':
    app.run(debug=True)
