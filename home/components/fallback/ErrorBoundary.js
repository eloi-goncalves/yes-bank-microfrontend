import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.error('Error caught in Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '20px', color: 'red' }}>
            Serviço está fora, por favor tente novamente mais tarde.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
