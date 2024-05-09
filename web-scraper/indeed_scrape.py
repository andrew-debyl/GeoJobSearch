# This code relies on 3 packages 
#
#  1) beautifulsoup4 
#  2) selenium 
#  3) webdriver-manager
#
#   These packages can be installed locally using pip or pip3
#   
#   Locally:
#   python3 -m pip install beautifulsoup4
#   python3 -m pip install selenium
#   python3 -m pip install webdriver-manager
# 
#   based on code provided on these websites: 
#   https://realpython.com/beautiful-soup-web-scraper-python/
#   https://brightdata.com/blog/how-tos/scrape-dynamic-websites-python
#   
#   Notes:
#   Because Indeed uses React, all the webcontent is dynamically created
#   at run time. We cannot scrape with beautifulsoup4 as it basically only
#   reads static web content. We will use Selenium to grab the dynamically
#   created web-data and then parse it statically with beutiful soup.

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random
import os
import json
import time

# Runs selenium web scaper to grab data from Indeed.com
def scapeData():
    # Setting up our web-driver options
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")


    # Use the local Chrome WebDriver with the specified ChromeDriver path
    print("Attempting to connect to webdriver...", flush=True)
    driver = webdriver.Chrome(options=options)
    print("Sucesfully connected!", flush=True)

    # Page data list
    page_data = []

    # Initialize variables
    keywords = []
    location = ""
    url = ""

    # Read and parse the file
    with open("scraper_config.txt", "r") as file:
        for line in file:
            key, value = line.strip().split(": ", 1)
            if key == "Keywords":
                keywords = value.split(", ")
            elif key == "Location":
                location = value
            elif key == "URL":
                url = value

    # Print the values to verify
    print("Keywords:", keywords)
    print("Location:", location)
    print("URL:", url)
    keywords_query = "+".join(keywords)

    # Indeed webpage with 'part time' key-word and 'Guelph ON' location
    URL = f"https://ca.indeed.com/jobs?q={keywords_query}&l=Guelph%2C+ON"

    # Driver is used to get the URL
    print("Attempting to get URL...", flush=True)
    driver.get(URL)
    print("Got URL!", flush=True)

    # Sleep the program for a few seconds so that the content can be dynamically created by the web-server
    time.sleep(3)

    #How many pages you want to scrape from --> Takes about 17s per page.
    max_pages = 10

    print("Scraping data from Indeed.com. time estimate: " + str(max_pages * 17)  + " seconds.", flush=True)

    for i in range(max_pages):
        # Try and find clickable card outlines
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, "cardOutline")))
        try:
            li_button_elements = driver.find_elements(By.CLASS_NAME, "cardOutline") #cardOutline is class name of clickable <li>
        except Exception as e:
            print("Could not find clickable <li> elements on the page. Closing search.", flush=True)
            break

        if(len(li_button_elements) == 0):
            print("No clickable items were found. Closing search.", flush=True)
            break

        # Sift through clickable <li> items and grab page new page data
        for clickable in li_button_elements:
            try:
                clickable.click()
                time.sleep(random.randint(1, 2))
                scroll_string = random.randint(500,1000)
                driver.execute_script(f"window.scrollBy(0, {scroll_string});")
                page_data.append(driver.page_source)
                print("page saved...", flush=True)
            except Exception as e:
                print("Could not click card item", flush=True)

        # Find next page button and start process again
        try:
            #next_page = driver.find_element(By.CLASS_NAME, "css-akkh0a")
            next_page = driver.find_element(By.CSS_SELECTOR, '[data-testid="pagination-page-next"]')
            next_page.click()
            time.sleep(random.randint(3,6))
            print("Loading new webpage!", flush=True)
        except Exception as e:
            print("Could not open new webpage. Closing search.", flush=True)
            print(e)
            break

        try:
            close_modal = driver.find_element(By.CLASS_NAME, "css-yi9ndv") #css-yi9ndv e8ju0x51
            if ( close_modal ):
                close_modal.click()
                time.sleep(random.randint(3,6))
        except Exception as e:
            print('No modal, contuining.')

    print('Scraping complete!' + str(len(page_data)) + " pages scraped", flush=True)
    driver.quit()
    return page_data

# Process page_Data from scaper and return job_listings json object
def processPageData(page_data):
    job_listings = []
    
    for data in page_data:
        job_data = {"job_title"        : " Check Description ",
                    "job_location"     : "Guelph, ON",
                    "job_salary"       : " Check Description ",
                    "job_description"  : " Check Description "}
        
        soup = BeautifulSoup(data, 'html.parser')

        job_title = soup.find('h2', class_="jobsearch-JobInfoHeader-title")
        if (job_title):
            if( '- job post' in job_title.text):
                job_data['job_title'] = job_title.text[:-11] # remove trailing '- job post'
            else:
                job_data['job_title'] = job_title.text

        job_location = soup.find('div', id="jobLocationText") #Completely random class name, but it gets the location
        if(job_location):
            job_data['job_location'] = job_location.text

        job_salary = soup.find('div', class_="js-match-insights-provider-tvvxwd")
        if (job_salary):
            job_data['job_salary'] = job_salary.text

        job_desc = soup.find('div', id="jobDescriptionText")
        if(job_desc):
            job_data['job_description'] = job_desc.text

        job_listings.append(job_data)

    return job_listings

# Prints job_listing data (that is unique) to file
def printToFile(job_listings):
    # Check if the file exists
    file_path = 'indeed_job_listings.json'
    if os.path.exists(file_path):
        # Read the existing data
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                existing_data = json.load(file)
        except json.JSONDecodeError:
            # Handle the case where the file is empty or contains invalid JSON
            existing_data = []
    else:
        # Create an empty list if the file does not exist
        existing_data = []

    # Create a set of unique identifiers for existing jobs (e.g., job titles)
    existing_job_titles = set(job['job_title'] for job in existing_data)

    # Filter out new job listings that already exist in the file
    new_job_listings = [job for job in job_listings if job['job_title'] not in existing_job_titles]

    # Append the new, unique job listings to the existing data
    existing_data.extend(new_job_listings)

    # Write the updated data back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(existing_data, file, ensure_ascii=False, indent=4)

    print(f'Data appended to JSON file and saved to drive. ({file_path}) {len(new_job_listings)} new jobs added.')


if __name__ == "__main__":
    page_data = scapeData()
    job_listings = processPageData(page_data)
    printToFile(job_listings)