/* 

Copyright (c) 2024 Vladislav Trofimenko <foss@slashfast.dev>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import { svgFromHTMLTemplate } from "./transformer.js";

const domain = window.location.origin + "/INTERIOR-LUXE.com/app";

const template = fetch(`${domain}/template.txt`).then((response) => {
  return response.text();
});

const cssURL = `${domain}/template.css`;


let files = [];

export async function get_svg(svg) {
  const pageNumber = '1';

  let templates = [];

  templates.push({
    title: `<div>Plan house: <a href ="https://ismoilnigmatjonov84-cell.github.io/INTERIOR-LUXE.com"> INTERIOR-LUXE.com</a> </div> `,
    pageNumber: `Лист ${pageNumber}`,
    mainSvg: svg,
    legend: (() => {
      
    })(),
  });

  svgFromHTMLTemplate(await template, cssURL, templates);
}
