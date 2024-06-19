## FIRST STEPS
1. Download `python` version `3.12+`
2. Install `node.js`
3. Clone the repository.
4. Navigate to the `Tues-Adventure` folder you have cloned.
5. Create a virtual environment: ```python -m venv venv```
6. Activate the venv
#### Windows venv activation
To activate your venv on Windows, you need to run a script that gets installed by venv. If you created your venv in a directory, the command would be:
`venv\Scripts\activate`

#### Linux and MacOS venv activation

On Linux and MacOS, we activate our virtual environment with the source command. If you created your venv in the directory, the command would be:
`$ source venv/bin/activate`

7. Install the needed requirements by using the command line: `pip install -r requirements.txt`

## Backend Setup
1. Navigate to the `backend` folder by using the command-line: `cd backend`
2. Navigate to the sub `backend folder` by using: `cd backend`
3. Set up the required environmental variables with the help of the example file `.env.example`
4. Go back to the parent folder `cd ../`
5. Add your `credentials.json` file with your google cloud bucket credentials: *Tutorial: "https://www.youtube.com/watch?v=hJmkECmXyxY*"
6. IF YOU'RE USING A LOCAL DATABASE YOU NEED TO MAKE THE INITIAL MIGRATIONS:
    1.`python manage.py makemigrations`

    2.`python manage.py migrate`
7. Run the server: `python manage.py runserver`
## Frontend Setup
1.  Navigate to the frontend folder by running `cd ../`, if your in the head backend folder and then `cd frontend`
2.  Install the all frontend dependencies using npm: `npm install`.
3.  Run the server: `npm run dev`.


*Note: to access the add adventure form you have to be an admin (you account must have a role of '2').
