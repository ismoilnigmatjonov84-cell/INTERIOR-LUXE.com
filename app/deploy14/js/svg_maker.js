class SVGGenerator {
    constructor(params, content) {
        this.params = params;
        this.content = content;
    }

    generateSVG() {
        const svgElement = document.createElementNS(this.params.xmlns, 'svg');
        svgElement.setAttribute('xmlns', this.params.xmlns);
        svgElement.setAttribute('x', this.params.x);
        svgElement.setAttribute('y', this.params.y);
        svgElement.setAttribute('viewBox', this.params.viewBox);
        svgElement.setAttribute('xml:space', this.params['xml:space']);
        svgElement.setAttribute('height', this.params.height);
        svgElement.setAttribute('width', this.params.width);

        svgElement.innerHTML = this.content;

        return svgElement.outerHTML;
    }
}