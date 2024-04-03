import { StateHandlerProps } from '../hire/birchal-code-challenge/frontend/src/pages/Home';

export const StateHandler = ({ loading, error, children }: StateHandlerProps) => {
    if (error) {
        return <pre>{error.stack}</pre>;
    }
    if (loading) {
        return 'Loading...';
    }
    return children;
};
