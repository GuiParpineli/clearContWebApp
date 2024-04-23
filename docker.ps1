Write-Output BUILDING APPLICATION
./gradlew clean
./gradlew build -x test

Write-Output BUILDING DOCKER IMAGE
docker image remove clearcontwebapp-clearapp
docker build -t clearcontwebapp-clearapp .

Write-Output CREATING TAG
docker tag clearcontwebapp-clearapp guiparpineli/clearapp
Write-Output PULLING IN DOCKER HUB
docker push guiparpineli/clearapp
