// import './Skills.css'
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import createSkill from './mutations/createSkill'

class Skills extends Component {
  state = { label: '' }

  render() {
    const { skills } = this.props;
    const { label } = this.state;

    if (!skills) return console.log('no Skills props') || null;

    return (
      <div className="Skills">
        <h1>Skills</h1>
        <strong>{`${skills.length} skills`}</strong>

        <input type="text" value={label} onChange={e => this.setState({ label: e.target.value })} />
        <button onClick={() => createSkill(this.state)}>Create</button>

        <ol>
          {skills.map(s => <li key={s.id}>{s.label}</li>)}
        </ol>
      </div>
    );
  }
}

module.exports = createFragmentContainer(Skills, graphql`
  fragment Skills_skills on Skill @relay(plural: true) {
    id
    label
  }
`);

export default Skills
