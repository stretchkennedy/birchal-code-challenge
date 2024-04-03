import { ReactNode } from 'react';

export interface StateHandlerProps {
  loading: boolean;
  error?: Error;
  reload: () => Promise<void>;
  children: ReactNode;
}

const StateHandler = ({ loading, error, children, reload }: StateHandlerProps) => {
  if (error) {
    // left bare-bones
    return (
      <div>
        <pre>Error: {error.message}</pre>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }
  if (loading) {
    return "Loading...";
  }
  return children;
}

export default StateHandler;
