import pytest
from unittest.mock import patch
from upload_files import read_json_file, connect_to_database, insert_data_into_database

def test_read_json_file():
    data = read_json_file('test_data.json')
    assert len(data) == 2  # Assuming test_data.json has 2 items

@patch('upload_files.mysql.connector.connect')
def test_connect_to_database(mock_connect):
    mock_connect.return_value = "Connection"
    connection = connect_to_database("host", "database", "user", "password")
    assert connection == "Connection"

@patch('upload_files.mysql.connector.connect')
def test_insert_data_into_database(mock_connect):
    mock_connect.return_value.cursor.return_value.execute.return_value = None
    mock_connect.return_value.cursor.return_value.fetchone.return_value = None
    connection = mock_connect.return_value
    data = [{'job_title': 'Test', 'job_description': 'Test Description', 'job_salary': '100', 'job_location': 'Test Location'}]
    insert_data_into_database(connection, data)
    connection.cursor.return_value.execute.assert_called()
    connection.commit.assert_called()
