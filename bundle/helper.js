import { ajax } from 'jquery';

export const requestMovies = () => {
	return ajax({
		url: "https://data.sfgov.org/resource/wwmu-gmzc.json"
	});
}

export const requestLocation = address => {
	return ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json",
		data: { 
			address,
			key: "AIzaSyDojMKdjCOwvW_IipSnG0xQFzU9Qjmp3Qc"
		}
	})
}

export const groupMovies = movieLocations => {
	let movies = {};
	movieLocations.forEach(location => {
		let locationData = {
			address: location.locations,
			funFact: location.fun_facts,
			actorOne: location.actor_1,
			actorTwo: location.actor_2,
			actorThree: location.actor_3,
		}

		if (movies[location.title]) {
			movies[location.title].locations.push(locationData);
		} else {
			movies[location.title] = {
				title: location.title,
				director: location.director,
				writer: location.writer,
				distributor: location.distributor,
				productionCompany: location.production_company,
				year: location.release_year,
				locations: [locationData]
			};
		}
	});

	return movies;
}

export const markerContent = location => {
	let content = `
		<div>
			<strong>Location:</strong> ${location.address}
		</div>
	`;

	if (location.actorOne) {
		content += `
			<div>
				<strong>Actor One:</strong> ${location.actorOne}
			</div>
		`;
	}

	if (location.actorTwo) {
		content += `
			<div>
				<strong>Actor Two:</strong> ${location.actorTwo}
			</div>
		`;
	}

	if (location.actorThree) {
		content += `
			<div>
				<strong>Actor Three:</strong> ${location.actorThree}
			</div>
		`;
	}

	if (location.funFact) {
		content += `
			<div>
				<strong>Fun Fact:</strong> ${location.funFact}
			</div>
		`;
	}

	return content;
};