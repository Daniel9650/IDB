import requests

def get_commits_count():
    r = requests.get(
        "https://api.github.com/repos/Daniel9650/idb/stats/contributors"
    ).json()

    commits_count = {}
    for contributor in r:
        login_name = contributor["author"]["login"]
        commits_count[login_name] = contributor["total"]

    return commits_count


def get_issues_count():
    r = requests.get(
        "https://api.github.com/repos/Daniel9650/idb/issues?state=all").json()

    issues_count = {}
    for issue in r:
        user = issue["user"]["login"]
        if user in issues_count:
            issues_count[user] += 1
        else:
            issues_count[user] = 1

    return issues_count


def output_counts(commits_count, issues_count):
    for user, val in commits_count.items():
        print("User: " + user)
        print("Number of commits: " + str(val))
        num_issues = 0 if user not in issues_count else issues_count[user]
        print("Number of issues: " + str(num_issues))
        print()


#if __name__ == "__main__":
#    commits_count = get_commits_count()
#    issues_count = get_issues_count()

#    output_counts(commits_count, issues_count)
