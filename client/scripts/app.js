import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>App</div>
    );
  }
}

export default App;

React.render(
	<App />,
	document.getElementById('app')
);
