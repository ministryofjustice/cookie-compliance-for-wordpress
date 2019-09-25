# Cookie Compliance For Wordpress
WP plugin that once activated, presents the website visitor with a cookie consent banner at the top of the page. This plugin will also generate a custom frontend settings page, allowing a vistor to turn cookie settings on/off.

This plugin currently supports the user turning off:

* Google Analytics tracking

Core Wordpress plugns are considered essential to the functioning of the site so they are not removed.

## Issues

Rasie issues via 
<a href="https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues">https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues</a>

## Security

Security related issues contact <a mailto="wordpress@justice.gov.uk">us</a>

## Installation

Download this repository, unzip and copy the folder into your Wordpress plugin file directory.

## Prerequesites

You will need to have a working version of Wordpress to run this plugin and running PHP 7+.

## Coding guidelines

This plugin follows standards set by the Wordpress organisation. https://codex.wordpress.org/Writing_a_Plugin. Further this plugin, when possible follows the PHP Framework Interop Group's standards. http://www.php-fig.org/

## Developer notes

Assests (such as CSS and JS) are compiled in this plugin using GULP.

### Get started

1. `cd` into plugin root and run `npm install`. This installs all the compiling dependancies. Note, while `/node_modules/` is generated in this procsss it is not tracked or commit by Git. Do not add it to Git.

2. Once `npm install` has been run successfully, run the `Gulp` command. This starts Gulp watching your `src` file changes and compiling them on the fly as you edit. See further Gulp commands and configuration in `gulpfile.js`.