import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         query: "",
         focusedListItem: 1
      };
   }

   static propTypes = {
      shownBreweries: PropTypes.array.isRequired,
      searchBarIsOpen: PropTypes.bool.isRequired,
      updateShownBreweries: PropTypes.func.isRequired,
      onClickedMarker: PropTypes.func.isRequired
   };

   componentDidUpdate() {
      // if the element currently focused is the menu button
      // setTimeout to focus on iput after the fadeIn animation,
      // doesnt'work if not delayed
      if(document.activeElement === document.getElementById('menubutton')) {
         setTimeout(() => this.searchInput.focus(), 600);
      }
   }

   //updates the query state and the showed breweries depending the query
   updateQuery = query => {
      this.setState({ query: query.trim() });
      this.props.updateShownBreweries(query);
   };

   changeItemFocus(event) {
      if(event.which === 40) {
         this.setState(prevState => ({
            focusedListItem: prevState.focusedListItem + 1
         }));
      }
      if(event.which === 38) {
         this.setState(prevState => ({
            focusedListItem: (prevState.focusedListItem - 1)
         }));
      }
   }

   render() {
      const { shownBreweries, searchBarIsOpen } = this.props;
      const { query, focusedListItem } = this.state

      return (
         <section
            id="searchBar"
            className={searchBarIsOpen ? "open" : null}
         >
            <h2>Breweries</h2>
            <input
               autoFocus
               type="text"
               placeholder="Enter a brewery name here"
               value={query}
               onChange={event => this.updateQuery(event.target.value)}
               ref={c => this.searchInput = c}
            />
         <ul role="listbox"  tabIndex={shownBreweries.length ? "0" : "-1"} aria-activedescendant={`listItem${focusedListItem}`} onKeyDown ={(event) => this.changeItemFocus(event)}>
               {shownBreweries.map((brewery, index) => (
                  <li key={brewery.title}
                     id={`listItem${index}`}
                     role="option"
                     className={focusedListItem === index + 1 ? "focused" : null}
                     aria-selected={focusedListItem === index + 1 ? true : false}
                  >
                     <button onClick={() => this.props.onClickedMarker(brewery)}>
                        {brewery.title}
                     </button>
                  </li>
               ))}
            </ul>
         </section>
      );
   }
}

export default SearchBar;
