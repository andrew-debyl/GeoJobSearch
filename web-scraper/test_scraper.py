import pytest
from unittest.mock import patch, MagicMock, mock_open
from indeed_scrape import scapeData, processPageData, printToFile

@patch('indeed_scrape.webdriver.Chrome')
@patch('indeed_scrape.WebDriverWait')
def test_scapeData(mock_wait, mock_chrome):
    mock_driver = MagicMock()
    mock_driver.find_elements.return_value = []
    mock_chrome.return_value = mock_driver

    # Mock the WebDriverWait to immediately return True without waiting
    mock_wait.return_value.until.return_value = True

    result = scapeData()
    assert result == []

    # Ensure that the driver is quit even if there's a timeout
    mock_driver.quit.assert_called_once()

# Test for processPageData function
def test_processPageData():
    page_data = ['<html><body><h2 class="jobsearch-JobInfoHeader-title">Software Engineer - job post</h2><div id="jobLocationText">New York, NY</div><div class="js-match-insights-provider-tvvxwd">$100,000 a year</div><div id="jobDescriptionText">Develop software applications.</div></body></html>']
    result = processPageData(page_data)
    expected = [{
        'job_title': 'Software Engineer',
        'job_location': 'New York, NY',
        'job_salary': '$100,000 a year',
        'job_description': 'Develop software applications.'
    }]
    assert result == expected

# Test for printToFile function
@patch('indeed_scrape.os.path.exists')
@patch('indeed_scrape.json.dump')
@patch('indeed_scrape.open', new_callable=mock_open, read_data='[]')
def test_printToFile(mock_open, mock_dump, mock_exists):
    mock_exists.return_value = False
    job_listings = [{'job_title': 'Software Engineer', 'job_location': 'New York, NY', 'job_salary': '$100,000 a year', 'job_description': 'Develop software applications.'}]
    printToFile(job_listings)
    mock_open.assert_called_once_with('indeed_job_listings.json', 'w', encoding='utf-8')
    mock_dump.assert_called_once_with(job_listings, mock_open.return_value, ensure_ascii=False, indent=4)
