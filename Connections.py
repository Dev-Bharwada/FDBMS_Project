from flask import Flask, jsonify, render_template, request
import mysql.connector

print("✅ Flask is trying to start...")

app = Flask(__name__, static_folder='static', template_folder='templates')

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="miniproject"
    )

@app.route('/')
def home():
    return render_template('building_allocation.html')

@app.route('/api/buildings', methods=['GET'])
def get_buildings():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM building")
        buildings = cursor.fetchall()
        return jsonify(buildings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/buildings', methods=['POST'])
def add_building():
    try:
        data = request.get_json()
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO building (building_name, department, no_of_exam_halls) VALUES (%s, %s, %s)",
            (data['Building_Name'], data['Department_ID'], data['No_Of_Exam_Halls'])
        )
        connection.commit()
        return jsonify({'message': 'Building added'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/buildings/<building_name>', methods=['PUT'])
def update_building(building_name):
    try:
        data = request.get_json()
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE building SET building_name=%s, department=%s, no_of_exam_halls=%s WHERE building_name=%s",
            (data['building_name'], data['department'], data['no_of_exam_halls'], building_name)
        )
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Building not found'}), 404
        return jsonify({'message': 'Building updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()


@app.route('/api/buildings/<building_name>', methods=['DELETE'])
def delete_building(building_name):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM building WHERE building_name=%s", (building_name,))
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Building not found'}), 404
        return jsonify({'message': 'Building deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == '__main__':
    app.run(debug=True)
