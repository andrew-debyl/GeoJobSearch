import json
import time
import mysql.connector

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def connect_to_database(host, database, user, password):
    while True:
        time.sleep(1)
        try:
            connection = mysql.connector.connect(
                host=host,
                database=database,
                user=user,
                password=password
            )
        except mysql.connector.Error as e:
            print(f"Could not connect: {e}. Retrying...", flush=True)
        else:
            print("Successfully connected to SQL database.", flush=True)
            return connection

def insert_data_into_database(connection, data):
    cursor = connection.cursor()
    for item in data:
        check_query = (
            "SELECT * FROM jobs WHERE job_title = %s AND company_name = %s"
        )
        check_values = (item['job_title'], item['job_location'])
        cursor.execute(check_query, check_values)
        if cursor.fetchone() is None:
            insert_query = (
                "INSERT INTO jobs (job_title, job_description, job_salary, company_name) "
                "VALUES (%s, %s, %s, %s)"
            )
            values = (item['job_title'], item['job_description'], item['job_salary'], item['job_location'])
            cursor.execute(insert_query, values)
    connection.commit()
    cursor.close()

def main():
    print("Attempting to upload job data", flush=True)
    data = read_json_file('indeed_job_listings.json')
    db_config = {
        "host": "mysql",
        "database": "geojobsearch",
        "user": "root",
        "password": "pwd"
    }
    connection = connect_to_database(**db_config)
    insert_data_into_database(connection, data)
    connection.close()
    print("Finished uploading job data", flush=True)


if __name__ == "__main__":
    main()
