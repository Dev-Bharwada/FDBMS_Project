from flask import Flask, jsonify, render_template, request
import mysql.connector
from datetime import timedelta

app = Flask(__name__, static_folder='static', template_folder='templates')

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="miniproject"
    )

def convert_for_json(row):
    return {key: (str(value) if isinstance(value, timedelta) else value) for key, value in row.items()}

@app.route('/')
def home():
    return render_template('profilehtml.html')

@app.route('/admin-dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/faculty-dashboard')
def faculty_adashboard():
    return render_template('faculty_dashboard.html')

@app.route('/faculty-management')
def faculty_allocation():
    return render_template('faculty_management.html')

@app.route('/classroom-allocation')
def class_allocation():
    return render_template('classroom_allocation.html')

@app.route('/student-allocation')
def student_allocation():
    return render_template('student_allocation.html')

@app.route('/exam-allocation')
def exam_allocation():
    return render_template('exam_allocation.html')

@app.route('/building-allocation')
def building_allocation():
    return render_template('building_allocation.html')

@app.route('/current-upcoming-duties')
def current_upcoming_duties():
    return render_template('current_upcoming_duties.html')

@app.route('/individual-duties')
def individual_duties():
    return render_template('individual_duties.html')

@app.route('/test')
def test():
    return render_template('test.html')

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
            "INSERT INTO building (Building_Name, Department_ID, No_of_Exam_Halls) VALUES (%s, %s, %s)",
            (data['Building_Name'], data['Department_ID'], data['No_of_Exam_Halls'])
        )
        connection.commit()
        return jsonify({'message': 'Building added'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/buildings/<Building_Name>', methods=['PUT'])
def update_building(Building_Name):
    try:
        data = request.get_json()
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE building SET Building_Name=%s, Department_ID=%s, No_of_Exam_Halls=%s WHERE Building_Name=%s",
            (data['Building_Name'], data['Department_ID'], data['No_of_Exam_Halls'], Building_Name)
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

@app.route('/api/buildings/<Building_Name>', methods=['DELETE'])
def delete_building(Building_Name):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM building WHERE Building_Name=%s", (Building_Name,))
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Building not found'}), 404
        return jsonify({'message': 'Building deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/faculty', methods=['GET'])
def get_faculty():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM faculty")
        faculty_list = cursor.fetchall()
        return jsonify(faculty_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()


@app.route('/api/faculty', methods=['POST'])
def add_faculty():
    try:
        data = request.get_json()

        # Validate and convert dropdown values
        department_id = int(data.get('Department_ID')) if data.get('Department_ID') else None
        designation = str(data.get('Designation'))  # Assume it's a string label or ID
        duty = str(data.get('Nature_of_Duty'))

        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO faculty (ID, Name, Department_ID, Designation, Email, Phone_No, Room_No, Nature_of_Duty, Total_Duties, Subject_Taught)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['ID'],
            data['Name'],
            department_id,
            designation,
            data['Email'],
            data['Phone_No'],
            data['Room_No'],
            duty,
            data.get('Total_Duties', 0),
            data.get('Subject_Taught')
        )

        cursor.execute(query, values)
        connection.commit()
        return jsonify({'message': 'Faculty added'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()



@app.route('/api/faculty/<int:faculty_id>', methods=['PUT'])
def update_faculty(faculty_id):
    try:
        data = request.get_json()

        department_id = int(data.get('Department_ID')) if data.get('Department_ID') else None
        designation = str(data.get('Designation'))
        duty = str(data.get('Nature_of_Duty'))

        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            UPDATE faculty
            SET Name=%s, Department_ID=%s, Designation=%s, Email=%s, Phone_No=%s,
                Room_No=%s, Nature_of_Duty=%s, Total_Duties=%s, Subject_Taught=%s
            WHERE ID=%s
        """
        values = (
            data['Name'],
            department_id,
            designation,
            data['Email'],
            data['Phone_No'],
            data['Room_No'],
            duty,
            data.get('Total_Duties', 0),
            data.get('Subject_Taught'),
            faculty_id
        )

        cursor.execute(query, values)
        connection.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Faculty not found'}), 404

        return jsonify({'message': 'Faculty updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()



@app.route('/api/faculty/<int:faculty_id>', methods=['DELETE'])
def delete_faculty(faculty_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Delete from dependent tables first
        cursor.execute("DELETE FROM invigilation_duty WHERE Faculty_ID = %s", (faculty_id,))
        cursor.execute("DELETE FROM availability WHERE Faculty_ID = %s", (faculty_id,))
        cursor.execute("DELETE FROM classroom WHERE Faculty_ID = %s", (faculty_id,))

        # Now delete from faculty
        cursor.execute("DELETE FROM faculty WHERE ID = %s", (faculty_id,))
        connection.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Faculty not found'}), 404

        return jsonify({'message': 'Faculty deleted'})
    except Exception as e:
        print(f"Error deleting faculty: {e}")
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/get-duty-data', methods=['GET'])
def get_duty_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM invigilation_duty')
        duty_data = cursor.fetchall()

        # Convert for JSON
        formatted_data = [
            {
                "Course_Code": row["Course_Code"],
                "Faculty_ID": row["Faculty_ID"],
                "Duty_Date": row["Duty_Date"].isoformat() if row["Duty_Date"] else None,
                "Duty_Time": str(row["Duty_Time"]) if isinstance(row["Duty_Time"], timedelta) else row["Duty_Time"],
                "Duty_Location": row["Duty_Location"]
            } for row in duty_data
        ]

        return jsonify(formatted_data)

    except Exception as e:
        print("Error fetching duty data:", e)
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@app.route('/api/execute-procedures', methods=['POST'])
def execute_procedures():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.callproc('CleanOverlappingAvailability')
        cursor.callproc('AssignInvigilationDuties')
        cursor.callproc('AutoAssignDuties_NoDoubleBooking')
        cursor.callproc('PreviewOverlappingAvailability')
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    
@app.route('/api/get-duty-data-by-id', methods=['GET'])
def get_duty_data_by_id():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM invigilation_duty WHERE Faculty_ID = 2')#CHANGE HERE
        duty_data = cursor.fetchall()

        # Convert for JSON
        formatted_data = [
            {
                "Course_Code": row["Course_Code"],
                "Faculty_ID": row["Faculty_ID"],
                "Duty_Date": row["Duty_Date"].isoformat() if row["Duty_Date"] else None,
                "Duty_Time": str(row["Duty_Time"]) if isinstance(row["Duty_Time"], timedelta) else row["Duty_Time"],
                "Duty_Location": row["Duty_Location"]
            } for row in duty_data
        ]

        return jsonify(formatted_data)

    except Exception as e:
        print("Error fetching duty data:", e)
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/get-faculty-info', methods=['GET'])
def get_faculty_info():
    try:
        faculty_id = request.args.get('faculty_id', type=int, default=1)

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('''
            SELECT Name, Designation, Email, Department_ID 
            FROM faculty 
            WHERE ID = %s
        ''', (faculty_id,))
        
        faculty_data = cursor.fetchone()

        if faculty_data:
            return jsonify(faculty_data)
        else:
            return jsonify({'error': 'Faculty not found'}), 404

    except Exception as e:
        print("Error fetching faculty data:", e)
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
