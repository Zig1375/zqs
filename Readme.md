# node-zqs

  query string parser for node.

## Installation

    $ npm install zqs

## Examples

```js
var zqs = require('./');

zqs.parse('a=1&b=2&c[]=2&c[4]=5&c[a]=sd');
   {
       "a": "1",
       "b": "2",
       "c": {
           "0": "2",
           "4": "5",
           "a": "sd"
       }
   }

zqs.parse('a=1&b=2&c[a][b][c][]=2&c[a][b][c][]=5&c[a][b][c][]=sd&c[b]=21&c[]=32');
   {
       "a": "1",
       "b": "2",
       "c": {
           "0": "32",
           "a": {
               "b": {
                   "c": [
                       "2",
                       "5",
                       "sd"
                   ]
               }
           },
           "b": "21"
       }
   }
```

## License

(The MIT License)

Copyright (c) 2013 Zig1375 &lt;zig@ikalogs.ru&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.