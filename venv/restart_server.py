from subprocess import Popen

Popen(["sudo", "touch", "temp.out"])
Popen(["sudo", "docker", "build", "-t", "poptopic_app","."])
Popen(["sudo","docker", "ps", ">", "temp.out"])
print("FINISHED DOCKER PS")

# Find last line of file
with open("temp.out", "r") as file:
	name = file.readlines()[-1]

print("GOT NAME: ", name)
Popen(["rm", "temp.out"])
Popen(["sudo", "docker", "kill ", name])
Popen(["sudo", "docker", "run", "-d", "--restart=always", "-p80:80", "-t", "poptopic_app"])
print("DONE")
exit()
