# testcafe-reporter-agile
[![Build Status](https://travis-ci.org/RdPhnX/testcafe-reporter-agile.svg)](https://travis-ci.org/RdPhnX/testcafe-reporter-agile)

This is the **agile** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/RdPhnX/testcafe-reporter-agile/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-agile
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter agile
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('agile') // <-
    .run();
```

## Author
RdPhnX (https://github.com/RdPhnX)
