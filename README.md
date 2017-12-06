
#Information

Please modify this project by preprocessor SCSS!

#Global

# Starter-SCSS

> **SCSS** starter for front-end projects

## Built with:

1. [LibSass](http://libsass.org)
2. [Gulp](http://gulpjs.com/)
3. [Sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
4. [BrowserSync](http://www.browsersync.io/)
5. [Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
6. [ESlint](https://github.com/adametry/gulp-eslint)
7. [Image](https://github.com/1000ch/gulp-image)
8. [Spritesmith](https://github.com/twolfson/gulp.spritesmith)
9. [PhantomJSSmith](https://github.com/twolfson/phantomjssmith)
10. [Uglify](https://github.com/terinjokes/gulp-uglify)
11. [Concat](https://github.com/contra/gulp-concat)
12. [Merge media queries](https://github.com/roaiven/gulp-merge-media-queries)
13. [CSSNano](https://www.npmjs.com/package/cssnano)
14. [normalize.css](https://necolas.github.io/normalize.css/)
15. [Breakpoint](http://breakpoint-sass.com/)
16. [RunSequence](https://www.npmjs.com/package/run-sequence)
17. [SVGMin](https://www.npmjs.com/package/gulp-svgmin)
18. [SVGSymbols](https://www.npmjs.com/package/gulp-svg-symbols)
19. [HTMLMin](https://www.npmjs.com/package/gulp-htmlmin)
20. [HTMLLint](https://www.npmjs.com/package/gulp-htmllint)
21. [Eslint](https://www.npmjs.com/package/gulp-eslint)

## Requirements
1. [node](https://nodejs.org/en/) & [npm](https://docs.npmjs.com/cli/install).
2. sass
3. **gulp-cli** node package installed globally:
`npm install -g gulp-cli`

## [Installation](docs/install.md)

```shell
cd package_directory
npm install
```

Be sure to look over the [installation docs](docs/install.md) to verify your environment is prepared to run LibSasserPlate.
Once you have verified that your system can run LibSasserPlate, check out the [extra features](docs/extras.md) available.

## Directory structure explanation

* **/** - root directory with html files and configuration files (eslint, editorconfig)
* **src** - directory with source files for SCSS files
* **tpl** - directory compiled files, do not edit CSS files in this directory because they will be overwritten

## Gulp Tasks

### Default Task

This task is used for development.

**What it does?**

1. Compiles SASS (src/sass) files into CSS (tpl/css).
2. Running [BrowserSync](http://www.browsersync.io/) (file server, autorefresh, remote debugging).

```shell
gulp
```

### Compile Task

This task is used only for SCSS -> CSS compilation.

**What it does?**

1. Compiles SASS (src/sass) files into CSS (tpl/css).

```shell
gulp compile
```

### Compress images Task

**What it does?**

Optimize PNG, JPEG, GIF, SVG images using [gulp-image](https://github.com/1000ch/gulp-image).

```shell
gulp compress-images
```

### Compress jQuery file

**What it does?**

Minify JS jQuery file

```shell
gulp compress-js-jquery
```

### Compress JavaScript plugins

**What it does?**

Minify JS plugins

```shell
gulp compress-js-plugins
```

### Compress JavaScript All

**What it does?**

Minify jquery.js, plugins.min.js and main.js to one file

```shell
gulp compress-js-all
```

Minify CSS

```shell
gulp compress-css
```

### Publish Task

This task is used runing just before publishing project to Q&A or client.

**What it does?**

1. Minify CSS
2. Minify JS file - main.js

```shell
gulp publish
```
