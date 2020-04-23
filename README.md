# AllTheBeans

## Pre-Requisites
In order to run this project you will need to have Docker installed in order to run it from the command line

## Steps to run
- In your terminal ensure you are at the root of the project where the ``docker-compose.yml`` file is located
- Once there run the command ``docker-compose up -d --build`` to start building the project
- Once complete you will need to run the additional command ``docker exec -it internal-api yarn run create-db``, this will setup DynamoDB tables, S3 bucket and create an admin user account
- That's all thats to it, feel free to access the frontend of this through your web browser @ http://localhost:8082/

## Want to take down a server?
- Simply run the command ``docker stop internal-api`` or ``docker stop frontend``
- When you want to start them back up run the opposite, replacing ``stop`` with ``start``
