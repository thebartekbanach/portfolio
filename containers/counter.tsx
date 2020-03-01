import { connect } from "react-redux";
import { counterActions } from "../store/counter/actions";
import { FC } from "react";
import { Store } from "../store";

interface CounterProps {
	count?: number;
	increment?: () => void;
}

export const Counter: FC<CounterProps> = ({ count, increment }) => (
	<div>
		<h2>Count: {count}</h2>
		<button onClick={increment}>Increment async!</button>
	</div>
);

const mapStateToProps = (state: Store) => ({
	count: state.count
});

const mapDispatchToProps = {
	increment: counterActions.incrementAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
