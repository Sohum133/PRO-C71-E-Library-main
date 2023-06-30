/* The TransactionScreen class is a React Native component that allows users to scan book and student
IDs and initiate book issue or return transactions. */
import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	ImageBackground,
	Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const bgImage = require('../assets/background2.png');
const appIcon = require('../assets/appIcon.png');
const appName = require('../assets/appName.png');

export default class TransactionScreen extends Component {
	/**
	 * This is a constructor function that initializes the state of a component with various properties.
	 * @param props - props is an object that contains properties passed down from a parent component to
	 * this component. It can include data, functions, or other values that are needed by the component.
	 * In this case, the constructor is using props to initialize the state of the component.
	 */
	constructor(props) {
		super(props);
		this.state = {
			bookId: '',
			studentId: '',
			domState: 'normal',
			hasCameraPermissions: null,
			scanned: false,
		};
	}

	/* `getCameraPermissions` is an asynchronous function that requests permission to use the device's
	camera using the `Permissions` module from Expo. It takes in a parameter `domState` which is used
	to set the state of the component. */
	getCameraPermissions = async (domState) => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);

		this.setState({
			/*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
			hasCameraPermissions: status === 'granted',
			domState: domState,
			scanned: false,
		});
	};

	/* `handleBarCodeScanned` is a function that is called when a barcode is scanned using the device's
	camera. It takes in an object with two properties, `type` and `data`, which contain information
	about the scanned barcode. */
	handleBarCodeScanned = async ({ type, data }) => {
		const { domState } = this.state;

		if (domState === 'bookId') {
			this.setState({
				bookId: data,
				domState: 'normal',
				scanned: true,
			});
		} else if (domState === 'studentId') {
			this.setState({
				studentId: data,
				domState: 'normal',
				scanned: true,
			});
		}
	};

	/* `handleTransaction` is an asynchronous function that is called when the user clicks on the "Submit"
	button. It first retrieves the `bookId` from the component's state. It then creates a Firestore
	query to search for a book with the given `bookId`. Once the query is executed using `getDocs`, the
	function loops through the results using `forEach` and checks if the book is available or not. If
	the book is available, it calls the `initiateBookIssue` function, otherwise it calls the
	`initiateBookReturn` function. These two functions are not defined in the code provided, but they
	are likely responsible for updating the book's availability status and performing any other
	necessary actions related to issuing or returning a book. */
	handleTransaction = async () => {
		var { bookId } = this.state;

		let dbQuery = query(
			collection(db, 'books'),
			where('book_id', '==', bookId)
		);

		let bookRef = await getDocs(dbQuery);

		bookRef.forEach((doc) => {
			var book = doc.data();
			if (book.is_book_available) {
				this.initiateBookIssue();
			} else {
				this.initiateBookReturn();
			}
		});
	};

	/* `initiateBookIssue` is a function that logs a message to the console indicating that a book has
	been issued to a student. However, it is not clear from the code provided how this function is
	being used or when it is being called. It is likely that this function is part of a larger system
	for managing book transactions, but more information would be needed to fully understand its
	purpose and functionality. */
	initiateBookIssue = () => {
		console.log('Book issued to the student!');
	};

	/* `initiateBookReturn` is a function that logs a message to the console indicating that a book has
	been returned to the library. However, it is not clear from the code provided how this function is
	being used or when it is being called. It is likely that this function is part of a larger system
	for managing book transactions, but more information would be needed to fully understand its
	purpose and functionality. */
	initiateBookReturn = () => {
		console.log('Book returned to the library!');
	};

	/**
	 * This is a render function that displays a barcode scanner or a form for inputting book and student
	 * IDs and submitting a transaction.
	 * @returns A component that conditionally renders either a `BarCodeScanner` or a view with an image
	 * background, two text inputs, and a submit button based on the value of `domState` in the
	 * component's state.
	 */
	render() {
		const { bookId, studentId, domState, scanned } = this.state;
		/* `if (domState !== 'normal') {` is checking if the value of `domState` in the component's state is
		not equal to `'normal'`. If it is not equal to `'normal'`, then the component renders a
		`BarCodeScanner` component that allows the user to scan barcodes using the device's camera. If
		`domState` is equal to `'normal'`, then the component renders a view with an image background, two
		text inputs, and a submit button for inputting book and student IDs and submitting a transaction. */
		/* `<BarCodeScanner>` is a component from the `expo-barcode-scanner` library that allows the user
				to scan barcodes using the device's camera. In this code, it is conditionally rendered based on
				the value of `domState` in the component's state. If `domState` is not equal to `'normal'`, then
				the `<BarCodeScanner>` component is rendered with the `onBarCodeScanned` prop set to either
				`undefined` or `this.handleBarCodeScanned` depending on the value of `scanned`. This means that
				if `scanned` is true, the `onBarCodeScanned` prop is set to `undefined`, which disables the
				barcode scanner. If `scanned` is false, the `onBarCodeScanned` prop is set to
				`this.handleBarCodeScanned`, which is a function that is called when a barcode is scanned using
				the device's camera. The `style` prop is set to `StyleSheet.absoluteFillObject`, which makes the
				`<BarCodeScanner>` component fill the entire screen. */
		if (domState !== 'normal') {
			return (
				
				<BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			
			);
		}
		return (
			<View style={styles.container}>
				<ImageBackground source={bgImage} style={styles.bgImage}>
					<View style={styles.upperContainer}>
						<Image source={appIcon} style={styles.appIcon} />
						<Image source={appName} style={styles.appName} />
					</View>
					<View style={styles.lowerContainer}>
						<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder={'Book Id'}
								placeholderTextColor={'#FFFFFF'}
								value={bookId}
							/>
							<TouchableOpacity
								style={styles.scanbutton}
								onPress={() => this.getCameraPermissions('bookId')}>
								<Text style={styles.scanbuttonText}>Scan</Text>
							</TouchableOpacity>
						</View>
						<View style={[styles.textinputContainer, { marginTop: 25 }]}>
							<TextInput
								style={styles.textinput}
								placeholder={'Student Id'}
								placeholderTextColor={'#FFFFFF'}
								value={studentId}
							/>
							<TouchableOpacity
								style={styles.scanbutton}
								onPress={() => this.getCameraPermissions('studentId')}>
								<Text style={styles.scanbuttonText}>Scan</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={[styles.button, { marginTop: 25 }]}
							onPress={this.handleTransaction}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	bgImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	upperContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	appIcon: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
		marginTop: 80,
	},
	appName: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
	},
	lowerContainer: {
		flex: 0.5,
		alignItems: 'center',
	},
	textinputContainer: {
		borderWidth: 2,
		borderRadius: 10,
		flexDirection: 'row',
		backgroundColor: '#9DFD24',
		borderColor: '#FFFFFF',
	},
	textinput: {
		width: '57%',
		height: 50,
		padding: 10,
		borderColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 3,
		fontSize: 18,
		backgroundColor: '#5653D4',
		fontFamily: 'Rajdhani_600SemiBold',
		color: '#FFFFFF',
	},
	scanbutton: {
		width: 100,
		height: 50,
		backgroundColor: '#9DFD24',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scanbuttonText: {
		fontSize: 24,
		color: '#0A0101',
		fontFamily: 'Rajdhani_600SemiBold',
	},
	button: {
		width: '43%',
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F48D20',
		borderRadius: 15,
	},
	buttonText: {
		fontSize: 24,
		color: '#FFFFFF',
		fontFamily: 'Rajdhani_600SemiBold',
	},
});
