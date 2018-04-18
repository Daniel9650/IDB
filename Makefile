GithubID = Daniel9650
RepoName = idb
SHA      = aa31379f880125eb3ecc0728491c24e7d02d6f02

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# The Makefile should be present in the root of the project.
# There should be the following commands written:

# make github   - prints link to github repo
github:
	@echo "https://github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/${GithubID}/${RepoName}/blob/${SHA}/stories.txt"

# make uml      - prints link to uml diagram
uml:
	@echo "https://github.com/${GithubID}/${RepoName}/blob/master/assets/UML%20Diagram.png"

# make selenium - runs selenium tests
selenium:
	python3 frontend/guitests.py

# make frontend - runs frontend tests
frontend:
	@(cd frontend; npm test)

# make backend  - runs backend tests
backend:
	python3 backend/tests.py

# make website  - prints link to a website
website:
	@echo "http://poptopic.org/"

# make report   - prints link to technical report
report:
	@echo "https://legacy.gitbook.com/book/daniel9650/idb-phase-1/details"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://legacy.gitbook.com/book/daniel9650/poptopic-api-documentation/details"

# make self     - prints link to self critique
self:
	@echo "https://github.com/${GithubID}/${RepoName}/blob/master/self-critique.md"

# make other    - prints link to other critique
other:
	@echo "https://github.com/${GithubID}/${RepoName}/blob/master/other-critique.md"