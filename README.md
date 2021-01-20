# Next-Gen Schoolbag - Prototype

🖌 Prototypical web-app for demonstrating and evaluating the bag's drawing feature.

## Development

The usage of the Fetch API causes issues with Cross Origin Requests when developing locally. This can be circumvented by various means:

* disable the Strict Origin Policy in Firefox
  1. Open `about:console` 
  2. Search for the rule `security.fileuri.strict_origin_policy` and set it to false
* use a local development server
  * via Python 2 `python -m SimpleHTTPServer`
  * via Python 3 `py -m http.server`
  * via the http-server module `http-server`

## Usage

* host the prototype on a Web Server, GitHub Pages or tunnel a localhost via ngrok
* open the URL on a tablet or desktop pc

## Built with

* HTML, CSS, JS
* fabric.js

## Authors

* Sandra Leidel - *Prototype Development* - [sandraleidel](https://github.com/sandraleidel)
* Vincent Thiele - *Prototype Development* - [vvvt](https://github.com/vvvt)

