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

var Evening = React.createClass({
  render: function() {
    return (
      React.createElement('span', { className: 'evening' }, 'Evening! ')
    );
  }
});

var Clock = React.createClass({
  render: function() {
    return (
      this.props.hour < 12 ? <Morning /> :
      this.props.hour < 18 ? <Afternoon /> : <Evening />
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