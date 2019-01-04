import * as React from 'react';

interface MinusSVGProps {
	class: string;
}

/**
 * Minus SVG
 *
 * @returns
 */
class MinusSVG extends React.Component<MinusSVGProps> {
	constructor(props) {
		super(props);
	}

	public static defaultProps: Partial<MinusSVGProps> = {
		class: '',
	};

	public render() {
		return (
			<svg viewBox="0 0 32 32" className={'icon ' + this.props.class} focusable="false" aria-hidden="true">
				<path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z" />
			</svg>
		);
	}
}

export default MinusSVG;
