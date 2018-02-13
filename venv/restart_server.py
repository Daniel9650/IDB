from subprocess import Popen

Popen(["sudo", "docker", "build", "-t", "poptopic_app"])
Popen(["sudo","docker", "ps", ">>", "temp.txt"])

# Find last line of file
file = open("temp.txt")
file_line_list = file.readlines()
file.close()
name = file_line_list[-1]

Popen(["rm", "temp.txt"])
Popen(["sudo", "docker", "kill ", name])
Popen(["sudo", "docker", "run", "-d", "--restart=always", "-p80:80", "-t", "poptopic_app"])

