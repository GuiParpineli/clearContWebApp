echo BUILDING APPLICATION
./gradlew clean
./gradlew build -x test

echo BUILDING DOCKER IMAGE
docker image remove clearcontwebapp-clearapp
docker build -t clearcontwebapp-clearapp .

echo CREATING TAG
docker tag clearcontwebapp-clearapp guiparpineli/clearapp

echo PULLING IN DOCKER HUB
docker push guiparpineli/clearapp