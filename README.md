# Treefrog

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

This is [Treefrog](https://treefrog.cali-style.com), an isomorphic frontend framework for building powerful responsive apps, from your friends at [Cali Style](https://cali-style.com).

When ZURB stopped working on foundation-apps, we found a wonderful implementation of flexbox and a well written scss library. So we re-implemented these into Treefrog. Making it the first frontend framework with [Trails](http://trailsjs.io) and Isomorphic apps in mind. 

Treefrog doesn't assume that you want to use react or angular or vanillia javascript.  Instead it's just the frontend library and you can easily tie your javascript framework to it.

Looking for the Trailpack?  Visit <https://github.com/CaliStyle/trailpack-treefrog>.

Looking for the Generator?  Visit <https://github.com/CaliStyle/generator-treefrog>.

## Requirements

You'll need the following software installed to get started tinkering with Treefrog.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Git](http://git-scm.com/downloads): Use the installer for your OS.
  * [Gulp](http://gulpjs.com/) Run `[sudo] npm install -g gulp`

## Get Started

The Sass and JavaScript components are available on Bower and npm.
```
npm install treefrog --save
```

While working on your project, run:
```
npm start
```

This will assemble the templates, static assets, Sass, and JavaScript. You can view the test server at this URL:
```
http://localhost:8080
```

## Building this Repo

If you want to work with the source code directly or compile our documentation, follow these steps:
```
git clone https://github.com/CaliStyle/treefrog.git
cd treefrog
npm install
```

While you're working on the code, run:
```
npm start
```

The documentation can be viewed at the same URL as above.

### Directory Structure

* `build`: This is where our documentation is assembled. **Don't edit these files directly, as they're overwritten every time you make a change!**
* `docs`: The Treefrog documentation.
* `scss`: The Sass components.
* `dist`: Compiled CSS files, in minified and unmified flavors.
* `tests`: Unit tests.

## Versioning

Treefrog follows semver, so we won't introduce breaking changes in minor or patch versions. The `master` branch will always have the newest changes, so it's not necessarily production ready. The `stable` branch will always have the most recent stable version of the framework.

## Contributing

We love contributions!

For Treefrog please check out our [Contributor's Guide](https://github.com/CaliStyle/treefrog/blob/master/CONTRIBUTING.md) for more information on how our projects are organized and how to get started.

For Trails please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md) for more information on how our projects are organized and how to get started.

If you find a problem or have an idea, open a [new issue](https://github.com/CaliStyle/treefrog/issues) on GitHub. When filing a bug report, make sure you specify the browser and operating system you're on, and toss us a screenshot or show us how we can recreate the issue.


[npm-image]: https://img.shields.io/npm/v/treefrog.svg?style=flat-square
[npm-url]: https://npmjs.org/package/treefrog
[npm-download]: https://img.shields.io/npm/dt/treefrog.svg
[ci-image]: https://img.shields.io/travis/CaliStyle/treefrog/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/CaliStyle/treefrog
[daviddm-image]: http://img.shields.io/david/CaliStyle/treefrog.svg?style=flat-square
[daviddm-url]: https://david-dm.org/CaliStyle/treefrog
[codeclimate-image]: https://img.shields.io/codeclimate/github/CaliStyle/treefrog.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/CaliStyle/treefrog
