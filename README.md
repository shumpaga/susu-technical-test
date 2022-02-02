# Susu technical test

👋 Welcome!

If you're here, it means you're currently in discussion with us
about an open job in the tech team. We look forward to working with you!
But before we get to that point we'd like to evaluate your technical skills,
and this is what this repo is all about.

## Repository structure

This repository holds a simple ride-booking app. The app is comprised of:

* a front-end to display the available rides and check a ride price
* a back-end that exposes the APIs used by the front-end

### Front-end

The front-end app is located in the `front/ride-app` folder. It's a Vue 2 app, written in
Typescript and using `vuex` for store management. You can follow the instructions
in `front/ride-app/README.md` to install the dependencies and run the app locally.

### Back-end

The back-end app is (you guessed it) in the `back` folder. It's a Flask app written in Python 3.8.
Likewise, there is a `README.md` file to explain how to install and run the app.

### Branches

There are currently 3 branches in this repository: `main`, `feature/back` and 
`feature/front`. `main` is the prod version of the app, and the two other are feature branches
which are ready for review.

Out of the box, you should be able to install and run both apps locally just fine on any of the branches.
If this is not the case, there is either a problem with your set-up or with the test: 
get in touch with us and we'll figure which it is.

## Test instructions

Your job is to review the pull requests opened on the two feature branches. In each feature branch
you'll find a `SPECIFICATION.md` file which describes the initial requirement, as well as the
code that implements the spec (the `SPECIFICATION.md` file is in the scope of the review).

You may assume that the automated build pipeline specified in `cicd-pipelines.yml` has already been run and passes.

We expect 2 things from you:

1. Review the code in each PR and make comments on what you think should be fixed before the code 
can be merged. That is, the PR review should focus on the code quality of the feature branch, with
the objective of making the code "production worthy".
2. Identify what could be improved in the current codebase, or what would need to be refactored 
as the code grows, but doesn't need to be fixed in the scope of the open PRs.
If you note these remarks in the PR review, please distinguish them from the PR comments themselves, e.g. by
prefacing them with "Long term:".
