# Cookie Compliance For Wordpress
WP plugin that once activated, presents the website visitor with a cookie consent banner at the top of the page. This plugin will also generate a custom frontend settings page, allowing a vistor to turn cookie settings on/off.

This plugin currently supports the user turning off:

* Google Analytics tracking

Core Wordpress plugns are considered essential to the functioning of the site so they are not removed.

## Issues

Raise issues via 
<a href="https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues">https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues</a>

## Installation

Download this repository, unzip and copy the folder into your Wordpress plugin file directory.

## Prerequesites

You will need to have a working version of Wordpress to run this plugin and running PHP 7+.

## Coding guidelines

This plugin follows

* Standards set by the Wordpress organisation https://codex.wordpress.org/Writing_a_Plugin. 
* PHP Framework Interop Group's standards http://www.php-fig.org/
* JS Standard https://standardjs.com/rules.html

## Developer notes

Assests (such as CSS and JS) are compiled in this plugin using Webpack.

### Get started

1. `cd` into plugin root and run `npm install`. This installs all the compiling dependancies. Note, while `/node_modules/` is generated in this procsss it is not tracked or commit by Git. Do not add it to Git.

2. Once `npm install` has been run successfully, run the `npm run watch` command. This starts Webpack watching your `src` file changes and compiling them on the fly as you edit. See further Webpack commands and configuration in `package.json`.

### Add new functionality

This plugin uses OOP PHP and Namespaces (PSR-4 Autoloader).

To add new functionality/new classes, first add your class to the service register array in `/includes/init.php` and then create a corresponding .php file for this class. 

If functionality is javascript based, this plugin uses the JavaScript Object Literal pattern to encapsulate functions into modules. Edit the JS file in the `src` folder and that will get compiled into the `dist` folder.

## Testing

Javascripts used in this plugin follow the JS Standard format (JS Standard https://standardjs.com/rules.html). Not writing JS in this format, or JS package issues will throw linting errors via GitHub Actions and the deploy will fail.
