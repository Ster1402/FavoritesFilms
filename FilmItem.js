import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'

class FilmItem extends React.Component {

	render() {

        const film = this.props.film;
        const imageSource = getImageFromApi(film.poster_path)

        return (
		<View style={styles.main_container}>
			<Image source={{uri : imageSource}} resizeMode="contain" style={styles.image} />

			<View style={styles.content_container}>
				<View style={styles.header_container}>
					<Text style={styles.title_text}> {film.title} </Text>

					<Text style={styles.vote_text}>  {film.vote_average}</Text>
				</View>

				<View style={styles.description_container}>
                    {/*La probs numberOfLines permet de couper le text s'il est long */}
					<Text style={styles.description_text} numberOfLines={6} >{film.overview.length > 0 ? film.overview : "Aucune description pour ce film"}</Text>
				</View>

				<View style={styles.date_container}>
					<Text style={styles.date_text}>Sortie le:  { (new Date(film.release_date)).toDateString() }</Text>
				</View>
			</View>
        </View>
        );
	}
}


const styles = StyleSheet.create({

    main_container: {
      flex: 1,
      height: "auto",
      flexDirection: 'row',
      padding : 3, 
      borderRadius : 1,
      marginVertical : 8,
      alignItems : "center"
    },

    image: {
      width: 120,
      minHeight : 180,
      margin: 5,
      alignSelf : "stretch",
      backgroundColor : "#1B4079",
      borderWidth : StyleSheet.hairlineWidth,
      borderColor : "black"
    },
    
    content_container: {
      flex: 1,
      margin: 5,
      paddingBottom : 0,
    },

    header_container: {
      flexDirection: 'row',
      borderBottomColor : "#1B4079",
      borderBottomWidth : StyleSheet.hairlineWidth,
      height : "auto"
    },
    
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5,
      textAlignVertical : "center",
      height : "auto",
      color : "#1B4079"
    },
    
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#676767',
      textAlignVertical : "top"
    },
    
    description_container: {
      flex: 7,
      borderBottomColor : "#1B4079",
      borderBottomWidth : StyleSheet.hairlineWidth,
      marginBottom : 5,
      paddingVertical : 5
    },
    
    description_text: {
      fontStyle: 'italic',
      color: '#676767'
    },
    
    date_container: {
      flex: 1,
      alignSelf : "flex-end",
      minHeight : 16
    },
    
    date_text: {
      flex : 1,
      marginTop : 5,
      width : "auto",
      textAlign: 'center',
      textAlignVertical : 'center',
      fontSize: 14,
      backgroundColor : "#1B4079",
      borderRadius : 3,
      padding : 3,
      color : "#fff",
      borderWidth : StyleSheet.hairlineWidth,
      borderColor : "black"
    }

  })
  
export default FilmItem;
