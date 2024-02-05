import { Reducer } from 'redux';
import { UPDATE_PRODUCT } from '../../constants';
import { ProductAction, ProductPayload } from '../../types';

interface IProductState {
  [id: string]: ProductPayload;
}

const initialState: IProductState = {
    1: { id: '1', name: 'Shirt', quantity: 0, price: 1 },
    2: { id: '2', name: 'Pants', quantity: 0, price: 5 },
    3: { id: '3', name: 'Shoes', quantity: 0, price: 20 },
};

const postReducer: Reducer<IProductState, ProductAction> = function (
    prevState = initialState,
    action,
) {
    const { type, payload } = action;
    Object.freeze(prevState); // prevents us from accidentally mutating state

    switch (type) {
            
        default:
            return prevState;
    }
};

export default postReducer;
