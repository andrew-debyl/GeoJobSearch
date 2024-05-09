#   Very basic testing framework for our indeed-web-scraper. Uses Pytest
#   Will check that the indeed file exists and do basic data verification
#
# Test file uses pytest, simply call pytest in the same directory to intitate testing
#   To install pytest, use: pip install pytest

import json
import os
import pytest

# Path to our JSON file
fp = 'indeed_job_listings.json'

# Check if file exists
def test_fileExists():
    
    assert os.path.isfile(fp), f"File does not exist! {fp}"

#Check if file can be loaded into data and its data type
def test_fileLoads():
    
    with open(fp, 'r') as file:
        data = json.load(file)
    assert isinstance(data, list), "Data corrupted, JSON did not load as list"

#Check each element to ensure data integirty
def test_checkElements():
    
    with open(fp, 'r') as file:
        data = json.load(file)
    
    for item in data:
        assert isinstance(item, dict), "Item is not a dictionary"
        assert 'job_title' in item, "Missing 'job_title'"
        assert isinstance(item['job_title'], str), "'job_title' is not a string"
        assert 'job_location' in item, "Missing 'job_location'"
        assert isinstance(item['job_location'], str), "'job_location' is not a string"
        assert 'job_salary' in item, "Missing 'job_salary'"
        #assert '$' in item['job_salary'], "No financial data on item."
        assert isinstance(item['job_salary'], str), "'job_salary' is not a string"
        assert 'job_description' in item, "Missing 'job_description'"
        assert isinstance(item['job_description'], str), "'job_description' is not a string"

