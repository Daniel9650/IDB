GithubID = Daniel9650
RepoName = idb
SHA      = 6489677953154e3cd6fad59ce9f2ed106f1b3052

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
selenium: FORCE
	python3 frontend/guitests.py

# make frontend - runs frontend tests
frontend: FORCE
	@(cd frontend; npm test)

# make backend  - runs backend tests
backend: FORCE
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
	@echo "https://daniel9650.gitbooks.io/idb-phase-1/content/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "https://daniel9650.gitbooks.io/idb-phase-1/content/other-critique.html"

FORCE: ;
