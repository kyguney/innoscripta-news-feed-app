### Description
This app is created with React <b>(frontend)</b>, Laravel API <b>(backend)</b> and Docker env. You can download the Docker Desktop, clone the repository and are ready to run the application in your local computer by following the installation steps.
### Docker Env Detail
- PHP 7.4
- Node.js 18.16.0
- MYSQL 8.0.29
- React (http://localhost:3000)
- Laravel 8 (Breeze API) (http://localhost:8000)
### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
### Installation
Before start be sure that another local env is not working and using PORTS 80, 3306, 3000, 8000
- Install Docker Desktop.
- Clone the [repository](https://github.com/kyguney/innoscripta-news-feed-app.git)
- Open terminal, go to backend folder and do the steps
```
$ cd backend
$ cp .env.example .env
```
- Go back to root folder via terminal and we are ready to run docker-composer (Don't worry. It can take a little time to complete)
```
$ docker-composer up
```
### After Create Containers
In root folder via terminal
```
$ docker ps
```
- We need to go inside the container to set up migrations and seeds (Container id will be different in your local)
![PS_Image](https://drive.google.com/uc?export=view&id=1YPU05TCbcLYVgpvQQ7XRZ1kCKpnRcS14)
```
$ docker exec -it [your_container_id] sh
# php artisan migrate:fresh --seed
```
This command will create test user with test@test.com email address and '123123123' password. We are retreiving News from Guardian API, New York Times API and NewsAPI with seeder. Application records the news in Docker DB Container and shows the news via React frontend. We are ready to go. After completed the installation and setting you can login to frontend app [http://localhost:3000](http://localhost:3000). Don't forget! You can personalize you news feed by updating your profile. Enjoy!