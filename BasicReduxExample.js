import Redux from 'redux';

// When we want to change state/data we call ACTION CREATOR 
// Will produce an ACTION object, which will describe how to change data
// This is fed to the DISPATCH function, which will make copies of action object
// and pass them to all REDUCERS. Reducers will modify the state/data as necessary,
// then return a new STATE object.

// Action Creators
const createPolicy = (name, amount) => {
	return {
		type: 'CREATE_POLICY',
		payload: {
			name, 
			amount
		}
	};
};

const deletePolicy = (name) => {
	return {
		type: 'DELETE_POLICY',
		payload: {
			name
		}
	};
};

const createClaim = (name, amountOfMoneyToCollect) => {
	return {
		type: 'CREATE_CLAIM',
		payload: {
			name,
			amountOfMoneyToCollect
		}
	}
}

// Reducers
const claimsHistory = (oldListOfClaims = [], action) => {
	if (action.type === 'CREATE_CLAIM') {
		return [...oldListOfClaims, action.payload];
	}

	return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
	if (action.type === 'CREATE_CLAIM') {
		return bagOfMoney - action.payload.amountOfMoneyToCollect;
	} else if (action.type === 'CREATE_POLICY') {
		return bagOfMoney + action.payload.amount;
	}
}

// wire together all reducers 
const { createStore, combineReducers } = Redux;

// define object with all reducers defined
// keys can be any name to be used in state
const ourDepartments = combineReducers({
	accounting: accounting,
	claimsHistory: claimsHistory,
	policies: policies
});

// Access all data from reducers in the store
const store = createStore(ourDepartments);

// use dispatch to take an action and make a copy of it for each reducer
// As soon as dispatch runs, all reducers will execute the action.
store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

// View updated store after newAction 
console.log(store.getState());
