<?php

namespace CCFW\Components\CookieManagement;

class Endpoints
{
    public static function phrase() {
        // rest_ensure_response() wraps the data we want to return into a WP_REST_Response, and ensures it will be properly returned.
        return rest_ensure_response( 'Hello World, this is the WordPress REST API' );
    }
}