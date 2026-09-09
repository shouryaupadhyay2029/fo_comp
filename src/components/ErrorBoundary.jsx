import React, { Component } from 'react';

/**
 * React Error Boundary component capturing runtime UI errors
 * and presenting a graceful fallback screen to prevent app crashes.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('VELOURA ErrorBoundary caught runtime error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card font-mono text-center">
            <span className="error-tag">VELOURA / RECOVERY PROTOCOL</span>
            <h1 className="error-title font-sans">SOMETHING DISTURBED THE RESONANCE.</h1>
            <p className="error-message text-muted">
              "A unexpected error occurred in the thought matrix."
            </p>
            <button className="action-link btn-error-reset" onClick={this.handleReset}>
              RESTORE MINDSCAPE →
            </button>
          </div>

          <style>{`
            .error-boundary-wrapper {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #121110;
              color: #f6f2ec;
              padding: 40px 24px;
            }
            .error-boundary-card {
              max-width: 540px;
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(217, 78, 0, 0.3);
              border-radius: 12px;
              padding: 48px 32px;
              box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
            }
            .error-tag {
              font-size: 0.75rem;
              color: #d94e00;
              letter-spacing: 0.15em;
              display: block;
              margin-bottom: 16px;
            }
            .error-title {
              font-size: 2.2rem;
              font-weight: 800;
              line-height: 1.05;
              margin-bottom: 16px;
            }
            .error-message {
              font-size: 0.9rem;
              margin-bottom: 32px;
              font-style: italic;
            }
            .btn-error-reset {
              font-size: 0.85rem;
              color: #d94e00;
              cursor: pointer;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
