/* This is a React component that loads a font asynchronously and conditionally renders a
BottomTabNavigator component based on the font being loaded. */
import React, { Component } from 'react';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import * as Font from 'expo-font';

import BottomTabNavigator from './components/BottomTabNavigator';

export default class App extends Component {
	/**
	 * This is a constructor function that initializes the state of a component with a fontLoaded property
	 * set to false.
	 */
	constructor() {
		super();
		this.state = {
			fontLoaded: false,
		};
	}

	/**
	 * This function loads a font asynchronously and sets the state of fontLoaded to true.
	 */
	async loadFonts() {
		await Font.loadAsync({
			Rajdhani_600SemiBold: Rajdhani_600SemiBold,
		});
		this.setState({ fontLoaded: true });
	}

	/**
	 * This function calls the "loadFonts" function when the component mounts.
	 */
	componentDidMount() {
		this.loadFonts();
	}

	/**
	 * This function conditionally renders a BottomTabNavigator component based on the state of
	 * fontLoaded.
	 * @returns If `fontLoaded` is true, then `BottomTabNavigator` component is being returned. Otherwise,
	 * `null` is being returned.
	 */
	render() {
		const { fontLoaded } = this.state;
		if (fontLoaded) {
			return <BottomTabNavigator />;
		}
		return null;
	}
}
