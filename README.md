# Cookie Compliance For Wordpress
WP plugin that once activated, presents the website visitor with a cookie consent banner at the top of the page. This plugin will also generate a custom frontend settings page, allowing a vistor to turn cookie settings on/off.

# Features

* Managing Google Analytics tracking via the banner toggles
* Adding your own custom banner text via the WP dashboard

Core Wordpress plugns are considered essential to the functioning of the site so they are not removed.

## Issues

Raise issues via
<a href="https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues">https://github.com/ministryofjustice/cookie-compliance-for-wordpress/issues</a>

### Using this plugin on a site with a subdomain

This plugin this not compatible with subdomain websites, such as `magistrates.judiciary.uk`, unless you make sure to modify your tracking code (such as Google Analytics, to use a subdomain URL rather then leave it to its default, which is a top-level top, eg, `.judiciary.uk`).

#### Steps to change your Google Analytic settings

1. Using Google Tag Manager (GTM), go to Variables and click on your Google Analytics settings.
2. Under "Variable Configuration", and "Cookie Domain" change from `auto` to the full subdomain address, eg `magistrates.judiciary.uk`.
3. Save and don't forget to publish.

## Installation

Download this repository, unzip and copy the folder into your Wordpress plugin file directory.

## Prerequesites

You will need to have a working version of Wordpress to run this plugin and running PHP 7+.

You will need the following code snipped placed after the body tag in your theme.

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

Assests (such as CSS and JS) are compiled in this plugin using Webpack.

### Get started

#### Compiling assets

In the root directory run:

1. `npm install`. This installs all the compiling dependancies. While `/node_modules/` is generated in this procsss, it is not tracked or commit by Git. Do not add it to Git.

2. For compiling assets while you work run, `npm run watch`. This starts Webpack watching your `src` file changes and compiling them on the fly as you edit. See further Webpack commands and configuration in `package.json`.

### Add new functionality

This plugin uses OOP PHP and Namespaces (PSR-4 Autoloader).

To add new functionality/new classes, first add your class to the service register array in `/includes/init.php` and then create a corresponding .php file for this class.

If functionality is javascript based, this plugin uses the JavaScript Object Literal pattern to encapsulate functions into modules. Edit the JS file in the `src` folder and that will get compiled into the `dist` folder.

### Automated linting and PHP code sniffing

We have a Git Action setup that lints, sniffs and then commits the linted PHP code in this plugin when anything is pushed to the repo.
