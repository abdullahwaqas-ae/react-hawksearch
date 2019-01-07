import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import { FacetSelectionState } from 'store/Store';
import DashCircleSVG from 'components/svg/DashCircleSVG';
import CheckmarkSVG from 'components/svg/CheckmarkSVG';

function Checkbox() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-checkbox">
				<ul className="hawk-facet-rail__facet-list">
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const isNegated = selectionState === FacetSelectionState.Negated;

						return (
							<li key={value.Value} className="hawk-facet-rail__facet-list-item">
								{/*	todo: this should emulate the look of a checkbox (but still retain the functionality
									of a button) */}

								{/* <div>{isSelected ? '[x]' : '[ ]'}</div> */}

								<button
									onClick={e => actor.selectFacet(value)}
									className="hawk-facet-rail__facet-btn"
									aria-pressed={isSelected}
								>
									<span
										className={
											isSelected
												? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked'
												: 'hawk-facet-rail__facet-checkbox'
										}
									>
										{isSelected ? (
											<CheckmarkSVG class="hawk-facet-rail__facet-checkbox-icon" />
										) : null}
									</span>

									<span
										style={isNegated ? { textDecoration: 'line-through' } : undefined}
										className="hawk-facet-rail__facet-name"
									>
										{value.Label} ({value.Count})
									</span>
								</button>

								<button
									onClick={e => actor.negateFacet(value)}
									className="hawk-facet-rail__facet-btn-negate"
								>
									<DashCircleSVG /> <span className="visually-hidden">Negate facet</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* render the default truncation control as we don't need to customize this */}
			{renderer.renderTruncation()}
		</div>
	);
}

export default Checkbox;
