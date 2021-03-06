- Run `npm install` # `npm ci --only=production` on prod
- **(If you don't use Docker)** Create a new MySql DB
- Config `.env` file from `.env.example`
- Run **Docker** `docker-compose -f docker-compose.yml up --build`
  - `-d` for Detached mode: Run containers in the background
- Run migration `npm run migrate`
- **(DEV Env)** Run seeders `npm run seed`
- **(If you don't use Docker)** Probably need to give permission to those folders: `sudo chgrp -R www-data public/ && sudo chmod -R ug+rwx public/`

---

## Docker

- To stop and remove containers `docker-compose -f docker-compose.yml down`
  - `-v` to delete associed volumes also
- To execute a command `docker exec {container_id} {your_command}`.

---

## Sequelize

- To create migration file `npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string`
- To update a column of table `npx sequelize-cli migration:create --name add_column_name_to_table`
- To run run a specific seeder `npx sequelize-cli db:seed --seed {file_name}`
#   n o t a i r e F r o n t  
 