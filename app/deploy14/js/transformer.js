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

import { optimize } from "./svgo.js";
import printJS from "./print.js";

const iframeDefinition = '<iframe scrolling="no"></iframe>';

function parseHTML(html) {
  var t = document.createElement("template");
  t.innerHTML = html;
  return t.content;
}

function SVGToDataURL(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function resizeSVG(svg) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg, "image/svg+xml").documentElement;

  let viewBox = {
    x: "0",
    y: "0",
    width: "0",
    height: "0",
  };
  try {
    const viewBoxAttr = svgDoc.getAttribute("viewBox");
    if (!viewBoxAttr) {
      throw new TypeError("viewBox is not present in attributes");
    }
    const viewBoxAttrArray = viewBoxAttr.split(" ");
    viewBox = {
      x: viewBoxAttrArray[0],
      y: viewBoxAttrArray[1],
      width: viewBoxAttrArray[2],
      height: viewBoxAttrArray[3],
    };
  } catch (error) {
    if (error instanceof TypeError) {
      const svgWidth = svgDoc.getAttribute("width");
      if (svgWidth) {
        viewBox.width = svgWidth;
      }
      const svgHeight = svgDoc.getAttribute("height");
      if (svgHeight) {
        viewBox.height = svgHeight;
      }
      svgDoc.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
      );
    } else {
      throw error;
    }
  }
  svgDoc.setAttribute("style", "margin: 0 auto;");
  svgDoc.setAttribute("width", "100%");
  svgDoc.setAttribute("height", "100%");
  return svgDoc.outerHTML;
}

function optimizeSVG(svg) {
  return optimize(svg, {
    plugins: [
      // Переопределение пресета по умолчанию. Документация: https://svgo.dev/docs/preset-default/
      {
        name: "preset-default",
        params: {
          overrides: {
            // Удалять параметр на свой страх и риск! Без переопределения данного параметра по умолчанию некоторые файлы не будут корректно сжиматься
            removeViewBox: false,
          },
        },
      },
    ],
  }).data;
}

export function svgFromHTMLTemplate(html, cssURL, objects) {
  const parsedHTML = parseHTML(html);
  const pdfNode = document.getElementById("pdf");
  for (let [i, object] of objects.entries()) {
    pdfNode.appendChild(parsedHTML.cloneNode(true));
    const lastPage = pdfNode.lastElementChild;
    lastPage.id = `${i}`;
    const svgPlace = lastPage.querySelector(".svg-place");
    svgPlace.innerHTML = iframeDefinition
    if (object.title) {
      lastPage.querySelector(".page-title").innerHTML = lastPage
        .querySelector(".page-title")
        .innerHTML.replace("&lt;%pagetitle%&gt;", object.title);
    }
  
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '.' + mm + '.' + yyyy;

    lastPage.querySelector("#datatime").innerHTML ="Дата: " + formattedToday;
    const readySVG = resizeSVG(optimizeSVG(object.mainSvg));
    svgPlace.lastElementChild?.setAttribute("src", SVGToDataURL(readySVG));
    for (let [j, legendItem] of lastPage
      .querySelectorAll(".legend-item")
      .entries()) {
      const legendIcon = legendItem.querySelector(".legend-icon");
      const legendText = legendItem.querySelector(".legend-text");
      try {
        legendIcon.innerHTML = legendIcon.innerHTML.replace(
          "&lt;%legendicon%&gt;",
          iframeDefinition
        );
        const passedLegendItem = object.legend[j];
        const target = resizeSVG(optimizeSVG(passedLegendItem.icon));
        legendIcon.lastElementChild.setAttribute("src", SVGToDataURL(target));
        legendText.innerHTML = legendText.innerHTML.replace(
          "&lt;%legendtext%&gt;",
          passedLegendItem.text
        );
      } catch (error) {
        if (error instanceof TypeError) {
          legendIcon.textContent = "";
          legendText.textContent = "";
        }
      }
    }
  }

  setTimeout(() => {
    printJS({
      printable: "pdf",
      type: "html",
      css: cssURL,
      scanStyles: false,
      style: "@page{margin:0;}body{margin:0;}",
      maxWidth: NaN,
    });
    pdfNode.textContent = "";
  }, 250);
}