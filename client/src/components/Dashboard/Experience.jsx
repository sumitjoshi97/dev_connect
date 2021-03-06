import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'react-moment'
import * as actions from '../../store/actions/index'

export class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
          {exp.current ? (
            'current'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.props.onDeleteExperience(exp._id)}
            className="btn btn-danger btn-shadow"
          >
            Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDeleteExperience: exp_id => dispatch(actions.deleteExperience(exp_id))
})

export default connect(
  null,
  mapDispatchToProps
)(Experience)
