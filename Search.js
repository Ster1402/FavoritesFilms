import React, { Component } from 'react';

import {
	StyleSheet,
	TextInput,
	Button,
	View,
	Platform,
	StatusBar,
	FlatList,
	Vibration,
	ActivityIndicator
} from 'react-native';

import FilmItem from './FilmItem';
import { getFilmsWithSearchedText } from '../API/TMDBApi';

//Ligne de séparation entre le TextInput et le Button
const Separator = () => {
	return <View style={(Platform.OS = 'android' ? styles.separator : null)} />;
};

//Les éléments de la liste de film seront rendu dans le component custom FilmItem
const renderItem = ({ item }) => {
	return <FilmItem film={item} />;
};

//FeedBack de vibration à l'appui
const VIBRATION_DURATION = 40;

//Component de recherche de film qui contient les resultats de recherche
class Search extends Component {
	//Contructeur
	constructor(props) {
		super(props);

		//On crée notre state qui contient un tableau de films vide initialement
		//Les states contrairement aux props peuvent être modifier et recharger ainsi la vue
		//On utilise toujours setState lorsqu'on modifie un state

		this.state = {
			films: [],
			isLoading: false
		};

		//Page actuelle de la FlatList
		this.page = 0;
		//Nombre de page totale
		this.totalPages = 0;

		this.searchedText = '';
	}

	//Fontion appeler lorsqu'on valide la recherche
	_loadFilms() {
		//On lance un Vibration de 40ms
		Vibration.vibrate(VIBRATION_DURATION);

		this.setState({ isLoading: true });

		if (this.searchedText.length > 0) {
			//charger d'appeler l'API pour obtenir la liste de films en format JSON
			getFilmsWithSearchedText(this.searchedText, this.page + 1).then((data) => {
				//On récupère la page courante et le nbre max de page
				this.page = data.page;
				this.totalPages = data.total_pages;

				//On modifie le state
				this.setState({
					//On ajoute du contenue à notre tableau de films
					films: [ ...this.state.films, ...data.results ],

					isLoading: false
				});
			});
		}
	}

	//On rajoute des nouveaux films en scrollant
	_loadNewPage() {
		if (this.page < this.totalPages) {
			this._loadFilms();
		}
	}

	//On fait une nouvelle recherche
	_searchFilms() {
		if (this.searchedText.length > 0) {
			this.page = 0;
			this.totalPages = 0;

			//On charge d'autres films uniquement lorsque la liste est remise à zéro
			//En utilisant le deuxième param de setState

			this.setState(
				{
					films: []
				},
				() => {
					this._loadFilms();
				}
			);
		}
	}

	//Lorsque l'on détecte un évènement dans le texteInput on recupère le nouveau texte
	_textChanged(text) {
		this.searchedText = text;
	}

	//Lorsque lles films chargent on affiche une barre de porgression
	_displayLoading() {
		if (this.state.isLoading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#1B4079" />
				</View>
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{/* onSubmitEditing est l'évènement que correspond à l'appui de la touche Entrée */}
				{/*onChangeText permet de récupérer à chaque fois le texte du TextInput */}

				<TextInput
					selectTextOnFocus={true}
					onSubmitEditing={() => {
						this._searchFilms();
					}}
					onChangeText={(text) => this._textChanged(text)}
					style={styles.textInput}
					placeholder="Titre du Film"
				/>

				<Separator />

				<Button
					title="Rechercher"
					onPress={() => {
						this._searchFilms();
					}}
					color="#1B4079"
				/>

				{/*Lorsqu'il ne reste plus que la moitié de la liste à afficher on déclenche l'évènement onEndReached*/}
				<FlatList
					data={this.state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					onEndReachedThreshold={0.5}
					onEndReached={() => this._loadNewPage()}
				/>

				{this._displayLoading()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 7,
		marginTop: StatusBar.currentHeight || 0
	},

	textInput: {
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 5
	},

	separator: {
		marginVertical: 10,
		borderColor: '#1B4079',
		borderBottomWidth: StyleSheet.hairlineWidth
	},

	loadingContainer: {
		position: 'absolute',
		top: 100,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Search;
