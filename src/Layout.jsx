import React from "react";
import { Outlet } from "react-router-dom";
import Button from "./components/Button";
import './css/Layout.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return React.cloneElement(this.props.fallback, {
          error: this.state.error,
          errorInfo: this.state.errorInfo
        });
      }
      return (
        <div>
          <h2>Oops! Something went wrong.</h2>
          <p>
            We're sorry, but an unexpected error occurred.
          </p>
          <Button customClassName="refreshButton" onClick={() => window.location.reload()} text="Refresh Page" />
          {import.meta.env.MODE === 'development' && (
            <details>
              <summary>Error Details</summary>
              <pre>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

const BugReportPage = ({ error, errorInfo }) => {
  const GITHUB_REPO_ISSUES_URL = "https://github.com/seanbelverstone/antre/issues";

  const createIssueUrl = () => {
    let issueBody = "## Bug Report\n\n";
    issueBody += "### Description\n(Please describe the bug you encountered)\n\n";
    issueBody += "### Steps to Reproduce\n1. \n2. \n3. \n\n";
    issueBody += "### Expected Behavior\n\n";
    issueBody += "### Actual Behavior\n\n";
    issueBody += "### Environment\n";
    issueBody += `- Browser: ${navigator.userAgent}\n`;
    issueBody += `- OS: ${navigator?.userAgentData?.platform ?? navigator?.platform}\n`;
    issueBody += "\n### Error Details (for developers - please do not modify)\n";
    if (error) {
      issueBody += "`\n" + error.toString() + "\n`\n";
    }
    if (errorInfo && errorInfo.componentStack) {
      issueBody += "`\n" + errorInfo.componentStack + "\n`\n";
    }

    const encodedIssueBody = encodeURIComponent(issueBody);
    return `${GITHUB_REPO_ISSUES_URL}/new?body=${encodedIssueBody}`;
  };

  return (
    <div className="page">
      <h1>Oops!</h1>
      <h2>Something went wrong.</h2>
      <p>
        We're truly sorry for the inconvenience. An unexpected error occurred while loading this page.
      </p>
			<Button customClassName="refreshButton" onClick={() => window.location.reload()} text="Refresh Page" />
      <div className="reportBugArea">
        <a
          href={createIssueUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Report a Bug on GitHub
        </a>
      </div>
      <p>
        Your feedback helps us make the application better!
      </p>

      {import.meta.env.MODE === 'development' && (
        <details>
          <summary>Developer Error Details</summary>
          <pre>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </pre>
        </details>
      )}
    </div>
  );
};

const Layout = () => {
  return (
		<ErrorBoundary fallback={<BugReportPage />}>
			<Outlet />
		</ErrorBoundary>
  );
};

export default Layout;