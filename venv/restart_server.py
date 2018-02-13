from subprocess import Popen

Popen(["sudo", "touch", "temp"])
Popen(["sudo", "docker", "build", "-t", "poptopic_app","."])
Popen(["sudo","docker", "ps", ">>", "temp"])

# Find last line of file
with open("temp", "r") as file:
name = file.readlines()[-1]

Popen(["rm", "temp"])
Popen(["sudo", "docker", "kill ", name])
Popen(["sudo", "docker", "run", "-d", "--restart=always", "-p80:80", "-t", "poptopic_app"])

