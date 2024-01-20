echo BUILDING APPLICATION
./gradlew build -x test

echo BUILDING DOCKER IMAGE
docker build -t clearcontwebapp-clearapp .

echo CREATING TAG
docker tag clearcontwebapp-clearapp guiparpineli/clearapp

echo PULLING IN DOCKER HUB
docker push guiparpineli/clearapp