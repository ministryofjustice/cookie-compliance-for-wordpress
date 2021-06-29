<?php

namespace CCFW\Components\Helper;

trait Debug
{
    /**
     * Force return output in HTML format
     * @var bool
     */
    public $html = false;

    /**
     * Define a heading and pass through a variable to display output
     *
     * @param string $heading
     * @param mixed $var
     * @param bool $force_html
     * @return string|null
     */
    public function debug(string $heading, $var, $force_html = false)
    {
        $backtrace = debug_backtrace();
        $function = $backtrace[2]['function'];
        $caller = array_shift($backtrace);

        if ($force_html) {
            $this->html = true;
        }
        $line = self::green("line " . $caller['line']);
        $function = self::blue($function . "()");
        $info = "Called in function " . $function . ", " . $line . "\nType: " . self::orange(gettype($var));
        $info .= "\n" . self::grey("-------") . "\n\n";

        $debug = self::pre($info . print_r(self::head($heading), true) .
            "\n\n" . self::code(print_r($var, true)) . "\n\n");

        $this->html = false;

        return $debug;
    }

    /**
     * Wrap a text string in HTML to display in prominent green.
     *
     * @param string $text
     * @return string
     */
    private function green(string $text): string
    {
        if ($this->isCli()) {
            return "\033[0;32m" . $text . "\033[0m";
        }

        return '<span style="color:green;font-weight: bold">' . $text . "</span>";
    }

    /**
     * Wrap a text string in HTML to display in prominent red.
     *
     * @param string $text
     * @return string
     */
    private function head(string $text): string
    {
        if ($this->isCli()) {
            return "\033[1;37m" . $text . "\033[0m";
        }

        return '<span style="color:#cc0000;font-weight: bold;font-size: 1.5em">' . $text . "</span>";
    }

    /**
     * Wrap a text string in HTML to display in prominent blue.
     *
     * @param string $text
     * @return string
     */
    private function blue(string $text): string
    {
        if ($this->isCli()) {
            return "\033[0;32m" . $text . "\033[0m";
        }

        return '<span style="color:#0e2fc1;font-weight: bold">' . $text . "</span>";
    }

    /**
     * Wrap a text string in HTML to display in prominent orange.
     *
     * @param string $text
     * @return string
     */
    private function orange(string $text): string
    {
        if ($this->isCli()) {
            return "\033[0;33m" . $text . "\033[0m";
        }

        return '<span style="color:orangered;font-size: 1.2em">' . $text . "</span>";
    }

    /**
     * Wrap a text string in HTML to display in prominent gray.
     *
     * @param string $text
     * @return string
     */
    private function grey(string $text): string
    {
        if ($this->isCli()) {
            return "\033[2m" . $text . "\033[0m";
        }

        return '<span style="color:#bbbbbb;font-weight: bold">' . $text . "</span>";
    }

    /**
     * Wrap a text string in styled <pre>.
     *
     * @param string $text
     * @return string
     */
    private function pre(string $text): string
    {
        if ($this->isCli()) {
            return "\n\033[1;2mD E B U G G I N G ...\033[0m\n\n" . $text;
        }

        $styles = [
            'white-space: pre-wrap',
            'background: #e2e2e2',
            'padding: 16px 20px 7px',
            'border: 1px solid #bfbfbf',
            'border-radius: 4px;'
        ];
        return '<pre style="' . implode(';', $styles) . '">' . $text . "</pre>";
    }

    /**
     * Wrap a text string in styled <code>.
     *
     * @param string $text
     * @return string
     */
    private function code(string $text): string
    {
        if ($this->isCli()) {
            return "\033[0;32m" . $text . "\033[0m\033[2m\n--------------------------------\033[0m";
        }

        $styles = [
            'background: #f1f1f1',
            'padding: 10px 20px',
            'display: inline-block',
            'border: 1px solid #bfbfbf',
            'border-radius: 4px'
        ];
        return '<code style="' . implode(';', $styles) . '">' . $text . "</code>";
    }

    private function isCli()
    {
        return (!$this->html && (defined('WP_CLI') && WP_CLI == true));
    }

    public function displayHTML()
    {
        $this->html = true;
    }

    public function resetHTML()
    {
        $this->html = false;
    }
}
