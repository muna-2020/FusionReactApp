import React, { Component } from "react";
import * as d3 from "d3";
import { element } from "prop-types";

const MARGIN = { TOP: 30, BOTTOM: 30, LEFT: 30, RIGHT: 30 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
const barWidth = 30;

class BarChart extends Component {
    constructor(element, props, onClickHandler) {
        super(props);
        this.canvas = React.createRef();
        //this.drawBarChart = this.drawBarChart.bind(this);
        let strTextX = props.Text.Resource[props.Meta.DataX];
        let strTextY = props.Text.Resource[props.Meta.DataY];
        this.drawBarChart(element, props.Data.DataX, props.Data.DataY, strTextX, strTextY);
    }

    //componentDidMount() {
    //    const data = [2, 4, 6, 16, 25, 30];
    //    const dataY = [10, 20, 30, 40, 50];
    //    this.drawBarChart(data, dataY);
    //}

    drawBarChart(element, data, dataY, strTextX, strTextY) {

        const svgCanvas = d3
            .select(element)
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")

        svgCanvas.x = d3.scaleLinear().range([0, WIDTH]);

        svgCanvas.y = d3.scaleLinear().range([HEIGHT, 0]);

        // Create scale
        var xscale = d3
            .scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, WIDTH]);

        var yscale = d3
            .scaleLinear()
            .domain([0, d3.max(dataY)])
            .range([HEIGHT, 0]);

        var x_axis = d3.axisBottom().scale(xscale);

        var y_axis = d3.axisLeft().scale(yscale);


        svgCanvas
            .append("g")
            .attr(
                "transform",
                "translate(" + MARGIN.BOTTOM + "," + MARGIN.TOP + ")"
            )
            .call(y_axis);

        var xAxisTranslate = HEIGHT + MARGIN.TOP;

        svgCanvas
            .append("g")
            .attr(
                "transform",
                "translate(" + MARGIN.LEFT + "," + xAxisTranslate + ")"
            )
            .text("x axis")
            .call(x_axis);


        svgCanvas.append('text')
            .attr('x', WIDTH / 2)
            .attr('y', HEIGHT + 60)
            .attr('font-size', 20)
            .attr('text-anchor', 'middle')
            .text(strTextX)

        svgCanvas.append('text')
            .attr('x', -(HEIGHT / 2))
            .attr('y', -70)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', 20)
            .attr('text-anchor', 'middle')
            .text(strTextY)

        // Create Bars
        svgCanvas
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("fill", "orange")
            .attr("x", (data) => xscale(data) + barWidth / 2)
            .attr("y", (dataY) => yscale(dataY) + MARGIN.TOP)
            .attr("width", barWidth)
            .attr("height", (data) => HEIGHT - yscale(data));

    }

    //render() {
    //    return <div ref={this.canvas}></div>;
    //}
}

export default BarChart;