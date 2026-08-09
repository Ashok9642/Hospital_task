import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary:', error);
    console.error('Error Info:', errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>

          <p>An unexpected error occurred. Please try again.</p>

          <button onClick={this.handleReload}>Reload Page</button>

          {/* {process.env.NODE_ENV === 'development' && (
            <pre style={{ marginTop: '20px', color: 'red' }}>{this.state.error?.message}</pre>
          )} */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
