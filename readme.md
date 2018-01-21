# Introduction

This is a responsive and accessible form that will validate user input. Upon succeddful validation, the completed order will be displayed.

To view the results, visit <https://jessicakarpovich.github.io/form-project/>.

# Project Setup

Before you get started, check to make sure you have Sass, nvm, node, gulp, and gulp-sass. 

1. If you haven’t already, install Sass by going through the steps explained [here](http://sass-lang.com/install) on the official documentation.

2. Next, install or update nvm by following the steps [here](https://github.com/creationix/nvm) under **Installation**.

3. Once complete, scroll down to the **Usage** section on the above link and follow the steps to install node.

4. Follow the instructions under **Getting Started** [here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) to install the gulp command globally and in your project directory.

5. Install the gulp-sass plugin by following the [instructions](https://www.npmjs.com/package/gulp-sass/).


## Optional Steps ##
1. If you plan on making changes to the sass files, run `gulp watch` in the terminal to have the CSS immediately updated. 

- *Note:* Before using the above command, you may need to install Browsersync, or to remove some code from the gulpfile. 

- Browsersync allows you to see your changes applied live in your browser. To install it go [here](https://browsersync.io/#install).

2. To use Autoprefixer, to add vendor prefixes to CSS, install [gulp-postcss](https://github.com/postcss/gulp-postcss) and [Autoprefixer](https://github.com/postcss/autoprefixer) by using `npm install gulp-postcss autoprefixer` in your project directory.

# Current Functionality #
Currently, the form uses a one-column or three-column layout depending on the screen size. 

It can be completed by tabbing through the various input controls and entering required data. As there is only one product in one size at this point, the size can't be changed. However, when a different color is selected, the name of the product gets updated as well. 

As the user is filling out the Shipping Details, the Order Summary is updated. The Address 2 field is optional and can be ignored. The country field is pre-set to United States, however, if changed, the country that is selected is displayed in the Order Summary as well.