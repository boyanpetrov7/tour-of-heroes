docker run -d --name mongoDB --net heroes-net --expose 27017 -v /home/boyan/mongo_databases/heroes-app:/data/db mongo
docker run -d --name heroes --net heroes-net -p 3080:3080 tour-of-heroes
