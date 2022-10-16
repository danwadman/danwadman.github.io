var hour = (new Date).getHours();

var Morning = React.createClass({
  render: function() {
    return (
      React.createElement('span', { className: 'morning' }, 'Morning! ')
    );
  }
});

var Afternoon = React.createClass({
  render: function() {
    return (
      React.createElement('span', { className: 'afternoon' }, 'Afternoon! ')
    );
  }
});

var Clock = React.createClass({
  render: function() {
    return (
      this.props.hour < 12 ? <Morning /> : <Afternoon /> 
    );
  }
});

var Year = React.createClass({
  render: function() {
    return (
      <p>© Daniel Wadman {new Date().getFullYear()}</p>
    );
  }
});

React.render(
  React.createElement(Year),
  document.getElementById('date')
);

React.render(
  <Clock hour={hour} />,
  document.getElementById('clock')
);