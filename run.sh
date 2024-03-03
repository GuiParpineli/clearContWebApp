build_application() {
    echo BUILDING APPLICATION
    ./gradlew clean
    ./gradlew build -x test
}

build_docker_image() {
    echo BUILDING DOCKER IMAGE
    docker image remove clearcontwebapp-clearapp
    docker build -t clearcontwebapp-clearapp .
}

tag_and_push_docker_image() {
    echo CREATING TAG
    docker tag clearcontwebapp-clearapp guiparpineli/clearapp
    echo PULLING IN DOCKER HUB
    docker push guiparpineli/clearapp
}


build_application
build_docker_image
tag_and_push_docker_image