import React, { Component } from 'react';
import * as d3 from 'd3';
// import UserGraph from './UserGraph';
// import logo from './logo.svg';
// import './UserGraph.css';

class UserGraph extends Component {

  componentDidMount() {
    console.log(d3);
    const { vertices, edges } = this.props;

    userGraph(vertices, edges);
  }

  render() {
    return (
      <div className="UserGraph">
        <canvas width="960" height="640" />
      </div>
    );
  }
}

UserGraph.defaultProps = {
  vertices: [
    { name: 'Creighton Hospital' },
    { name: 'Heart Hospital' },
    { name: 'Marshall Regional Medical Center' },
    { name: 'McKennan Hospital & University Health Center' },
    { name: 'Queen of Peace Hospital' },
    { name: 'Sacred Heart Hospital' },
    { name: 'St. Luke\'s Hospital' },
    { name: 'St. Mary\'s Hospital' },
    { name: 'Milbank Area Hospital' },
    { name: 'Pipestone County Medical Center' },
    { name: 'St. Michael\'s Hospital' },
    { name: 'Wagner Community Memorial Hospital' }
	],
	edges: [
    { source: 0, target: 0 },
    { source: 1, target: 1 },
    { source: 1, target: 7 },
    { source: 2, target: 2 },
    { source: 3, target: 1 },
    { source: 3, target: 3 },
    { source: 3, target: 9 },
    { source: 4, target: 4 },
    { source: 6, target: 5 },
    { source: 6, target: 3 },
    { source: 8, target: 8 },
    { source: 10, target: 3 },
    { source: 11, target: 3 },
    { source: 11, target: 11 }
	],
};

function userGraph(vertices, edges) {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const { width, height } = canvas;

  // D3 lingo
  const nodes = vertices;
  const links = edges;

  const simulation = d3
  .forceSimulation(nodes)
  .force('charge', d3.forceManyBody())
  .force('link', d3.forceLink(links).strength(1))
  .force('x', d3.forceX())
  .force('y', d3.forceY())
  .on('tick', ticked);

  d3
  .select(canvas)
  .call(d3
    .drag()
    .container(canvas)
    .subject(dragsubject)
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
  );

  function ticked() {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    links.forEach(drawLink);
    context.strokeStyle = '#aaa';
    context.stroke();

    context.beginPath();
    nodes.forEach(drawNode);
    context.fill();
    context.strokeStyle = '#fff';
    context.stroke();

    context.restore();
  }

  function dragsubject() {
    return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
  }

  function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();

    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);

    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  function drawLink(d) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }

  function drawNode(d) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }
}

export default UserGraph;
