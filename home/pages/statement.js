import React from "react";
import { StatementComponent } from '../components/statement/StatementComponent';
import ErrorBoundary from '../components/fallback/ErrorBoundary';

const StatementPage = () => {
  return (
    <ErrorBoundary>
      <StatementComponent />
    </ErrorBoundary>
  );
}

export default StatementPage;