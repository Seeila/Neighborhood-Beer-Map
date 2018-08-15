import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import BeerIcon from "../../img/icon.png";
import MapInfoWindow from "./infoWindow.js";

class Markers extends Component  {
	constructor(props, context) {
		 super(props, context);
		 this.state = {
			infoWindowIsOpen:false,
			brewerysBeers: []
		};
	}

	toggleInfoWindow = () => {
		this.setState(prevState => ({infoWindowIsOpen: !prevState.infoWindowIsOpen }));
	}

	componentDidMount() {
	 this.filterBeersFromBrewery(this.props.brewery);
	}

	filterBeersFromBrewery(brewery) {
		const beersFromBrewery = this.props.allBeers.filter(beer => beer.brewery.name === brewery.title);

		this.setState({ brewerysBeers : beersFromBrewery });
	}


	render() {
		const {brewery} = this.props;
		const {infoWindowIsOpen, brewerysBeers} = this.state;

		return (
	      <Marker
				ref={(map) => this._map = map}
	         position={brewery.location}
	         icon={BeerIcon}
	         title={brewery.title}
	         animation={window.google.maps.Animation.DROP}
				onClick={() => this.toggleInfoWindow()}
	      >
			 {infoWindowIsOpen && <MapInfoWindow brewery={brewery} brewerysBeers={brewerysBeers} infoWindowIsOpen={infoWindowIsOpen} key={brewery.title + '-infoWindow'}/>}
	      </Marker>
		)
	}
}

export default Markers;
