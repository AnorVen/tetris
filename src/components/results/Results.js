import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Results extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  data = [{
    name: 'Name',
    id: 43222,
    scope: 100,
    data: Date.now()
  }];

  render() {
    return (

      <table>
        <thead>
        <tr>
          <td>
            результаты
          </td>
        </tr>
        </thead>
        <tbody>
        {this.data.map((el, i) => {
            return (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.scope}</td>
                <td>{el.data}</td>
              </tr>
            )
          }
        )}
        </tbody>
      </table>
    );
  }
}

Results.propTypes = {};

export default Results;