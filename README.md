# Cookie Compliance For WordPress
This WP plugin loads a cookie consent banner at the bottom of the page and provides a visitor with a settings modal, allowing a visitor to turn cookie settings on/off and read cookie disclaimers.

# Features

* Users have the ability to consent to the cookies from Google Tag Manager
* Create interactive consent screens (utilises the allowlist feature of GTM)

## Issues

Raise issues via
<a href="https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues">https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues</a>

## Installation

Download this repository, unzip and copy the folder into your Wordpress plugin file directory.

## Prerequisites

* A working version of Wordpress to run this plugin and be running on PHP 7+.
* You will need the following code snipped placed after the body tag in your theme.

```
if ( ! function_exists( 'wp_body_open' ) ) {
    /**
     * Open the body tag, pull in any hooked triggers.
     **/
    function wp_body_open() {
        do_action( 'wp_body_open' );
    }
}
wp_body_open();
```

## Coding guidelines

This plugin follows

* Standards set by the Wordpress organisation https://codex.wordpress.org/Writing_a_Plugin.
* PHP Framework Interop Group's standards http://www.php-fig.org/
* JS Standard https://standardjs.com/rules.html

## Developer notes

Assets (such as CSS and JS) are compiled in this plugin using Webpack.

### Get started

#### Compiling assets

In the root directory run:

1. `npm install`. This installs all the compiling dependencies. While `/node_modules/` is generated in this process, it is not tracked or commit to Git.

2. For compiling assets while you work run, `npm run watch`. This starts Webpack watching your `src` file changes and compiling them on the fly as you edit. See further Webpack commands and configuration in `package.json`.

### Add new functionality

This plugin uses OOP PHP and Namespaces (PSR-4 Autoloader).

If functionality is javascript based, this plugin uses the JavaScript Object Literal pattern to encapsulate functions into modules. Edit the JS file in the `src` folder and that will get compiled into the `dist` folder.

### Automated linting and PHP code sniffing

We have a Git Action setup that lints, sniffs and then commits the linted PHP code in this plugin when code gets pushed to the repo.
