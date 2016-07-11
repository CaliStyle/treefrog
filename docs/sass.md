# Using Sass

Not familiar with Sass? The [official tutorial](http://sass-lang.com/guide) on sass-lang.com is a great place to start.

### Compatability

TODO: For more information on compatablity

#### Autoprefixer Required

We don't include vendor prefixes in our Sass files, instead, we use [Autoprefixer](https://github.com/postcss/autoprefixer) to handle it for us. Our build process uses [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer), but there are [other versions](https://github.com/postcss/autoprefixer#usage) that work with Grunt, Rails, Brunch, and more.

To get the proper browser support, use these Autoprefixer settings:

```js
autoprefixer({
  browsers: ['last 2 versions', 'ie 10']
})
```

### Using the Framework

If you're using the CLI to create a project, the Sass compilation process is already set up for you. If not, you can compile our Sass files yourself, or drop in a pre-built CSS file.

To get started, first install the framework files using Bower or npm.

```sh
npm install treefrog --save
```

#### Compiling Manually

Next, add the framework files as an import path. How you do this depends on your build process, but the path is the same regardless: `node_modules/treefrog/scss`

Here's an example using grunt-contrib-sass:

```js
grunt.initConfig({
  sass: {
    dist: {
      options: {
        loadPath: ['/node_modules/treefrog/scss']
      }
    }
  }
});
```

#### Using the CSS File

The Foundation for Apps Bower and npm packages include pre-compiled CSS files, in minified (compressed) and unminified flavors. If you're interested in editing the framework CSS directly, use the unminified file. For production, use the minified version.

### The Settings File

All Foundatiion projects include a __settings file__, named `_settings.scss`. If you're using the CLI to create a Foundation for Apps project, you can find the settings file under `client/assets/scss/`. If you're installing the framework standalone using Bower or npm, there's a settings file included in those packages, which you can move into your own Sass files to work with.

Every component includes a set of variables that modify core structural or visual styles. If there's something you can't customize with a variable, you'll need to write your own CSS to add it.

To change a default value, find the variable you're looking for, uncomment it by removing the slashes (`//`) at the start of the line, and change the value. Uncommenting signifies that you want the value to change, and also functions as a handy visual aid to see which defaults you're overriding.

```
$button-padding: 0.85em 1em !default;
$button-margin: 0 $global-padding $global-padding 0 !default;
$button-style: solid !default;
$button-background: $primary-color !default;
$button-color: auto !default;
$button-radius: 0 !default;
$button-sizes: (
  tiny: 0.7,
  small: 0.8,
  medium: 1,
  large: 1.3,
) !default;
$button-font-size: 0.9rem !default;
$button-opacity-disabled: 0.5 !default;
$button-tag-selector: true !default;
```

### Component Mixins

Every Treefrog component is written with multiple Sass mixins. We use these mixins to generate the final CSS output. But you don't need to use our built-in classes! Using the mixins, you can build your own class structure.

Here's a basic example, using the `button()` mixin.

```
// Example mixin for custom button 
.cta-button { 
  @include button($size: large, $background: pink, $color: white); 
}
```

Then you can use your custom button with this HTML:

```
<a href="#" class="cta-button">Buy Now</a>
```