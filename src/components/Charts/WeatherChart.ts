import * as d3 from "d3";
import { Element } from "react-faux-dom";

import { NumberValue } from "d3";

const getFormattedHours = (time: string) => {
  return `${Math.floor(parseInt(time) / 100)}:00`;
};
const plot = (chart: any, width: number, height: number, data: any) => {
  const xScale = d3
    .scaleBand()
    .domain(data.map((d: any) => getFormattedHours(d.time)))
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (d: any) => parseInt(d.tempC)),
    ] as Iterable<NumberValue>)
    .range([height, 0]);

  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", (d: any) => xScale(getFormattedHours(d.time)))
    .attr("y", (d: any) => yScale(parseInt(d.tempC)))
    .attr("height", (d: any) => height - yScale(parseInt(d.tempC)))
    .attr("width", (d: any) => xScale.bandwidth())
    .style("fill", "rgb(43, 20, 118)");

  chart
    .selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .classed("bar-label", true)
    .attr(
      "x",
      (d: any) => xScale(getFormattedHours(d.time))! + xScale.bandwidth() / 2
    )
    .attr("dx", 0)
    .attr("y", (d: any) => yScale(parseInt(d.tempC)))
    .attr("dy", -6)
    .text((d: any) => parseInt(d.tempC));

  const xAxis = d3.axisBottom(xScale).scale(xScale);

  chart
    .append("g")
    .classed("x axis", true)
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).ticks(5).scale(yScale);

  chart
    .append("g")
    .classed("y axis", true)
    .attr("transform", "translate(0,0)")
    .call(yAxis);

  chart
    .select(".x.axis")
    .append("text")
    .attr("x", width / 2)
    .attr("y", 60)
    .attr("fill", "rgb(43, 20, 118)")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Hour");

  chart
    .select(".y.axis")
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("transform", `translate(-50, ${height / 2}) rotate(-90)`)
    .attr("fill", "rgb(43, 20, 118)")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Temperature");
};

export const drawChart = (data: any) => {
  const width = 800;
  const height = 450;

  const el = new Element("div");
  const svg = d3
    .select(el)
    .attr("class", "plotted-chart-container")
    .append("svg")
    .attr("id", "chart")
    .attr("width", width)
    .attr("height", height);

  const margin = {
    top: 60,
    bottom: 100,
    left: 80,
    right: 40,
  };

  const chart = svg
    .append("g")
    .classed("display", true)
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  plot(chart, chartWidth, chartHeight, data);

  return el.toReact();
};
