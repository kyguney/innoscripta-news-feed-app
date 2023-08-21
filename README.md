### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [LocalWP](https://localwp.com/) (Download from the link and install to your local for running WordPress easily)
### Installation
- Download [Local Copy of Ladder](https://drive.google.com/file/d/1pjuN22ynrVQhnvQ3luhrzitwwRr_tfUg/view?usp=sharing)
- Open LocalWP program.
- Files > Import Site > Choose ladder.zip
- Install
### Settings
Change the remote repository url with yours <b>(This is one time process on installation)</b>
- Go to [repository](https://bitbucket.org/gocodistry/main-site/src)
- Copy your clone repo url `(https://[your_username]@bitbucket.org/gocodistry/main-site.git)`
- Open root path of project in terminal
```
$ git remote set-url origin https://[your_username]@bitbucket.org/gocodistry/main-site.git
```
### Building Asset Files
In terminat at root path
```
$ cd wp-content/themes/ladder-theme/boilerplate
$ nvm use 
# if you haven't got required nodejs version
$ nvm install 15.14.0
$ nvm use
$ npm install
$ npm start # for run develop server
$ npm run build # for generate assets
```
### Branching, Commiting and Deployment
- Master branch is the main branch which you can merge your branches for auto deployment to production.
- When we are creating branch we need to use following branch names:
    - for feature: `feature/[Ticket ID]-[Ticket with lowercase and dash (-) between words]`
    - for bugs: `bugfix/[Ticket ID]-[Ticket with lowercase and dash (-) between words]`
- When we are committing we need to add ticket ID also in commit. For example: `[LAD-10] Modified Home Page Hero Section`
- Please add plugins which you are going to use to `.gitignore` file under whitelist.
- For database migration we are using WP Migrate DB Pro. It is under `Tools > Migrate DB Pro`.
    - You need to take the safe connection url from production `(Tools > Migrate DB Pro > Settings)`
    - Go to your local admin
    - Tools > Migrate DB Pro
    - New Migration > Pull for updating your local, Push for updating Production
    - Paste the connection url
    - Choose Media Files if you add new image or other file
    - And proceed
### Useful Assets
- [LocalWP Ladder Exported File](https://drive.google.com/file/d/1pjuN22ynrVQhnvQ3luhrzitwwRr_tfUg/view?usp=sharing)
- [Ladder WP/Database Credentials](https://drive.google.com/file/d/1IyVL2yxw8YkRZopys8W8btnsVCfdOJb6/view?usp=sharing)
- [Repository](https://bitbucket.org/gocodistry/main-site/src/master/)
- [Project Jira Url](https://codistry.atlassian.net/jira/software/projects/LAD/boards/90)