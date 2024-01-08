echo "docker-compose down"
docker-compose down
echo "docker-compose rm -f"
docker-compose rm -f

echo "build"
# shellcheck disable=SC2164
cd clearContWebApp
mvn clean package -DskipTests
# shellcheck disable=SC2103
cd ..
echo "docker-compose build"
docker-compose build

echo "docker-compose up"
docker-compose up