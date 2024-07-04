# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

## Found an Issue?

Thank you for reporting any issues you find. We do our best to test and make this project as solid as possible, but any reported issue is a real help.

Please follow these guidelines when reporting issues:

- Create a new issue in the [issue tracker](https://github.com/interaction-dynamics/design-system-hub/issues).
- Provide a title in the format of `<Error> when <Task>`
- Tag your issue with the tag `bug`
- Provide a short summary of what you are trying to do
- Provide the log of the encountered error if applicable
- Provide the exact version
- Be awesome and consider contributing a [pull request](#want-to-contribute)

## Want to contribute?

You consider contributing changes to this project – we dig that!
Please consider these guidelines when filing a pull request:

- Follow the [Coding Rules](#coding-rules)
- Follow the [Commit Rules](#commit-rules)
- Make sure you rebased the current master branch when filing the pull request
- Follow [Clean code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- Follow [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Follow [Test guidelines](#tests)
- Squash your commits when filing the pull request
- Provide a short title with a maximum of 100 characters
- Provide a more detailed description containing
  _ What you want to achieve
  _ What you changed
  _ What you added
  _ What you removed
- For significant changes, post also an issue before to know if your idea has a chance to be accepted

## Coding Rules

To keep the code base of commitlint neat and tidy the following rules apply to every change

- `prettier` is king
- `eslint` is awesome
- Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra)
- Be awesome

> You can also use `npx prettier --write .` to fix prettier errors

## Commit Rules

To help everyone with understanding the commit history of commitlint the following commit rules are enforced:

- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)
- present tense
- maximum of 100 characters
- for bugs, includes the github tag of the issue in the description.
- message format of `$type($scope): $message`
- use authorized types: build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test

> Using the right type is really important since it is used to increase the version number automatically.

## Test

If you add a feature or fix a bug, you need to provide a unit test verifying your
improvement.

Please follow [AAA pattern](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80)
when writing tests.

## Versioning

This project use [semantic versioning](https://semver.org/). The version number is increased based on the commit messages.

**May the force be with you !!**
