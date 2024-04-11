import asyncio, asyncpg
from quart import Quart, app, make_response, request
import uuid, random, dotenv, os

dotenv.load_dotenv()

app = Quart(__name__)

@app.before_serving
async def create_pool():
    app.pool = await asyncpg.create_pool(user=os.environ.get("DB_USER"), password=os.environ.get("DB_PASS"), database='webtech', host='localhost', port=os.environ.get("DB_PORT"))

@app.route('/')
async def asd():
    return "OK"

@app.before_request
async def before_request():
    if request.method == 'OPTIONS':
        resp = await make_response()
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return resp

@app.route('/login', methods=['POST'])
async def login():
    data = await request.get_json()
    rows = await app.pool.fetch('SELECT * FROM users WHERE username = $1 AND password = $2', data['username'], data['password'])
    if len(rows) == 0:
        res = await make_response({'error': 'Hibás felhasználónév vagy jelszó'}, 401)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    else:
        res = await make_response({'user': dict(rows[0])})
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res

@app.route('/register', methods=['POST'])
async def register():
    data = await request.get_json()
    await app.pool.execute('INSERT INTO users (username, password) VALUES ($1, $2)', data['username'], data['password'])
    rows = await app.pool.fetch('SELECT * FROM users WHERE username = $1 AND password = $2', data['username'], data['password'])
    res = await make_response({'user': dict(rows[0])})
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res

@app.route('/get_todos')
async def get_todos():
    userid = request.args.get('userid')
    rows = await app.pool.fetch('SELECT * FROM todos WHERE userid = $1 ORDER BY kesz, szoveg', userid)
    resp = await make_response({'todos': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/add_todo', methods=['POST'])
async def add_todo():
    data = await request.get_json()
    await app.pool.execute('INSERT INTO todos (szoveg, kesz, szemely, cimkeid, userid) VALUES ($1, $2, $3, $4, $5)', data['szoveg'], data['kesz'], data['szemely'], data["cimkek"], data['userid'])
    rows = await app.pool.fetch('SELECT * FROM todos WHERE userid = $1 ORDER BY kesz, szoveg', data["userid"])
    resp = await make_response({'todos': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/delete_todo', methods=['POST'])
async def delete_todo():
    data = await request.get_json()
    await app.pool.execute('DELETE FROM todos WHERE id = $1', data['id'])
    rows = await app.pool.fetch('SELECT * FROM todos WHERE userid = $1 ORDER BY kesz, szoveg', data["userid"])
    resp = await make_response({'todos': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/set_kesz', methods=['POST'])
async def set_kesz():
    data = await request.get_json()
    await app.pool.execute('UPDATE todos SET kesz = $1 WHERE id = $2', data['kesz'], data['id'])
    rows = await app.pool.fetch('SELECT * FROM todos WHERE userid = $1 ORDER BY kesz, szoveg', data["userid"])
    resp = await make_response({'todos': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/edit_todo', methods=['POST'])
async def edit_todo():
    data = await request.get_json()
    row = await app.pool.fetchrow('SELECT * FROM todos WHERE id = $1', int(data['id']))
    cimkek = row['cimkeid']
    for cimke in data["cimkek"]:
        if cimke not in cimkek:
            cimkek.append(cimke)
    for cimke in cimkek:
        if cimke not in data["cimkek"]:
            cimkek.remove(cimke)
    await app.pool.execute('UPDATE todos SET szoveg = $1, szemely = $2, cimkeid = $3 WHERE id = $4', data['szoveg'], data['szemely'], cimkek ,int(data['id']))
    rows = await app.pool.fetch('SELECT * FROM todos WHERE userid = $1 ORDER BY kesz, szoveg', data["userid"])
    resp = await make_response({'todos': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/get_cimkek')
async def get_cimkek():
    userid = request.args.get('userid')
    if userid:
        userid = int(userid)
    rows = await app.pool.fetch('SELECT * FROM cimkek WHERE userid = $1', userid)
    resp = await make_response({'cimkek': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/add_cimke', methods=['POST'])
async def add_cimke():
    data = await request.get_json()
    r = lambda: random.randint(0,255)
    color = '#%02X%02X%02X' % (r(),r(),r())
    await app.pool.execute('INSERT INTO cimkek (nev, userid, color) VALUES ($1, $2, $3)', data['nev'], int(data['userid']), color)
    rows = await app.pool.fetch('SELECT * FROM cimkek WHERE userid = $1', int(data["userid"]))
    resp = await make_response({'cimkek': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/delete_cimke', methods=['POST'])
async def delete_cimke():
    data = await request.get_json()
    await app.pool.execute('DELETE FROM cimkek WHERE id = $1', data['id'])
    rows = await app.pool.fetch('SELECT * FROM cimkek WHERE userid = $1', int(data["userid"]))
    resp = await make_response({'cimkek': [dict(row) for row in rows]})
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')