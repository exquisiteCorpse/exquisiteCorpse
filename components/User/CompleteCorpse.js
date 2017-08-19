import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFriends, getPhoto, postNewPhoto, makeNewCorpe, makeNewAssign } from '../../store'
import { StyleSheet, Text, ScrollView, View, Image, Button } from 'react-native'
import styles from '../Style/FriendsListStyles'

class CompeleteCorpse extends Component {
  componentDidMount () {
    this.props.fetchPhoto()
    this.props.fetchFriendsData()
  }
  render () {

    const { singlePhoto } = this.props
    return (
      <View style={styles.container2}>
        <Text style={{textAlign: 'center'}}>Click To Complete</Text>
        <Button
          title='complete'
          color='#1e90ff'
          onPress={() => { this.props.postPhoto(singlePhoto) }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    singlePhoto: state.singlePhoto
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchFriendsData: () => {
    dispatch(fetchFriends())
  },
  fetchPhoto: () => {
    dispatch(getPhoto())
  },
  postPhoto: (photoData) => {
    const userId = 1
      dispatch(postNewPhoto(photoData, ownProps.corpseInfo))
      ownProps.navigate('AllCorpsesStack')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CompeleteCorpse)
