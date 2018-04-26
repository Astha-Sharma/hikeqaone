export default function promiseMiddleware(client){

    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            // Deconstructing payload, types and the rest of the object
            const {payload, types, ...rest} = action;
            //Payload represents an async function to which a client (api) object is passed to make calls
            if (payload) {
                if(types){
                const [ PENDING, FULFILLED, REJECTED ] = types;
                /* Dispatching first async handler to tell reducer about async action */
                next({
                    type: PENDING,
                    ...rest
                });

                /**
                 *	 Return fulfilled or rejected action object
                 */
                return payload(client).then(
                    data => next({
                        data,
                        type: FULFILLED,
                        ...rest
                    }),
                    error => next({
                        payload: error,
                        type: REJECTED,
                        ...rest
                    })
                );
            }
            }
            //Else dispatch a syn action
            return next(action);
        };
    };
}
