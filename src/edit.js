import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element'
import { ServerSideRender } from '@wordpress/components';
import axios from 'axios';
import './editor.scss';
import 'weather-icons/css/weather-icons.css';

export default function Edit( { attributes, setAttributes } ) {

	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [message, setMessage] = useState('');

	const weatherIcons = {
		ThunderStorm : "wi-thunderstorm",
		Drizzle : "wi-sleet",
		Rain : "wi-storm-showers",
		Snow : "wi-snow",
		Atmosphere : "wi-fog",
		Clear : "wi-day-sunny",
		Clouds : 'wi-day-fog'
	};

	function getWeatherIcon ( icons, rangeID ) {
		switch(true) {
			case rangeID >= 200 && rangeID <= 232:
				setAttributes( {
					weatherIcons: icons.ThunderStorm,
				});
			break;
			case rangeID >= 300 && rangeID <= 321:
				setAttributes( {
					weatherIcons: icons.Drizzle,
				});
			break;
			case rangeID >= 500 && rangeID <= 531:
				setAttributes( {
					weatherIcons: icons.Rain,
				});
			break;
			case rangeID >= 600 && rangeID <= 622:
				setAttributes( {
					weatherIcons: icons.Snow,
				});
			break;
			case rangeID >= 701 && rangeID <= 781:
				setAttributes( {
					weatherIcons: icons.Atmosphere,
				});
			break;
			case rangeID === 800:
				setAttributes( {
					weatherIcons: icons.Clear,
				});
			break;
			case rangeID >= 801 && rangeID <= 804:
				setAttributes( {
					weatherIcons: icons.Clouds,
				});
			break;
		};
	}

	const kelvinToCelcius = ( temp ) => {
		let cTemp = Math.floor(temp - 273.15);
		return cTemp;
	}

	async function handleSubmitData (e) {
		e.preventDefault();
		const apiKey = 'b63055264a7fc5e392a2caa29eb96bc7';
		try {
			let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
			let result = await res;
			if (result.status === 200) {
				setMessage('Data Fetched Successfully !');
			} else {
				setMessage('Some error occured !');
			}
			console.log(result);
			setAttributes( {
				cityName: result.data.name,
			})
			setAttributes( {
				minTemp: kelvinToCelcius( result.data.main.temp_min ).toFixed(2),
			})
			setAttributes( {
				maxTemp: kelvinToCelcius( result.data.main.temp_max ).toFixed(2),
			})
			setAttributes( {
				actualTemp: kelvinToCelcius( result.data.main.temp ).toFixed(2),
			})
			getWeatherIcon(weatherIcons, result.data.weather[0].id);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className='dynamic__container'>
			<form onSubmit={handleSubmitData}>
				<label className='heading_label'>City</label>
					<input type="text"
					className='city_input'
					value={city}
					placeholder="Add City Name"
					onChange={ (e) => setCity(e.target.value) }
					/>
				<label>Country</label>
					<input type="text"
					className='country_input'
					value={country}
					placeholder="Add City Name"
					onChange={ (e) => setCountry(e.target.value) }
					/>
				<button type='submit' className='submit_btn'>Search</button>
			</form>
		<div>
			<ServerSideRender
				block="mukul-singh/dynamic-map-card"
				attributes={attributes}
			/>
			</div>
		</div>
	);
}
