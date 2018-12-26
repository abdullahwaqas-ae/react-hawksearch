import { Response, Request, Selections, SelectionFacetValue } from 'models/Search';
import { Value, Facet } from 'models/Facets';

export class SearchStore {
	/** This represents the next search request that will be executed. */
	public pendingSearch: Partial<Request>;
	/**
	 * Whether or not the next search request will perform history actions (pushing the search into browser
	 * history).
	 */
	public doHistory: boolean;

	/** Whether or not a search request is waiting for completion. */
	public isLoading: boolean;

	/** The results of the last search request, if one has been performed. Otherwise, `undefined`. */
	public searchResults?: Response;

	public constructor(initial?: Partial<SearchStore>) {
		Object.assign(this, initial);
	}

	/**
	 * Returns whether or not this is the initial load of the search results.
	 */
	public get isInitialLoad() {
		return this.isLoading && !this.searchResults;
	}

	/**
	 * Determines whether or not the given facet and facet value is selected, and returns info regarding the selection.
	 * @param facet The facet for which the facet value will be checked for selection.
	 * @param facetValue The facet value that will be checked for selection.
	 */
	public isFacetSelected(facet: Facet | string, facetValue: Value | string): SelectionInfo {
		const facetName = typeof facet === 'string' ? facet : facet.Name;
		const facetField = typeof facet === 'string' ? facet : facet.ParamName ? facet.ParamName : facet.Field;

		const valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
		const valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

		if (!valueValue) {
			console.error(`Facet ${facetName} (${facetField}) has no facet value for ${valueLabel}`);
			return { state: FacetSelectionState.NotSelected };
		}

		const facetSelections = this.pendingSearch.FacetSelections;

		if (!facetSelections || !facetSelections[facetField]) {
			return { state: FacetSelectionState.NotSelected };
		}

		const selectionIdx = facetSelections[facetField]!.indexOf(valueValue);
		const negationIdx = facetSelections[facetField]!.indexOf(`-${valueValue}`);

		if (selectionIdx !== -1) {
			// if the exact facet value exists, then we're normally selected
			return {
				state: FacetSelectionState.Selected,
				selectedValue: valueValue,
				selectionIndex: selectionIdx,
			};
		} else if (negationIdx !== -1) {
			// if the facet value is selected but prefixed with a -, then we're negated
			return {
				state: FacetSelectionState.Negated,
				selectedValue: `-${valueValue}`,
				selectionIndex: negationIdx,
			};
		}

		return { state: FacetSelectionState.NotSelected };
	}

	/**
	 * Returns an object containing the selections that have been made in both the next search request and also
	 * in the previous search request. This should be used when iterating selections instead of pulling the values
	 * out from the search result or pending search - as this will merge the values together and provide an accurate
	 * view of all facet selections.
	 */
	public get facetSelections(): Selections {
		const {
			pendingSearch: { FacetSelections: clientSelections },
			searchResults,
		} = this;

		const selections: Selections = {};

		if (!clientSelections) {
			return selections;
		}

		// if we've made selections on the client, transform these into more detailed selections.
		// the client-side selections are just facet fields and values without any labels - so we
		// need to combine this information with the list of facets received from the server in the
		// previous search in order to return a rich list of selections

		const facets = searchResults ? searchResults.Facets : null;

		if (!facets) {
			// but we can only do this if we've received facet information from the server. without this
			// info we can't determine what labels should be used
			return selections;
		}

		Object.keys(clientSelections).forEach(fieldName => {
			const selectionValues = clientSelections[fieldName];

			if (!selectionValues) {
				// if this selection has no values, it's not really selected
				return;
			}

			// `ParamName` can override the `Field` value, so search by both
			const facet = facets.find(f => (f.ParamName && f.ParamName === fieldName) || f.Field === fieldName);

			if (!facet) {
				// if there's no matching facet from the server, we can't show this since we'll have no labels
				return;
			}

			const items: SelectionFacetValue[] = [];

			selectionValues.forEach(selectionValue => {
				const matchingVal = facet.Values.find(
					// note that we need to search by regular value and also negated values
					facetValue => facetValue.Value === selectionValue || `-${facetValue.Value}` === selectionValue
				);

				if (!matchingVal || !matchingVal.Label) {
					// if there's no matching value from the server, we cannot display because there would
					// be no label - same if there's no label at all
					return;
				}

				items.push({
					Label: matchingVal.Label,
					Value: selectionValue,
				});
			});

			selections[fieldName] = {
				Label: facet.Name,
				Items: items,
			};
		});

		return selections;
	}
}

export enum FacetSelectionState {
	/** The facet value is not selected. */
	NotSelected,
	/** The facet value is selected. */
	Selected,
	/** The facet value is selected, but negated. */
	Negated,
}

export interface SelectionInfo {
	/** The facet value selection state. */
	state: FacetSelectionState;

	/**
	 * If the facet value is `FacetSelectionState.Selected` or `FacetSelectionState.Negated`, this is the value of
	 * the facet value. For negated facet values this will be prefixed with the negation character `'-'`.
	 */
	selectedValue?: string;
	/**
	 * If the facet value is `FacetSelectionState.Selected` or `FacetSelectionState.Negated`, this is the index
	 * into the `pendingSearch.FacetSelections[facetName]` array for this facet value.
	 */
	selectionIndex?: number;
}

export interface SearchActor {
	/**
	 * Performs a search with the currently configured pending search request. The search request can be
	 * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
	 * the `StoreProvider` component will usually trigger searches directly in response to calls to
	 * `setSearch`.
	 * @returns A promise that resolves when the search request has been completed.
	 */
	search(): Promise<void>;

	/**
	 * Configures the next search request that will be executed. This will also execute a search in response to
	 * the next search request changing.
	 * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
	 * @param doHistory Whether or not this search request will push a history entry into the browser. If
	 * 					not specified, the default is `true`.
	 */
	setSearch(search: Partial<Request>, doHistory?: boolean);

	/**
	 * Selects a facet value for the next search request that will be executed. Internally, this will call
	 * `setSearch` to configure the next search with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	selectFacet(facet: Facet | string, facetValue: Value | string, negate?: boolean);
}