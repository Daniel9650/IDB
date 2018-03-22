import requests
import shelve


def update_and_close(shelve_dict, r):
    save = r.json()
    shelve_dict["etag"] = r.headers["etag"]
    shelve_dict["response"] = save
    shelve_dict.close()
    return save


def get_cached(url, name):
    d = shelve.open(name)
    if "etag" not in d:
        r = requests.get(url)
        if r.status_code != 200:
            return []
        return update_and_close(d, r)

    etag = d["etag"]
    head = {"If-None-Match": etag}
    r = requests.get(url, headers=head)

    if r.status_code == 304 or r.satus_code != 200:
        # we can use cached version
        response = d["response"]
        d.close()
        return response

    if r.status_code != 200:
        return []

    return update_and_close(d, r)


def get_commits_count():

    # r = requests.get(
    #    "https://api.github.com/repos/Daniel9650/idb/stats/contributors", headers=head)
    r = get_cached(
        "https://api.github.com/repos/Daniel9650/idb/stats/contributors",
        "commits-cache")

    commits_count = get_default_count()

    for contributor in r:
        login_name = contributor["author"]["login"]
        commits_count[login_name] = contributor["total"]

    return commits_count


def get_issues_count():
    r = get_cached(
        "https://api.github.com/repos/Daniel9650/idb/issues?state=all",
        "issues-cache")

    issues_count = get_default_count()

    for issue in r:
        user = issue["user"]["login"]
        if user in issues_count:
            issues_count[user] += 1
        else:
            issues_count[user] = 1

    return issues_count


def get_default_count():
    count = {}
    count['kyliesanderson'] = 0
    count['drewdearing'] = 0
    count['gerlou'] = 0
    count['dtalamas'] = 0
    count['Daniel9650'] = 0
    return count


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
