import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;


class D3Chart {
	constructor(element, objProps, onClickHandler) {
	let vis = this;
	let strTextX = objProps.Text.Resource[objProps.Meta.DataX];
	let strTextY = objProps.Text.Resource[objProps.Meta.DataY];
		vis.onClickHandler = onClickHandler

    vis.g = d3.select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.x = d3.scaleLinear()
      .range([0, WIDTH]);

    vis.y = d3.scaleLinear()
	  .range([HEIGHT, 0]);
	  
	  vis.xAxisGroup = vis.g.append('g')
	  	.attr('transform', `translate(0, ${HEIGHT})`)
	  vis.yAxisGroup = vis.g.append('g')

	  vis.g.append('text')
	  .attr('x', WIDTH / 2)
	  .attr('y', HEIGHT + 40)
	  .attr('font-size', 20)
	  .attr('text-anchor', 'middle')
	  .text(strTextX)
	  
	  vis.g.append('text')
	  .attr('x', -(HEIGHT / 2))
	  .attr('y', -50)
	  .attr('transform', 'rotate(-90)')
	  .attr('font-size', 20)
	  .attr('text-anchor', 'middle')
	  .text(strTextY)

    vis.update(objProps.Data, objProps.Meta);
  }

  update(objData, objMeta) {
	let vis = this
	vis.data = objData

	  vis.x.domain([0, d3.max(vis.data, (d) => Number(d[objMeta["DataX"]]))])
	vis.y.domain([0, d3.max(vis.data, (d) => Number(d[objMeta["DataY"]]))])

	const xAxisCall = d3.axisBottom(vis.x)
	const yAxisCall = d3.axisLeft(vis.y)

	vis.xAxisGroup.transition(1000).call(xAxisCall)
	vis.yAxisGroup.transition(1000).call(yAxisCall)

	// JOIN
	const circles = vis.g.selectAll("circle")
	.data(vis.data, d => d.name)


	// EXIT
	circles.exit().transition(1000).attr('cy', vis.y(0)).remove()

	// UPDATE
	circles.transition(1000)
	.attr("cx", d => vis.x(d[objMeta["DataX"]]))
	.attr("cy", d => vis.y(d[objMeta["DataY"]]))

	//ENTER
	circles
	.enter()
	.append("circle")
	.attr('cy', vis.y(0))
	 .attr("cx", d => vis.x(d[objMeta["DataX"]]))
	 .attr("r", 5)
	 .attr("fill", "gold")
	 .on('click', d => vis.onClickHandler(d.name))
	 .transition(1000)
	 .attr("cy", d => vis.y(d[objMeta["DataY"]]))


  }
}

export default D3Chart;
