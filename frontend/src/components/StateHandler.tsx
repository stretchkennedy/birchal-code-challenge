import { ReactNode } from 'react';

export interface StateHandlerProps {
  loading: boolean;
  error?: Error;
  reload: () => Promise<void>;
  children: ReactNode;
}

const StateHandler = ({ loading, error, children, reload }: StateHandlerProps) => {
  // left bare-bones because we don't have designs and I'm not sure this was
  // meant to be part of the test
  if (error) {
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
