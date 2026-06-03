import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", minHeight: "40vh", gap: "1rem",
            fontFamily: "var(--font-heading)", textAlign: "center", padding: "2rem",
          }}>
            <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(247,243,227,0.5)" }}>
              Something went wrong
            </p>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              style={{
                color: "var(--color-light)", fontSize: "0.75rem", textTransform: "uppercase",
                letterSpacing: "0.1em", border: "1px solid rgba(247,243,227,0.35)",
                borderRadius: "0.3rem", padding: "0.5rem 1.25rem", textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
