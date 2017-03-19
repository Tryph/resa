import React, { Component } from 'react';

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Content from './components/Content'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;

